package hu.recept.receptpwa2.controller;

import hu.recept.receptpwa2.exception.EmailAlreadyExistsException;
import hu.recept.receptpwa2.exception.InvalidLoginException;
import hu.recept.receptpwa2.exception.TermsNotAcceptedException;
import hu.recept.receptpwa2.exception.UsernameAlreadyExistsException;
import hu.recept.receptpwa2.model.LoginData;
import hu.recept.receptpwa2.model.RegistrationData;
import hu.recept.receptpwa2.model.ReturnedUserData;
import hu.recept.receptpwa2.model.UserDTO;
import hu.recept.receptpwa2.service.UserService;
import hu.recept.receptpwa2.validation.EmailValidator;
import hu.recept.receptpwa2.validation.groups.ValidationSequence;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ReturnedUserData> register(@Validated(ValidationSequence.class) @RequestBody RegistrationData data) throws UsernameAlreadyExistsException, EmailAlreadyExistsException, TermsNotAcceptedException  {
        if(!data.getTerms()){
            throw new TermsNotAcceptedException("Az adatkezelési tájékoztatóban foglaltakat el kell fogadni!");
        }

        // data is validated before
        UserDTO userDTO = userService.addUser(new UserDTO(data));
        ReturnedUserData res = new ReturnedUserData(userDTO);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<ReturnedUserData> login(@Validated(ValidationSequence.class) @RequestBody LoginData data, HttpServletResponse response) throws InvalidLoginException{
        UserDTO userDTO;

        EmailValidator emailValidator = new EmailValidator();
        boolean isEmail = emailValidator.isValid(data.getName(), null);
        if(isEmail){
            userDTO = userService.findByEmail(data.getName());
        } else {
            userDTO = userService.findByUsername(data.getName());
        }

        if(userDTO != null && data.getPassword().equals(userDTO.getPassword())){
            String sessionToken = UUID.randomUUID().toString();
            Cookie cookie = new Cookie("session-token", sessionToken);
            cookie.setHttpOnly(true);
            //cookie.setSecure(true); //HTTPS only
            cookie.setPath("/");
            cookie.setMaxAge(3600 * 24 * 30);

            response.addCookie(cookie);

            ReturnedUserData res = new ReturnedUserData(userDTO);
            return ResponseEntity.ok(res);
        }

        throw new InvalidLoginException("Helytelen felhasználónév vagy jelszó.");
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response){
        Cookie cookie = new Cookie("session-token", "");
        cookie.setHttpOnly(true);
        //cookie.setSecure(true); //HTTPS only
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        Map<String, String> res = new HashMap<>();
        res.put("message", "Sikeres kijelentkezés.");
        return ResponseEntity.ok(res);
    }

    // When validation failed for an argument, return only the message.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult()
                .getFieldErrors().stream()
                .findFirst()
                .map(FieldError::getDefaultMessage)
                .or(() -> ex.getBindingResult().getGlobalErrors().stream()
                        .findFirst()
                        .map(ObjectError::getDefaultMessage))
                .orElse("Sikertelen validáció.");

        Map<String, String> res = new HashMap<>();
        res.put("error", message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex) {
        Map<String, String> res = new HashMap<>();
        res.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException ex) {
        Map<String, String> res = new HashMap<>();
        res.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(TermsNotAcceptedException.class)
    public ResponseEntity<Map<String, String>> handleTermsNotAcceptedException(TermsNotAcceptedException ex) {
        Map<String, String> res = new HashMap<>();
        res.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(InvalidLoginException.class)
    public ResponseEntity<Map<String, String>> handleInvalidLoginException(InvalidLoginException ex) {
        Map<String, String> res = new HashMap<>();
        res.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }


   /*@ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleCustomException(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }*/

}
