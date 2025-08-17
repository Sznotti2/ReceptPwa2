package hu.recept.receptpwa2.repository;

import hu.recept.receptpwa2.model.*;

public interface CustomUserRepository {
    UserDTO addUser(RegistrationData userData);
    UserDTO loginUser(LoginData userData);
    boolean deleteUser(Integer id, DeleteUserData data);
    void createPasswordResetToken(ForgotPasswordData data);
    boolean resetPassword(ResetPasswordData data);
}
