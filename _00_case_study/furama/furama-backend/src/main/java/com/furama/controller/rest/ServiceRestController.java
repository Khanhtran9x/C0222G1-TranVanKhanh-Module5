package com.furama.controller.rest;

import com.furama.model.contract.Contract;
import com.furama.model.service.Service;
import com.furama.service.service.IServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
public class ServiceRestController {
    @Autowired
    private IServiceService serviceService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> allServices(@RequestParam(name = "page", defaultValue = "0") int page) {
        Sort sort = Sort.by("serviceCode").ascending();
        Page<Service> serviceList = serviceService.findAll(PageRequest.of(page, 6, sort));
        if (serviceList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(serviceList, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<?> allServices() {
        List<Service> services = serviceService.findAll();
        if (services.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<?> createService(@Valid @RequestBody Service service) {
        serviceService.save(service);
        return new ResponseEntity<>(service, HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> findServiceById(@PathVariable Integer id) {
        Optional<Service> service = serviceService.findById(id);
        if (!service.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(service.get(), HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Service> editService(@PathVariable Integer id, @RequestBody Service service) {
        Optional<Service> serviceOptional = serviceService.findById(id);
        if (!serviceOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.setServiceId(serviceOptional.get().getServiceId());
        serviceService.save(service);
        return new ResponseEntity<>(service, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/{serviceId}")
    public ResponseEntity<?> deleteService(@PathVariable Integer serviceId){
        Optional<Service> service = serviceService.findById(serviceId);
        if (!service.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        serviceService.remove(service.get());
        return new ResponseEntity<>(service.get(), HttpStatus.OK);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
