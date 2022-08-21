package com.furama.service.service;

import com.furama.model.service.ServiceType;

import java.util.List;
import java.util.Optional;

public interface IServiceTypeService {
    List<ServiceType> findAll();

    void save(ServiceType serviceType);

    Optional<ServiceType> findById(Integer id);
}
