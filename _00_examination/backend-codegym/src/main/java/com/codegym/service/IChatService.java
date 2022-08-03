package com.codegym.service;

import com.codegym.model.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IChatService {
    Page<Chat> findAll(Pageable pageble);
    void save(Chat chat);
}
