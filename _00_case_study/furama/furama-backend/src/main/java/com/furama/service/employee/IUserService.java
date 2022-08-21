package com.furama.service.employee;

import com.furama.model.employee.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> findAll();

    void save(User user);

    Optional<User> findById(Integer id);
}
