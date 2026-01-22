package com.taskmaster.api.service;

import com.taskmaster.api.dto.request.UserLoginRequest;
import com.taskmaster.api.dto.request.UserRegisterRequest;
import com.taskmaster.api.dto.response.AuthResponse;
import com.taskmaster.api.dto.response.UserResponse;
import com.taskmaster.api.entity.User;
import com.taskmaster.api.exception.EmailAlreadyExistsException;
import com.taskmaster.api.exception.InvalidCredentialsException;
import com.taskmaster.api.exception.UsernameAlreadyExistsException;
import com.taskmaster.api.mapper.UserMapper;
import com.taskmaster.api.repository.UserRepository;
import com.taskmaster.api.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Transactional
    public AuthResponse register(UserRegisterRequest request) {
        log.info("Registering user: {}, {}", request.username(), request.email());

        if(userRepository.existsByEmail(request.email())){
            log.warn("Registration failed - email already exists: {}", request.email());
            throw EmailAlreadyExistsException.fromEmail(request.email());
        }

        if(userRepository.existsByUsername(request.username())){
            log.warn("Registration failed - username already exists: {}", request.username());
            throw UsernameAlreadyExistsException.fromUsername(request.username());
        }

        String encodedPassword = passwordEncoder.encode(request.password());

        User user = UserMapper.toEntity(request);
        user.setPassword(encodedPassword);
        User savedUsed = userRepository.save(user);

        UserResponse response = UserMapper.toResponse(savedUsed);

        String accessToken = jwtUtils.generateToken(savedUsed.getId(), savedUsed.getEmail(), savedUsed.getRole().name());

        log.info("User registered successfully: {}", savedUsed.getEmail());

        return new AuthResponse(accessToken, "Bearer", response);
    }

    public AuthResponse login(UserLoginRequest request) {

        log.info("Logging in user: {}", request.usernameOrEmail());

        User user = userRepository.findByEmail(request.usernameOrEmail())
                .or(() -> userRepository.findByUsername(request.usernameOrEmail()))
                .orElseThrow(InvalidCredentialsException::new);

        if(!passwordEncoder.matches(request.password(), user.getPassword())){
            log.warn("Invalid login attempt for user: {}", request.usernameOrEmail());
            throw new InvalidCredentialsException();
        }

        UserResponse response = UserMapper.toResponse(user);

        log.info("User logged in successfully: {}", user.getEmail());

        String accessToken = jwtUtils.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        return new AuthResponse(accessToken, "Bearer", response);
    }
}
