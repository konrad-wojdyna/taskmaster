package com.taskmaster.api.exception;

public class UnauthorizedTaskAccessException extends RuntimeException {
    public UnauthorizedTaskAccessException() {
        super("You are not authorized to access this task.");
    }

    public UnauthorizedTaskAccessException(Long taskId, Long userId){
        super(String.format(
                "User %d is not authorized to access task %d",
                userId, taskId
        ));
    }
}
