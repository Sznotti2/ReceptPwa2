package hu.recept.receptpwa2.model;

import hu.recept.receptpwa2.validation.annotation.ValidEmail;
import hu.recept.receptpwa2.validation.groups.AdvancedValidation;
import hu.recept.receptpwa2.validation.groups.BasicValidation;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordData {
    @NotBlank(message = "Emailben kapott token megadása kötelező!", groups = BasicValidation.class)
    private String token;

    @NotBlank(message = "Új jelszó megadása kötelező!", groups = BasicValidation.class)
    private String newPassword;
}
