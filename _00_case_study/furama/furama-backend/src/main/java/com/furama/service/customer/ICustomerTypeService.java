package com.furama.service.customer;

import com.furama.model.customer.CustomerType;

import java.util.List;
import java.util.Optional;

public interface ICustomerTypeService {
    List<CustomerType> findAll();

    void save(CustomerType customerType);

    Optional<CustomerType> findById(Integer id);
}
