package com.taskmaster.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ChangeEmailRequest(
        @Email(message = "Invalid email format")
        @NotBlank(message = "Email is required")
        String newEmail
) {}
