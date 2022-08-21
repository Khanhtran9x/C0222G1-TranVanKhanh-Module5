package com.furama.repository.service;

import com.furama.model.service.RentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IRentTypeRepository extends JpaRepository<RentType, Integer> {
}
