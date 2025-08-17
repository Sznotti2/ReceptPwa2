package hu.recept.receptpwa2.exception;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException() {
        super("Ez az email cím már foglalt.");
    }
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
