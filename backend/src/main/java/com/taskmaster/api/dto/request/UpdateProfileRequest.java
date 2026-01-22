package com.taskmaster.api.dto.request;

public record UpdateProfileRequest(
    String username,
    String firstName,
    String lastName
) {
}
