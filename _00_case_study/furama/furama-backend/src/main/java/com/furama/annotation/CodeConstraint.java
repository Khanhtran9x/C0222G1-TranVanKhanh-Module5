package com.furama.annotation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
@Constraint(validatedBy = CodeValidator.class)
public @interface CodeConstraint {
    String message() default "Service code has already existed";
    Class<?> [] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
