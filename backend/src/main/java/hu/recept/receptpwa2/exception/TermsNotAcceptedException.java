package hu.recept.receptpwa2.exception;

public class TermsNotAcceptedException extends RuntimeException {
    public TermsNotAcceptedException() {
        super("Az adatkezelési tájékoztatóban foglaltakat el kell fogadni!");
    }
    public TermsNotAcceptedException(String message) {
        super(message);
    }
}
