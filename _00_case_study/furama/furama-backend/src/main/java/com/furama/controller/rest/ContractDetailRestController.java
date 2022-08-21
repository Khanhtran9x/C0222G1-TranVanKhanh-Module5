package com.furama.controller.rest;

import com.furama.model.contract.ContractDetail;
import com.furama.service.contract.IContractDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contract-details")
public class ContractDetailRestController {
    @Autowired
    private IContractDetailService contractDetailService;

    @GetMapping
    public ResponseEntity<?> allContractDetails() {
        List<ContractDetail> contractDetailList = contractDetailService.findAll();
        if (contractDetailList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(contractDetailList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createContractDetail(@RequestBody ContractDetail contractDetail) {
        contractDetailService.save(contractDetail);
        return new ResponseEntity<>(contractDetail, HttpStatus.CREATED);
    }

    @DeleteMapping("/{contractId}")
    public ResponseEntity<?> delete(@PathVariable Integer contractId){
        Optional<ContractDetail> contractDetail = contractDetailService.findById(contractId);
        if (!contractDetail.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        contractDetailService.remove(contractDetail.get());
        return new ResponseEntity<>(contractDetail.get(), HttpStatus.OK);
    }
}
