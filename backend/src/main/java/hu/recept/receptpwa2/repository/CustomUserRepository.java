package hu.recept.receptpwa2.repository;

import hu.recept.receptpwa2.model.UserDTO;

public interface CustomUserRepository {
    <S extends UserDTO> S addUser(S entity);
    UserDTO findByUsername(String username);
    UserDTO findByEmail(String email);
}
