package hu.recept.receptpwa2.model;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnedUserData {
    private String username;
    private String email;

    public ReturnedUserData(@Valid UserDTO data) {
        this.username = data.getUsername();
        this.email = data.getEmail();
    }
}
