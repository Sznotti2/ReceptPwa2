package hu.recept.receptpwa2.controller;

import hu.recept.receptpwa2.exception.*;
import hu.recept.receptpwa2.model.*;
import hu.recept.receptpwa2.repository.SessionService;
import hu.recept.receptpwa2.service.UserService;
import hu.recept.receptpwa2.validation.groups.ValidationSequence;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SessionService sessionService;

    @PostMapping("/register")
    public ResponseEntity<ReturnedUserData> register(@Validated(ValidationSequence.class) @RequestBody RegistrationData data) throws TermsNotAcceptedException  {
        if(!data.getTerms()){
            throw new TermsNotAcceptedException();
        }

        UserDTO user = userService.addUser(data);

        ReturnedUserData res = new ReturnedUserData(user);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<ReturnedUserData> login(@Validated(ValidationSequence.class) @RequestBody LoginData data, HttpServletResponse response) throws InvalidLoginException{
        UserDTO user = userService.loginUser(data);

        if(user != null){
            String token = UUID.randomUUID().toString();
            sessionService.createSession(token, user.getUserId());

            Cookie cookie = new Cookie("session-token", token);
            cookie.setHttpOnly(true);
            //cookie.setSecure(true); //HTTPS only
            cookie.setPath("/");
            cookie.setMaxAge(3600 * 24 * 30);
            response.addCookie(cookie);

            ReturnedUserData res = new ReturnedUserData(user);
            return ResponseEntity.ok(res);
        }

        throw new InvalidLoginException();
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@CookieValue("session-token") String sessionToken, HttpServletResponse response) throws InvalidSessionTokenException {
        if(sessionService.isValidSession(sessionToken)){
            sessionService.invalidateSession(sessionToken);

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
        throw new InvalidSessionTokenException();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Integer id, @Validated(ValidationSequence.class) @RequestBody DeleteUserData data, HttpServletResponse response) throws UserNotDeletedException {
        if (userService.deleteUser(id, data)) {
            List<String> tokens = sessionService.getTokensByUserId(id);
            tokens.forEach(token -> sessionService.invalidateSession(token));

            Cookie cookie = new Cookie("session-token", "");
            cookie.setHttpOnly(true);
            //cookie.setSecure(true); //HTTPS only
            cookie.setPath("/");
            cookie.setMaxAge(0);
            response.addCookie(cookie);

            Map<String, String> res = new HashMap<>();
            res.put("message", "Felhasználó törlése sikeres.");
            return ResponseEntity.ok(res);
        }
        throw new UserNotDeletedException();
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@Validated(ValidationSequence.class) @RequestBody ForgotPasswordData data) {
        userService.createPasswordResetToken(data);

        Map<String, String> res = new HashMap<>();
        res.put("message", "A tokent elküldtük a megadott email címre.");
        return ResponseEntity.ok(res);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@Validated(ValidationSequence.class) @RequestBody ResetPasswordData data) throws InvalidTokenException {
        boolean result = userService.resetPassword(data);
        if (result) {
            Map<String, String> res = new HashMap<>();
            res.put("message", "A jelszót megváltoztattuk.");
            return ResponseEntity.ok(res);
        } else {
            throw new InvalidTokenException();
        }
    }
}
