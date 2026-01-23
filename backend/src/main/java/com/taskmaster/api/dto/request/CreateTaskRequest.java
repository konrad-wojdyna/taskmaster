package com.taskmaster.api.dto.request;

import com.taskmaster.api.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateTaskRequest (
        @NotBlank(message = "Title is required")
        @Size(min = 3, max = 200, message = "Title must be between 3 and 200 characters")
        String title,

        @Size(max = 1000, message = "Description must not exceed 1000 characters")
        String description,

        TaskStatus status
){ }
