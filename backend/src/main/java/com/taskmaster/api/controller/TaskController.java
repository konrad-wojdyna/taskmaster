package com.taskmaster.api.controller;


import com.taskmaster.api.dto.request.CreateTaskRequest;
import com.taskmaster.api.dto.request.UpdateTaskRequest;
import com.taskmaster.api.dto.response.TaskResponse;
import com.taskmaster.api.security.userdetails.UserPrincipal;
import com.taskmaster.api.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody CreateTaskRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        log.info("Creating task for user: {}", userPrincipal.id());
        TaskResponse response = taskService.createTask(request, userPrincipal.id());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllUserTasks(
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ){
        log.info("Fetching all tasks for user: {}", userPrincipal.id());
        List<TaskResponse> tasks = taskService.getAllUserTasks(userPrincipal.id());
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable Long taskId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){
        log.info("Fetching task {} for user: {}", taskId, userPrincipal.id());
        TaskResponse response = taskService.getTaskById(taskId, userPrincipal.id());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @Valid @RequestBody UpdateTaskRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        log.info("Updating task {} for user: {}", taskId, userPrincipal.id());
        TaskResponse response = taskService.updateTask(taskId, request, userPrincipal.id());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long taskId,
            @AuthenticationPrincipal UserPrincipal userPrincipal){

        log.info("Deleting task {} for user: {}", taskId, userPrincipal.id());
        taskService.deleteTask(taskId, userPrincipal.id());
        return ResponseEntity.noContent().build();
    }
}
