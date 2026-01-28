package com.taskmaster.api.service;


import com.taskmaster.api.dto.request.CreateTaskRequest;
import com.taskmaster.api.dto.request.UpdateTaskRequest;
import com.taskmaster.api.dto.response.TaskResponse;
import com.taskmaster.api.entity.Task;
import com.taskmaster.api.entity.User;
import com.taskmaster.api.exception.TaskNotFoundException;
import com.taskmaster.api.exception.UserNotFoundException;
import com.taskmaster.api.mapper.TaskMapper;
import com.taskmaster.api.repository.TaskRepository;
import com.taskmaster.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Transactional
    public TaskResponse createTask(CreateTaskRequest request, Long userId){
        log.info("Creating task for user id {}", userId);

        User user = userRepository.findById(userId).orElseThrow(() -> {
            log.warn("User with id {} not found", userId);
            return UserNotFoundException.withId(userId);
        });

        Task task = TaskMapper.toEntity(request);
        task.setUser(user);

        Task savedTask = taskRepository.save(task);

        log.info("Task created successfully with id: {}", savedTask.getId());

        return TaskMapper.toResponse(savedTask);
    }

    @Transactional(readOnly = true)
    public TaskResponse getTaskById(Long taskId, Long userId){
        log.info("Fetching task with id {} for user id {}", taskId, userId);

        Task task = findTaskByIdAndUserId(taskId, userId);

        log.info("Task fetched successfully: {}", task.getId());
        return TaskMapper.toResponse(task);
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> getAllUserTasks(Long userId){
        log.info("Fetching all tasks for user id {}", userId);

        List<Task> tasks = taskRepository.findAllByUserId(userId);

        return tasks.stream()
                .map(TaskMapper::toResponse)
                .toList();
    }

    @Transactional
    public TaskResponse updateTask(Long taskId, UpdateTaskRequest request, Long userId){
        log.info("Updating task with id {} for user id {}", taskId, userId);

        Task task = findTaskByIdAndUserId(taskId, userId);

        Task updatedTask = TaskMapper.updateEntity(task, request);
        Task savedTask = taskRepository.save(updatedTask);

        log.info("Task with id {} updated successfully", savedTask.getId());

        return TaskMapper.toResponse(savedTask);
    }

    @Transactional
    public void deleteTask(Long taskId, Long userId){
        log.info("Deleting task with id {} for user id {}", taskId, userId);

        Task task = findTaskByIdAndUserId(taskId, userId);

        taskRepository.delete(task);
        log.info("Task with id {} deleted successfully", taskId);
    }

    private Task findTaskByIdAndUserId(Long taskId, Long userId){
        return taskRepository.findByIdAndUserId(taskId, userId).orElseThrow(() -> {
            log.warn("Task with id {} not found for user id {}", taskId, userId);
            return new TaskNotFoundException(taskId);
        });
    }
}
