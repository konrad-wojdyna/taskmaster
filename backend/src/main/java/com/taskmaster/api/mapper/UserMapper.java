package com.taskmaster.api.mapper;

import com.taskmaster.api.dto.request.UserRegisterRequest;
import com.taskmaster.api.dto.response.UserResponse;
import com.taskmaster.api.entity.Role;
import com.taskmaster.api.entity.User;

public class UserMapper {

    public static UserResponse toResponse(User user){
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().name(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    public static User toEntity(UserRegisterRequest request){
          return User.builder()
                  .username(request.username())
                  .email(request.email())
                  .password(request.password())
                  .firstName(request.firstName())
                  .lastName(request.lastName())
                  .role(Role.USER)
                  .build();
    }
}
