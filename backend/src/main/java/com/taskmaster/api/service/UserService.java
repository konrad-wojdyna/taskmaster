package com.taskmaster.api.service;

import com.taskmaster.api.dto.request.UpdateProfileRequest;
import com.taskmaster.api.dto.request.UserRegisterRequest;
import com.taskmaster.api.dto.response.UserResponse;
import com.taskmaster.api.entity.User;
import com.taskmaster.api.exception.EmailAlreadyExistsException;
import com.taskmaster.api.exception.UserNotFoundException;
import com.taskmaster.api.exception.UsernameAlreadyExistsException;
import com.taskmaster.api.mapper.UserMapper;
import com.taskmaster.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public UserResponse me(Long userId) {
        log.info("Fetching current user: {}", userId);

        User user = findUserById(userId);
        return UserMapper.toResponse(user);
    }

    public UserResponse getUserById(Long id) {
        log.info("Fetching user by ID: {}", id);

        User user = findUserById(id);
        return UserMapper.toResponse(user);
    }

    @Transactional
    public UserResponse updateProfile(Long id, UpdateProfileRequest request) {
        log.info("Updating user profile for ID: {}", id);

        User user = findUserById(id);

        if(!user.getUsername().equals(request.username()) && userRepository.existsByUsername(request.username())){
            throw UsernameAlreadyExistsException.fromUsername(request.username());
        }

        user.setUsername(request.username());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());

        User updatedUser = userRepository.save(user);
        log.info("User profile updated for ID: {}", id);

        return UserMapper.toResponse(updatedUser);
    }

    @Transactional
    public UserResponse changeEmail(Long id, String newEmail) {
        log.info("Changing email for user ID: {}", id);

        //TODO: Check if owner want to change account email or admin

        if(userRepository.existsByEmail(newEmail)){
            throw EmailAlreadyExistsException.fromEmail(newEmail);
        }

        User user = findUserById(id);
        user.setEmail(newEmail);
        User updatedUser = userRepository.save(user);

        log.info("Email changed for user ID: {}", id);
        return UserMapper.toResponse(updatedUser);
    }

    @Transactional
    public void deleteAccount(Long id) {
        log.info("Deleting user with ID: {}", id);

        //TODO: Check if owner want to delete account or admin

        User user = findUserById(id);
        userRepository.delete(user);

        log.info("User deleted with ID: {}", id);
    }

    public List<UserResponse> listUsers(){
        log.info("Listing all users");

        List<User> users = userRepository.findAll();

        return users.stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }

    private User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> UserNotFoundException.withId(id));
    }
}

