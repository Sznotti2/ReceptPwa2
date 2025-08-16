package hu.recept.receptpwa2.service;

import hu.recept.receptpwa2.exception.EmailAlreadyExistsException;
import hu.recept.receptpwa2.exception.UsernameAlreadyExistsException;
import hu.recept.receptpwa2.model.UserDTO;
import hu.recept.receptpwa2.repository.CustomUserRepository;
import hu.recept.receptpwa2.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements CustomUserRepository {
    @Autowired
    private UserRepository userRepository;

    @Override
    public <S extends UserDTO> S addUser(S entity) throws UsernameAlreadyExistsException, EmailAlreadyExistsException {
        if(userRepository.findByUsername(entity.getUsername()) != null) {
            throw new UsernameAlreadyExistsException("Ez a felhasználónév már foglalt.");
        } else if(userRepository.findByEmail(entity.getEmail()) != null) {
            throw new EmailAlreadyExistsException("Ez az email cím már foglalt.");
        }
        return userRepository.saveAndFlush(entity);
    }

    @Override
    public UserDTO findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDTO findByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
