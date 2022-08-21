package com.furama.controller.rest;

import com.furama.model.customer.Customer;
import com.furama.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/customers")
public class CustomerRestController {
    @Autowired
    private ICustomerService customerService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> allCustomers(@RequestParam(name = "page", defaultValue = "0") int page) {
        Sort sort = Sort.by("customerName").ascending();
        Page<Customer> customers = customerService.findAll(PageRequest.of(page, 7, sort));
        if (customers.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<?> allCustomersList() {
        List<Customer> customers = customerService.findAll();
        if (customers.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/code/{code}")
    public ResponseEntity<?> findCustomerCode(@PathVariable String code){
        Optional<Customer> customer = customerService.findByCode(code);
        if (!customer.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(customer.get(), HttpStatus.OK);
    }


    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> findCustomerById(@PathVariable Integer id){
        Optional<Customer> customer = customerService.findById(id);
        if (!customer.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(customer.get(), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<?> createCustomer(@Valid @RequestBody Customer customer) {
        customerService.save(customer);
        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Customer> editCustomer(@PathVariable Integer id, @RequestBody Customer customer) {
        Optional<Customer> customerOptional = customerService.findById(id);
        if (!customerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        customer.setCustomerId(customerOptional.get().getCustomerId());
        customerService.save(customer);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteCustomers(@RequestBody List<Customer> customers) {
        for (Customer customer: customers) {
            Optional<Customer> customerOptional = customerService.findById(customer.getCustomerId());
            customerService.remove(customerOptional.get());
        }
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/{customerId}")
    public ResponseEntity<?> delete(@PathVariable Integer customerId){
        Optional<Customer> customer = customerService.findById(customerId);
        if (!customer.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        customerService.remove(customer.get());
        return new ResponseEntity<>(customer.get(), HttpStatus.OK);
    }
}
