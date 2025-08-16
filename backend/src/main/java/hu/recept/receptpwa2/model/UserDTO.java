package hu.recept.receptpwa2.model;

import hu.recept.receptpwa2.validation.annotation.ValidEmail;
import hu.recept.receptpwa2.validation.annotation.ValidPassword;
import hu.recept.receptpwa2.validation.groups.AdvancedValidation;
import hu.recept.receptpwa2.validation.groups.BasicValidation;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data // Getters and Setters.
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    @NotBlank(message = "Felhasználónév megadása kötelező!", groups = BasicValidation.class)
    @Column(unique = true, nullable = false)
    private String username;

    @NotBlank(message = "Email cím megadása kötelező!", groups = BasicValidation.class)
    @ValidEmail(groups = AdvancedValidation.class)
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Jelszó megadása kötelező!", groups = BasicValidation.class)
    @ValidPassword(groups = AdvancedValidation.class)
    private String password;

    public UserDTO(@Valid RegistrationData data) {
        this.username = data.getUsername();
        this.email = data.getEmail();
        this.password = data.getPassword();
    }
}
