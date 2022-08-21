package com.furama.repository.employee;

import com.furama.model.employee.Division;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface IDivisionRepository extends JpaRepository<Division, Integer> {
}
