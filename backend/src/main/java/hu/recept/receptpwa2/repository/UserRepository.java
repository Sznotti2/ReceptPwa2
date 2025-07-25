package hu.recept.receptpwa2.repository;

import java.util.List;
import java.util.Optional;

import hu.recept.receptpwa2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

// Spring Data JPA creates CRUD implementation at runtime automatically.
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByEmail(String email);
}
