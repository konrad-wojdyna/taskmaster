package com.taskmaster.api.controller;


import com.taskmaster.api.dto.request.UserLoginRequest;
import com.taskmaster.api.dto.request.UserRegisterRequest;
import com.taskmaster.api.dto.response.AuthResponse;
import com.taskmaster.api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody UserRegisterRequest request){
        log.info("Received registration request for username: {}, email: {}", request.username(), request.email());
        AuthResponse response = authService.register(request);
        log.info("Registration successful for username: {}, email: {}", request.username(), request.email());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody UserLoginRequest request) {
        log.info("Received login request for username/email: {}", request.usernameOrEmail());
        AuthResponse response = authService.login(request);
        log.info("Login successful for username/email: {}", request.usernameOrEmail());
        return ResponseEntity.ok(response);
    }
}
