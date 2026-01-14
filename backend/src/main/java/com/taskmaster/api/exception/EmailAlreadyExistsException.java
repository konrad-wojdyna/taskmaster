package com.taskmaster.api.exception;

public class EmailAlreadyExistsException extends RuntimeException {

  public EmailAlreadyExistsException(String message){
    super(message);
  }

  public static EmailAlreadyExistsException fromEmail(String email){
    return new EmailAlreadyExistsException("Email already exists: " + email);
  }
}
