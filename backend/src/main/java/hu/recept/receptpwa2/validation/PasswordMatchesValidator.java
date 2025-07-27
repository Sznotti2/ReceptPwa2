package hu.recept.receptpwa2.validation;

import hu.recept.receptpwa2.model.RegistrationData;
import hu.recept.receptpwa2.validation.annotation.PasswordMatches;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(PasswordMatches constraintAnnotation) {
    }
    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context){
        RegistrationData data = (RegistrationData) obj;
        return data.getPassword().equals(data.getConfirmPassword());
    }
}