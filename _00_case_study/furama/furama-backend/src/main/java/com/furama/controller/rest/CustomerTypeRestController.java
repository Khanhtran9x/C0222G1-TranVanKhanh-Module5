package com.furama.controller.rest;

import com.furama.model.customer.CustomerType;
import com.furama.service.customer.ICustomerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customer-types")
public class CustomerTypeRestController {
    @Autowired
    private ICustomerTypeService customerTypeService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> allCustomerTypes() {
        List<CustomerType> customerTypes = customerTypeService.findAll();
        if (customerTypes.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customerTypes, HttpStatus.OK);
    }
}
