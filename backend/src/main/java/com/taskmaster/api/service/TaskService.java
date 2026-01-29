package com.taskmaster.api.service;


import com.taskmaster.api.dto.request.CreateTaskRequest;
import com.taskmaster.api.dto.request.UpdateTaskRequest;
import com.taskmaster.api.dto.response.TaskResponse;
import com.taskmaster.api.entity.*;
import com.taskmaster.api.exception.CategoryNotFoundException;
import com.taskmaster.api.exception.TaskNotFoundException;
import com.taskmaster.api.exception.UserNotFoundException;
import com.taskmaster.api.mapper.TaskMapper;
import com.taskmaster.api.repository.CategoryRepository;
import com.taskmaster.api.repository.TaskRepository;
import com.taskmaster.api.repository.UserRepository;
import com.taskmaster.api.repository.specification.TaskSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public TaskResponse createTask(CreateTaskRequest request, Long userId){
        log.info("Creating task for user id {}", userId);

        Category category = null;

        User user = userRepository.findById(userId).orElseThrow(() -> {
            log.warn("User with id {} not found", userId);
            return UserNotFoundException.withId(userId);
        });

        if(request.categoryId() != null){
            category = findCategoryByIdAndUserId(request.categoryId(), userId);
        }

        Task task = TaskMapper.toEntity(request, category);
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
    public List<TaskResponse> getAllUserTasks(
            Long userId,
            TaskStatus status,
            TaskPriority priority,
            Long categoryId,
            Boolean overdue
            ){
        log.info("Fetching filtered tasks for user id {}", userId);

        Specification<Task> spec = TaskSpecification.filterTasks(userId, status, priority, categoryId, overdue);

        return taskRepository.findAll(spec).stream()
                .map(TaskMapper::toResponse)
                .toList();
    }

    @Transactional
    public TaskResponse updateTask(Long taskId, UpdateTaskRequest request, Long userId){
        log.info("Updating task with id {} for user id {}", taskId, userId);

        Category category = null;

        Task task = findTaskByIdAndUserId(taskId, userId);

        if(request.categoryId() != null){
            category = findCategoryByIdAndUserId(request.categoryId(), userId);
        }

        Task updatedTask = TaskMapper.updateEntity(task, request, category);

        if(request.status() != null && request.status().equals(TaskStatus.COMPLETED)){
            updatedTask.setCompletedAt(OffsetDateTime.now());
        }else if(request.status() != null){
            updatedTask.setCompletedAt(null);
        }

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

    private Category findCategoryByIdAndUserId(Long categoryId, Long userId){
        return  categoryRepository.findByIdAndUserId(categoryId, userId)
                .orElseThrow(() -> {
                    log.warn("Category with id {} not found", categoryId);
                    return new CategoryNotFoundException(categoryId);
                });
    }
}
