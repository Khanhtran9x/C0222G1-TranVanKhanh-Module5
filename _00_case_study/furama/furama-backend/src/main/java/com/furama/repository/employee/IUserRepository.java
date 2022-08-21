package com.furama.repository.employee;

import com.furama.model.employee.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface IUserRepository extends JpaRepository<User, Integer> {
    User findByUserName(String userName);
}
