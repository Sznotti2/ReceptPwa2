package hu.recept.receptpwa2.exception;

public class InvalidLoginException extends RuntimeException {
    public InvalidLoginException() {
        super("Helytelen bejelentkezési adatok.");
    }
    public InvalidLoginException(String message) {
        super(message);
    }
}
