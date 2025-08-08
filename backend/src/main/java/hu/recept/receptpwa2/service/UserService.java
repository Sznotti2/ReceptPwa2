package hu.recept.receptpwa2.service;

//import hu.recept.receptpwa2.config.AppConfig;
import hu.recept.receptpwa2.exception.EmailAlreadyExistsException;
import hu.recept.receptpwa2.exception.UsernameAlreadyExistsException;
import hu.recept.receptpwa2.model.User;
import hu.recept.receptpwa2.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public <S extends User> S saveAndFlush(S entity) throws UsernameAlreadyExistsException, EmailAlreadyExistsException {
        if(userRepository.findByUsername(entity.getUsername()) != null) {
            throw new UsernameAlreadyExistsException("Ez a felhasználónév már foglalt.");
        } else if(userRepository.findByEmail(entity.getEmail()) != null) {
            throw new EmailAlreadyExistsException("Ez az email cím már foglalt.");
        }
        return userRepository.saveAndFlush(entity);
    }

    @Transactional
    public User findByUsername(String username) {
        System.out.println("HELLO: " + userRepository.findByUsername(username));
        return userRepository.findByUsername(username);
    }

    @Transactional
    public User findByEmail(String email) {
        System.out.println("HELLO: " + userRepository.findByEmail(email));
        return userRepository.findByEmail(email);
    }

}
