package com.furama.repository.service;

import com.furama.model.service.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IServiceTypeRepository extends JpaRepository<ServiceType, Integer> {
}
