package com.taskmaster.api.mapper;

import com.taskmaster.api.dto.request.CreateTaskRequest;
import com.taskmaster.api.dto.request.UpdateTaskRequest;
import com.taskmaster.api.dto.response.TaskResponse;
import com.taskmaster.api.entity.Category;
import com.taskmaster.api.entity.Task;
import com.taskmaster.api.entity.TaskPriority;
import com.taskmaster.api.entity.TaskStatus;

public class TaskMapper {

    public static TaskResponse toResponse(Task task){
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getDueDate(),
                task.getCompletedAt(),
                task.getCategory() != null ? task.getCategory().getId() : null,
                task.getCategory() != null ? task.getCategory().getName() : null,
                task.getCategory() !=null ? task.getCategory().getColor() : null,
                task.getCreatedAt(),
                task.getUpdatedAt(),
                task.getUser().getId()
        );
    }

    public static Task toEntity(CreateTaskRequest request, Category category){
        return Task.builder()
                .title(request.title())
                .description(request.description())
                .status(request.status() != null ? request.status() : TaskStatus.TODO)
                .priority(request.priority() != null ? request.priority() : TaskPriority.MEDIUM)
                .dueDate(request.dueDate())
                .category(category)
                .build();
    }

    public static Task updateEntity(Task task, UpdateTaskRequest request, Category category){
        if (request.title() != null && !request.title().isBlank()) {
            task.setTitle(request.title());
        }

        if (request.description() != null) {
            task.setDescription(request.description());
        }

        if (request.status() != null) {
            task.setStatus(request.status());
        }

        if (request.priority() != null) {
            task.setPriority(request.priority());
        }

        task.setDueDate(request.dueDate());
        task.setCategory(category);

        return task;
    }
}
