package hu.recept.receptpwa2.controller;

import hu.recept.receptpwa2.exception.EmailAlreadyExistsException;
import hu.recept.receptpwa2.exception.UsernameAlreadyExistsException;
import hu.recept.receptpwa2.model.RegistrationData;
import hu.recept.receptpwa2.model.User;
import hu.recept.receptpwa2.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegistrationData data) {

        if(!data.getTerms()){
            return "Az adatkezelési tájékoztatóban foglaltakat el kell fogadni!";
        }

        // data is validated before
        User user = new User(data);

        try {
            userRepository.saveAndFlush(user);
        } catch (UsernameAlreadyExistsException | EmailAlreadyExistsException e) {
            return e.getMessage();
        }

        return "Sikeres regisztráció.";
    }

    /*@PostMapping("/login")
    public User login(@Valid @RequestBody LoginData data) {
    }*/

    // When validation failed for an argument, return only the message.
    /*@ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // Get the default error message from the first validation error.
        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(FieldError::getDefaultMessage)
                .orElse("Sikertelen validáció.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }*/

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleCustomException(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

}
