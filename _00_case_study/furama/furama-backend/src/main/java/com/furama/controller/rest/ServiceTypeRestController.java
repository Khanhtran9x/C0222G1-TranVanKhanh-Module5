package com.furama.controller.rest;

import com.furama.model.service.Service;
import com.furama.model.service.ServiceType;
import com.furama.service.service.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-types")
public class ServiceTypeRestController {
    @Autowired
    private ServiceTypeService serviceTypeService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> allServiceTypes() {
        List<ServiceType> serviceTypes = serviceTypeService.findAll();
        if (serviceTypes.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(serviceTypes, HttpStatus.OK);
    }
}
