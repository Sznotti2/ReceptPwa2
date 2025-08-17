package hu.recept.receptpwa2.service;

import hu.recept.receptpwa2.exception.EmailAlreadyExistsException;
import hu.recept.receptpwa2.exception.UsernameAlreadyExistsException;
import hu.recept.receptpwa2.model.*;
import hu.recept.receptpwa2.repository.CustomUserRepository;
import hu.recept.receptpwa2.repository.UserRepository;
import hu.recept.receptpwa2.validation.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService implements CustomUserRepository {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO addUser(RegistrationData userData) throws UsernameAlreadyExistsException, EmailAlreadyExistsException {
        if(userRepository.findByUsername(userData.getUsername()) != null) {
            throw new UsernameAlreadyExistsException();
        } else if(userRepository.findByEmail(userData.getEmail()) != null) {
            throw new EmailAlreadyExistsException();
        }

        UserDTO user = new UserDTO(userData);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.saveAndFlush(user);
    }

    @Override
    public UserDTO loginUser(LoginData userData) {
        UserDTO user;

        EmailValidator emailValidator = new EmailValidator();
        boolean isEmail = emailValidator.isValid(userData.getName(), null);
        if(isEmail){
            user = userRepository.findByEmail(userData.getName());
        } else {
            user = userRepository.findByUsername(userData.getName());
        }

        if(user != null){
            String rawPassword = userData.getPassword();
            String hashedPassword = user.getPassword();

            if(passwordEncoder.matches(rawPassword, hashedPassword)){
                return user;
            }
        }

        return null;
    }

    @Override
    public boolean deleteUser(Integer id, DeleteUserData data) {
        if (userRepository.existsById(id)) {
            UserDTO user = userRepository.findById(id).get();
            if(passwordEncoder.matches(data.getPassword(), user.getPassword())){
                userRepository.deleteById(id);
                return true;
            }
        }
        return false;
    }

    @Override
    public void createPasswordResetToken(ForgotPasswordData data) {
        UserDTO userDTO = userRepository.findByEmail(data.getEmail());

        if (userDTO != null) {
            String token = UUID.randomUUID().toString();
            userDTO.setResetPasswordToken(token);
            userDTO.setResetTokenExpiry(LocalDateTime.now().plusMinutes(30));
            userRepository.saveAndFlush(userDTO);
            // Send token to user's email (use JavaMailSender)
        }
    }

    @Override
    public boolean resetPassword(ResetPasswordData data) {
        UserDTO user = userRepository.findByResetPasswordToken(data.getToken());
        if (user != null && user.getResetTokenExpiry().isAfter(LocalDateTime.now())) {
            user.setPassword(passwordEncoder.encode(data.getNewPassword()));
            user.setResetPasswordToken(null);
            user.setResetTokenExpiry(null);
            userRepository.saveAndFlush(user);
            return true;
        }
        return false;
    }
}
