package com.taskmaster.api.dto.response;

import com.taskmaster.api.entity.TaskPriority;
import com.taskmaster.api.entity.TaskStatus;
import com.taskmaster.api.entity.User;

import java.time.OffsetDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        TaskStatus status,
        TaskPriority priority,
        OffsetDateTime dueDate,
        OffsetDateTime completedAt,
        Long categoryId,
        String categoryName,
        String categoryColor,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt,
        Long userId) { }
