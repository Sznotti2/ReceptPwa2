package hu.recept.receptpwa2.exception;

public class InvalidSessionTokenException extends RuntimeException {
    public InvalidSessionTokenException(){
        super("Invalid session token.");
    }
    public InvalidSessionTokenException(String message) {
        super(message);
    }
}
