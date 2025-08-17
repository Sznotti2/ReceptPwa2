package hu.recept.receptpwa2.repository;

import java.util.List;

public interface SessionService {
    void createSession(String token, Integer userId);
    boolean isValidSession(String token);
    void invalidateSession(String token);
    List<String> getTokensByUserId(Integer userId);
}
