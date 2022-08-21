package com.furama.controller.rest;

import com.furama.model.contract.AttachService;
import com.furama.model.contract.DTO.AttachServiceDTO;
import com.furama.service.contract.IAttachServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attach-services")
public class AttachServiceRestController {
    @Autowired
    private IAttachServiceService attachServiceService;

    @GetMapping("")
    public ResponseEntity<?> allAttachServicesByContract() {
        List<AttachService> attachServiceList = attachServiceService.findAll();
        if (attachServiceList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(attachServiceList, HttpStatus.OK);
    }

    @GetMapping("/{attachServiceId}")
    public ResponseEntity<?> findServiceById(@PathVariable Integer attachServiceId){
        Optional<AttachService> attachService = attachServiceService.findById(attachServiceId);
        if (!attachService.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(attachService.get(), HttpStatus.OK);
    }
}
