package com.furama.annotation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
@Constraint(validatedBy = NameValidator.class)
public @interface NameConstraint {
    String message() default "Service name has already existed";
    Class<?> [] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
