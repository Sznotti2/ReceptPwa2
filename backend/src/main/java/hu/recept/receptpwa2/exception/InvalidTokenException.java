package hu.recept.receptpwa2.exception;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException() {
      super("Érvénytelen token.");
    }
    public InvalidTokenException(String message) {
        super(message);
    }
}
