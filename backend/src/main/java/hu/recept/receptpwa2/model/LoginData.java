package hu.recept.receptpwa2.model;

// import hu.recept.receptpwa2.validation.annotation.ValidPassword;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginData {
    @NotBlank(message = "Felhasználónév vagy Email cím megadása kötelező!")
    private String name;    //username or email

    // @ValidPassword
    @NotBlank(message = "Jelszó megadása kötelező!")
    private String password;
}
