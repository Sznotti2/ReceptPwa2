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
public class PasswordResetData {
    @NotBlank(message = "Email cím megadása kötelező!", groups = BasicValidation.class)
    @ValidEmail(groups = AdvancedValidation.class)
    private String email;
}
