package com.furama.service.service;

import com.furama.model.service.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IServiceService {
    Page<Service> findAll(Pageable pageble);

    List<Service> findAll();

    void save(Service service);

    Optional<Service> findById(Integer id);

    void update(Service service);

    void remove(Service service);

    Boolean checkCode(String code);

    Boolean checkName(String name);
}
