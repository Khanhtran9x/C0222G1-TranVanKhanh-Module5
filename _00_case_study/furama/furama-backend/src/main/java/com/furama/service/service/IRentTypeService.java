package com.furama.service.service;

import com.furama.model.service.RentType;

import java.util.List;
import java.util.Optional;

public interface IRentTypeService {
    List<RentType> findAll();

    void save(RentType rentType);

    Optional<RentType> findById(Integer id);
}
