package hu.recept.receptpwa2.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException() {
        super("Ez a felhasználónév már foglalt.");
    }
    public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
