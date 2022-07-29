package com.codegym.service;

import com.codegym.model.Brand;
import com.codegym.repository.IBrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService implements IBrandService{
    @Autowired
    private IBrandRepository brandRepository;
    @Override
    public List<Brand> findAll() {
        return (List<Brand>) brandRepository.findAll();
    }
}
