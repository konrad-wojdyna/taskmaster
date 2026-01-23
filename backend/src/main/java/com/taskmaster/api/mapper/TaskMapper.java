package com.taskmaster.api.mapper;

import com.taskmaster.api.dto.request.CreateTaskRequest;
import com.taskmaster.api.dto.request.UpdateTaskRequest;
import com.taskmaster.api.dto.response.TaskResponse;
import com.taskmaster.api.entity.Task;
import com.taskmaster.api.entity.TaskStatus;

public class TaskMapper {

    public static TaskResponse toResponse(Task task){
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus().name(),
                task.getCreatedAt(),
                task.getUpdatedAt(),
                task.getUser().getId()
        );
    }

    public static Task toEntity(CreateTaskRequest request){
        return Task.builder()
                .title(request.title())
                .description(request.description())
                .status(request.status() != null ? request.status() : TaskStatus.TODO)
                .build();
    }

    public static Task updateEntity(Task task, UpdateTaskRequest request){

        if(request.title() != null && !request.title().isBlank()){
            task.setTitle(request.title());
        }

        if(request.description() != null){
            task.setDescription(request.description());
        }

        if(request.status() != null){
            task.setStatus(request.status());
        }

        return task;
    }
}
