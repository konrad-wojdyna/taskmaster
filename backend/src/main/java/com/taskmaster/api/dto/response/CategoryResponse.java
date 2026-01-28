package com.taskmaster.api.dto.response;

import java.time.OffsetDateTime;

public record CategoryResponse(
        Long id,
        String name,
        String color,
        String icon,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}
