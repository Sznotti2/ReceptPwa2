package hu.recept.receptpwa2.validation.annotation;

import hu.recept.receptpwa2.validation.PasswordConstraintValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ TYPE, FIELD, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = PasswordConstraintValidator.class)
@Documented
public @interface ValidPassword {
    String message() default "Gyenge jelszó";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}