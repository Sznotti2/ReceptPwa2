package hu.recept.receptpwa2.controller;

import hu.recept.receptpwa2.model.User;
import hu.recept.receptpwa2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        try {
            return userRepository.saveAndFlush(user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepository.findByEmail(user.getEmail());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleCustomException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}
