package com.furama.service.employee;

import com.furama.model.employee.Position;

import java.util.List;
import java.util.Optional;

public interface IPositionService {
    List<Position> findAll();

    void save(Position position);

    Optional<Position> findById(Integer id);
}
