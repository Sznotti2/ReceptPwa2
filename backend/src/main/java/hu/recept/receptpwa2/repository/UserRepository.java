package hu.recept.receptpwa2.repository;

import hu.recept.receptpwa2.model.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDTO, Integer> {
    UserDTO findByUsername(String username);
    UserDTO findByEmail(String email);
    UserDTO findByResetPasswordToken(String token);

}
