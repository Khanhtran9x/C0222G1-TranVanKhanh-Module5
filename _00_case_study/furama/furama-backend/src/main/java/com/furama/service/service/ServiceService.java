package com.furama.service.service;

import com.furama.model.service.Service;
import com.furama.repository.service.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceService implements IServiceService{
    @Autowired
    private IServiceRepository serviceRepository;

    @Override
    public Page<com.furama.model.service.Service> findAll(Pageable pageble) {
        return serviceRepository.findAll(pageble);
    }

    @Override
    public List<Service> findAll() {
        return serviceRepository.findAll();
    }

    @Override
    public void save(Service service) {
        serviceRepository.save(service);
    }

    @Override
    public Optional<com.furama.model.service.Service> findById(Integer id) {
        return serviceRepository.findById(id);
    }

    @Override
    public void update(com.furama.model.service.Service service) {
        serviceRepository.save(service);
    }

    @Override
    public void remove(com.furama.model.service.Service service) {
        serviceRepository.delete(service);
    }

    @Override
    public Boolean checkCode(String code) {
        Service service = serviceRepository.findByServiceCode(code);
        return service != null;
    }

    @Override
    public Boolean checkName(String name) {
        Service service = serviceRepository.findByServiceName(name);
        return service != null;
    }
}
