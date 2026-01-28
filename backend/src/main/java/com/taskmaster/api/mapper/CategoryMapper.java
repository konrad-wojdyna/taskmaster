package com.taskmaster.api.mapper;

import com.taskmaster.api.dto.request.CreateCategoryRequest;
import com.taskmaster.api.dto.request.UpdateCategoryRequest;
import com.taskmaster.api.dto.response.CategoryResponse;
import com.taskmaster.api.entity.Category;

public class CategoryMapper {

    public static CategoryResponse toResponse(Category category){
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getColor(),
                category.getIcon(),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }

    public static Category toEntity(CreateCategoryRequest request){
        return Category.builder()
                .name(request.name())
                .color(request.color())
                .icon(request.icon())
                .build();
    }

    public static Category updateEntity(Category category, UpdateCategoryRequest request){

        if(request.name() != null && !request.name().isBlank()){
            category.setName(request.name());
        }

        if(request.color() != null){
            category.setColor(request.color());
        }

        if(request.icon() != null){
            category.setIcon(request.icon());
        }

        return category;

    }
}
