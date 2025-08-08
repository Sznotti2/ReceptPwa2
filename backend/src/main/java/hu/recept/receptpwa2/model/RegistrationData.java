package hu.recept.receptpwa2.model;

import hu.recept.receptpwa2.validation.annotation.PasswordMatches;
import hu.recept.receptpwa2.validation.annotation.ValidEmail;
import hu.recept.receptpwa2.validation.annotation.ValidPassword;
import hu.recept.receptpwa2.validation.groups.AdvancedValidation;
import hu.recept.receptpwa2.validation.groups.BasicValidation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@PasswordMatches(message = "A jelszavak nem egyeznek.", groups = AdvancedValidation.class)
public class RegistrationData {
    @NotBlank(message = "Felhasználónév megadása kötelező!", groups = BasicValidation.class)
    private String username;

    @NotBlank(message = "Email cím megadása kötelező!", groups = BasicValidation.class)
    @ValidEmail(groups = AdvancedValidation.class)
    private String email;

    @NotBlank(message = "Jelszó megadása kötelező!", groups = BasicValidation.class)
    @ValidPassword(groups = AdvancedValidation.class)
    private String password;

    @NotBlank(message = "Jelszó ismételt megadása kötelező!", groups = BasicValidation.class)
    private String confirmPassword;

    @NotNull(message = "Az adatkezelési tájékoztatóban foglaltakat el kell fogadni!", groups = BasicValidation.class)
    private Boolean terms;
}
