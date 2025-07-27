package hu.recept.receptpwa2.model;

import hu.recept.receptpwa2.validation.annotation.PasswordMatches;
import hu.recept.receptpwa2.validation.annotation.ValidEmail;
import hu.recept.receptpwa2.validation.annotation.ValidPassword;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@PasswordMatches
public class RegistrationData {
    @NotBlank(message = "Felhasználónév megadása kötelező!")
    private String username;

    @ValidEmail
    @NotBlank(message = "Email cím megadása kötelező!")
    private String email;

    @ValidPassword
    @NotBlank(message = "Jelszó megadása kötelező!")
    private String password;

    @NotBlank(message = "Jelszó ismételt megadása kötelező!")
    private String confirmPassword;

    @NotNull
    private Boolean terms;
}
