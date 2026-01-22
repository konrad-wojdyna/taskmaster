package com.taskmaster.api.dto.response;

import com.taskmaster.api.entity.User;

import java.time.OffsetDateTime;

public record UserResponse(
        Long id,
        String username,
        String email,
        String firstName,
        String lastName,
        String role,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) { }
