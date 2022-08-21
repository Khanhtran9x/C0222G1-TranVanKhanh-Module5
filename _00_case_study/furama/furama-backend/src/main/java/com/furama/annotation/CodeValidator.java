package com.furama.annotation;

import com.furama.service.service.IServiceService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CodeValidator implements ConstraintValidator<CodeConstraint, String> {
    @Autowired
    private IServiceService serviceService;

    @Override
    public void initialize(CodeConstraint constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        value = value.trim();
        return !serviceService.checkCode(value);
    }
}
