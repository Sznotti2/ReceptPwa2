package hu.recept.receptpwa2.model;

import hu.recept.receptpwa2.validation.annotation.ValidEmail;
import hu.recept.receptpwa2.validation.annotation.ValidPassword;
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
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    @NotBlank(message = "Felhasználónév megadása kötelező!")
    private String username;

    @ValidEmail
    @NotBlank(message = "Email cím megadása kötelező!")
    private String email;

    @ValidPassword
    @NotBlank(message = "Jelszó megadása kötelező!")
    private String password;

    public User(@Valid RegistrationData data) {
        this.username = data.getUsername();
        this.email = data.getEmail();
        this.password = data.getPassword();
    }
}
