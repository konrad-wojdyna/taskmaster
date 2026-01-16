package com.taskmaster.api.controller;


import com.taskmaster.api.dto.request.UpdateProfileRequest;
import com.taskmaster.api.dto.response.UserResponse;
import com.taskmaster.api.security.userdetails.UserPrincipal;
import com.taskmaster.api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            @AuthenticationPrincipal UserPrincipal principal
            ){

        log.info("Received me request for userId: {}", principal.id());

        UserResponse response = userService.me(principal.id());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        log.info("Received getUserById request for id: {}", id);
        UserResponse response = userService.getUserById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        log.info("Received getAllUsers request");
        List<UserResponse> users = userService.listUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody UpdateProfileRequest request) {

        log.info("Received updateProfile request for id: {}", principal.id());
        UserResponse response = userService.updateProfile(principal.id(), request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/change-email")
    public ResponseEntity<UserResponse> changeEmail(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam String newEmail) {

        log.info("Received changeEmail request for id: {}", principal.id());

        UserResponse response = userService.changeEmail(principal.id(), newEmail);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAccount(
            @AuthenticationPrincipal UserPrincipal principal) {
        log.info("Received delete account request for id: {}", principal.id());
        userService.deleteAccount(principal.id());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUserByAdmin(@PathVariable Long id) {
        log.info("Received admin delete user request for id: {}", id);
        userService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }

}
