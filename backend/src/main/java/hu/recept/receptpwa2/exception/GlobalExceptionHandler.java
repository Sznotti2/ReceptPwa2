package hu.recept.receptpwa2.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // When validation failed for an argument, return only the message.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException e) {
        String message = e.getBindingResult()
                .getFieldErrors().stream()
                .findFirst()
                .map(FieldError::getDefaultMessage)
                .or(() -> e.getBindingResult().getGlobalErrors().stream()
                        .findFirst()
                        .map(ObjectError::getDefaultMessage))
                .orElse("Sikertelen validáció.");

        Map<String, String> res = new HashMap<>();
        res.put("error", message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleEmailAlreadyExistsException(EmailAlreadyExistsException e) {
        Map<String, String> res = new HashMap<>();
        res.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException e) {
        Map<String, String> res = new HashMap<>();
        res.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(TermsNotAcceptedException.class)
    public ResponseEntity<Map<String, String>> handleTermsNotAcceptedException(TermsNotAcceptedException e) {
        Map<String, String> res = new HashMap<>();
        res.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(InvalidLoginException.class)
    public ResponseEntity<Map<String, String>> handleInvalidLoginException(InvalidLoginException e) {
        Map<String, String> res = new HashMap<>();
        res.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<Map<String, String>> handleInvalidTokenException(InvalidTokenException e) {
        Map<String, String> res = new HashMap<>();
        res.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(InvalidSessionTokenException.class)
    public ResponseEntity<Map<String, String>> handleInvalidSessionTokenException(InvalidSessionTokenException e) {
        Map<String, String> res = new HashMap<>();
        res.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(UserNotDeletedException.class)
    public ResponseEntity<Map<String, String>> handleUserNotExistException(UserNotDeletedException e) {
        Map<String, String> res = new HashMap<>();
        res.put("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

   @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGlobalException(Exception e) {
       Map<String, String> res = new HashMap<>();
       res.put("error", "Szerver hiba: " + e.getMessage());
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }
}
