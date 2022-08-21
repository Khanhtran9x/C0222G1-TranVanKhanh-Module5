package com.furama.controller;

import com.furama.model.contract.Contract;
import com.furama.model.contract.DTO.ContractDTO;
import com.furama.service.contract.IContractService;
import com.furama.service.customer.ICustomerService;
import com.furama.service.employee.IEmployeeService;
import com.furama.service.service.IServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/contract")
public class ContractController {
    @Autowired
    private IContractService contractService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IServiceService serviceService;

    @GetMapping("")
    public String showList(@RequestParam(name = "page", defaultValue = "0") int page, Model model) {
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

        model.addAttribute("contractList", contractList);
        model.addAttribute("customerList", customerService.findAll());
        model.addAttribute("employeeList", employeeService.findAll());
        model.addAttribute("serviceList", serviceService.findAll());
        return "contract/list";
    }

    @GetMapping("/create")
    public String showCreationForm(Model model){
        model.addAttribute("customerList", customerService.findAll());
        model.addAttribute("employeeList", employeeService.findAll());
        model.addAttribute("customerList", serviceService.findAll());
        return "customer/create";
    }
}
