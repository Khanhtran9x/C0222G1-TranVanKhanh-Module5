package com.codegym.service;

import com.codegym.model.authentication.User;

import java.util.List;

public interface IUserService {
    List<User> getAll();
}
