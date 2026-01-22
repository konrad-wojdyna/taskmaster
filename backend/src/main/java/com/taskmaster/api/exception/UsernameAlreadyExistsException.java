package com.taskmaster.api.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String message) {
        super(message);
    }

    public static UsernameAlreadyExistsException fromUsername(String username) {
        return new UsernameAlreadyExistsException("Username already exists: " + username);
    }
}
