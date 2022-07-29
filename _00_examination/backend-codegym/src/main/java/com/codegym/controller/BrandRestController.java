package com.codegym.controller;

import com.codegym.model.Brand;
import com.codegym.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/brands")
public class BrandRestController {
    @Autowired
    private IBrandService brandService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> allCustomersList() {
        List<Brand> brands = brandService.findAll();
        if (brands.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(brands, HttpStatus.OK);
    }
}
