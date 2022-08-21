package com.furama.repository.customer;

import com.furama.model.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;


public interface ICustomerRepository extends PagingAndSortingRepository<Customer, Integer> {

    Page<Customer> findAllByCustomerNameContaining(String customerName, Pageable page);

    Optional<Customer> findByCustomerCode(String code);
}
