package com.furama.repository.service;

import com.furama.model.service.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IServiceRepository extends JpaRepository<Service, Integer> {

    Service findByServiceCode(String serviceCode);

    Service findByServiceName(String serviceName);
}
