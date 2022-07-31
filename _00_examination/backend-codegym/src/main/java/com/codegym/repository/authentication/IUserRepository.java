package com.codegym.repository.authentication;

import com.codegym.model.authentication.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface IUserRepository extends JpaRepository<User, Integer> {
    User findByUserName(String userName);
}
