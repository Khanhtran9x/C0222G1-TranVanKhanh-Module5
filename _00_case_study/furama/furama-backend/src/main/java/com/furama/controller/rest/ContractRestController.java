package com.furama.controller.rest;

import com.furama.model.contract.Contract;
import com.furama.model.contract.ContractDetail;
import com.furama.model.contract.DTO.ContractDTO;
import com.furama.model.service.Service;
import com.furama.repository.contract.IContractRepository;
import com.furama.service.contract.IContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/contracts")
public class ContractRestController {
    @Autowired
    private IContractService contractService;

    @CrossOrigin
    @GetMapping()
    public ResponseEntity<?> allContracts(@RequestParam(name = "page", defaultValue = "0") int page) {
        Sort sort = Sort.by("contractId").ascending();
        Page<Contract> contractList = contractService.findAll(PageRequest.of(page, 5, sort));
        if (contractList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(contractList, HttpStatus.OK);
    }

    @GetMapping("/dto")
    public ResponseEntity<?> allContractDTO(@RequestParam(name = "page", defaultValue = "0") int page) {
        Sort sort = Sort.by("contractId").ascending();
        Page<Contract> contractPage = contractService.findAll(PageRequest.of(page, 5, sort));
        List<ContractDTO> contractDTOList = new ArrayList<>();
        for (Contract contract: contractPage) {
            ContractDTO contractDTO = new ContractDTO();
            contractDTO.setContractId(contract.getContractId());
            contractDTO.setContractStartDate(contract.getContractStartDate());
            contractDTO.setContractEndDate(contract.getContractEndDate());
            contractDTO.setContractDeposit(contract.getContractDeposit());
            contractDTO.setContractDetails(contract.getContractDetails());
            contractDTO.setCustomer(contract.getCustomer());
            contractDTO.setEmployee(contract.getEmployee());
            contractDTO.setService(contract.getService());
            contractDTO.setContractTotalMoney(contractService.calculateTotalMoney(contract));
            contractDTOList.add(contractDTO);
        }
        Page<ContractDTO> contractList = new PageImpl<>(contractDTOList);
        if (contractList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(contractList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findContractById(@PathVariable Integer id){
        Optional<Contract> contract = contractService.findById(id);
        if (!contract.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(contract.get(), HttpStatus.OK);
    }

    @GetMapping("/{id}/contract-details")
    public ResponseEntity<?> allContractDetailById(@PathVariable Integer id) {
        Set<ContractDetail> contractDetails = contractService.findById(id).get().getContractDetails();
        if (contractDetails.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(contractDetails, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<?> createContract(@RequestBody Contract contract) {
        contractService.save(contract);
        return new ResponseEntity<>(contract, HttpStatus.CREATED);
    }

    @CrossOrigin
    @DeleteMapping("/{contractId}")
    public ResponseEntity<?> delete(@PathVariable Integer contractId){
        Optional<Contract> contract = contractService.findById(contractId);
        if (!contract.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        contractService.remove(contract.get());
        return new ResponseEntity<>(contract.get(), HttpStatus.OK);
    }
}
