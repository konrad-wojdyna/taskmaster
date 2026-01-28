package com.taskmaster.api.service;


import com.taskmaster.api.dto.request.CreateCategoryRequest;
import com.taskmaster.api.dto.request.UpdateCategoryRequest;
import com.taskmaster.api.dto.response.CategoryResponse;
import com.taskmaster.api.entity.Category;
import com.taskmaster.api.entity.User;
import com.taskmaster.api.exception.CategoryAlreadyExistsException;
import com.taskmaster.api.exception.UserNotFoundException;
import com.taskmaster.api.mapper.CategoryMapper;
import com.taskmaster.api.repository.CategoryRepository;
import com.taskmaster.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllUserCategories(Long userId){
        log.info("Fetching all categories for user id {}", userId);

        return categoryRepository.findByUserId(userId)
                .stream().map(CategoryMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long categoryId, Long userId){
        log.info("Fetching task with id {} for user id {}", categoryId, userId);

        Category category = findCategoryByIdAndUserId(categoryId, userId);

        log.info("Category fetched successfully: {}", category.getId());
        return CategoryMapper.toResponse(category);
    }

    @Transactional
    public CategoryResponse createCategory(CreateCategoryRequest request, Long userId){
        log.info("Creating category for user id {}", userId);

        if(categoryRepository.existsByNameAndUserId(request.name(), userId)){
            log.warn("Category exists with name {} and user id {}", request.name(), userId);
            throw new CategoryAlreadyExistsException("Category with name " + request.name() + " already exists");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> {
            log.warn("User with id {} not found", userId);
            return UserNotFoundException.withId(userId);
        });

        Category category = CategoryMapper.toEntity(request);
        category.setUser(user);

        Category savedCategory = categoryRepository.save(category);

        log.info("Category created successfully with id: {}", savedCategory.getId());
        return CategoryMapper.toResponse(savedCategory);
    }

    @Transactional
    public CategoryResponse updateCategory(Long categoryId, UpdateCategoryRequest request, Long userId){
        log.info("Updating category with id {} for user id {}", categoryId, userId);

       Category existingCategory = findCategoryByIdAndUserId(categoryId, userId);

       if(!existingCategory.getName().equals(request.name()) &&
       categoryRepository.existsByNameAndUserId(request.name(), userId)){
           log.warn("Category already exists with name {} for user id {}", request.name(), userId);
           throw new CategoryAlreadyExistsException("Category with name '" + request.name() + "' already exists");
       }

       Category updatedCategory = CategoryMapper.updateEntity(existingCategory, request);
       Category savedCategory = categoryRepository.save(updatedCategory);

       log.info("Category with id {} updated successfully", savedCategory.getId());
       return CategoryMapper.toResponse(savedCategory);
    }

    @Transactional
    public void deleteCategory(Long categoryId, Long userId){
        log.info("Deleting category with id {} for user id {}", categoryId, userId);

        Category category = findCategoryByIdAndUserId(categoryId, userId);

        categoryRepository.delete(category);
        log.info("Category with id {} deleted successfully", categoryId);
    }

    private Category findCategoryByIdAndUserId(Long categoryId, Long userId){
        return categoryRepository.findByIdAndUserId(categoryId, userId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }
}
