package hu.recept.receptpwa2.exception;

public class UserNotDeletedException extends RuntimeException {
    public UserNotDeletedException(){
        super("Helytelen felhasználó azonosító vagy jelszó.");
    }
    public UserNotDeletedException(String message) {
        super(message);
    }
}
