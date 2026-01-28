package com.taskmaster.api.dto.response;

import com.taskmaster.api.entity.User;

import java.time.OffsetDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        String status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt,
        Long userId) { }
