package com.taskmaster.api.dto.response;

public record AuthResponse(
        String accessToken,
        String tokenType,
        UserResponse user
) {}
