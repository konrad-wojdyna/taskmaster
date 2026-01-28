package com.taskmaster.api.controller;


import com.taskmaster.api.dto.request.CreateCategoryRequest;
import com.taskmaster.api.dto.request.UpdateCategoryRequest;
import com.taskmaster.api.dto.response.CategoryResponse;
import com.taskmaster.api.security.userdetails.UserPrincipal;
import com.taskmaster.api.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories(
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ){
        log.info("Fetching all categories for user: {}", userPrincipal.id());

        List<CategoryResponse> response = categoryService.getAllUserCategories(userPrincipal.id());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryResponse> getCategoryById(
            @PathVariable Long categoryId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        log.info("Fetching task {} for user: {}", categoryId, userPrincipal.id());

        CategoryResponse response = categoryService.getCategoryById(categoryId, userPrincipal.id());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(
            @Valid @RequestBody CreateCategoryRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ){
        log.info("Creating category for user: {}", userPrincipal.id());
        CategoryResponse newCategory = categoryService.createCategory(request, userPrincipal.id());
        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long categoryId,
            @Valid @RequestBody UpdateCategoryRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal
            ){
        log.info("Updating category {} for user: {}", categoryId, userPrincipal.id());

        CategoryResponse updatedCategory = categoryService.updateCategory(categoryId, request, userPrincipal.id());
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable Long categoryId,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        log.info("Deleting category {} for user: {}", categoryId, userPrincipal.id());

        categoryService.deleteCategory(categoryId, userPrincipal.id());
        return ResponseEntity.noContent().build();
    }
}
