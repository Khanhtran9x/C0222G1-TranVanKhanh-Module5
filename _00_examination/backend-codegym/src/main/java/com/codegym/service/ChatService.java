package com.codegym.service;

import com.codegym.model.Chat;
import com.codegym.repository.IChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ChatService implements IChatService{
    @Autowired
    private IChatRepository iChatRepository;

    @Override
    public Page<Chat> findAll(Pageable pageble) {
        return iChatRepository.findAll(pageble);
    }

    @Override
    public void save(Chat chat) {
        iChatRepository.save(chat);
    }
}
