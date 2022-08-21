package com.furama.controller.rest;

import com.furama.model.service.RentType;
import com.furama.model.service.ServiceType;
import com.furama.service.service.RentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rent-types")
public class RentTypeRestController {
    @Autowired
    private RentTypeService rentTypeService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> allRentTypes() {
        List<RentType> rentTypes = rentTypeService.findAll();
        if (rentTypes.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(rentTypes, HttpStatus.OK);
    }
}
