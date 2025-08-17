package hu.recept.receptpwa2.service;

import hu.recept.receptpwa2.repository.SessionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class InMemorySessionService implements SessionService {
    private final Map<String, Integer> sessionMap = new ConcurrentHashMap<>();

    @Override
    public void createSession(String token, Integer userId) {
        sessionMap.put(token, userId);
    }

    @Override
    public boolean isValidSession(String token) {
        return sessionMap.containsKey(token);
    }

    @Override
    public void invalidateSession(String token) {
        sessionMap.remove(token);
    }

    @Override
    public List<String> getTokensByUserId(Integer userId) {
        return sessionMap.entrySet().stream()
                .filter(entry -> entry.getValue().equals(userId))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }
}
