package hu.recept.receptpwa2.model;

import hu.recept.receptpwa2.validation.groups.BasicValidation;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginData {
    @NotBlank(message = "Felhasználónév vagy Email cím megadása kötelező!", groups = BasicValidation.class)
    private String name;    //username or email

    @NotBlank(message = "Jelszó megadása kötelező!", groups = BasicValidation.class)
    private String password;
}
