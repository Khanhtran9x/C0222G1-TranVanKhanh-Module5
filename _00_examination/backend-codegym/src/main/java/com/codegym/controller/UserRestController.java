package com.codegym.controller;

import com.codegym.model.authentication.User;
import com.codegym.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserRestController {
    @Autowired
    private IUserService userService;

    @GetMapping
    @CrossOrigin
    public ResponseEntity<?> allUsers() {
        List<User> users = userService.getAll();
//        List<String> usernames = new ArrayList();
//        for (User user: users) {
//            usernames.add(user.getUserName());
//        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
