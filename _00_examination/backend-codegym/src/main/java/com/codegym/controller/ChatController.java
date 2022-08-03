package com.codegym.controller;

import com.codegym.model.Chat;
import com.codegym.model.Ticket;
import com.codegym.service.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/chats")
public class ChatController {
    @Autowired
    private IChatService chatService;

    @GetMapping
    public ResponseEntity<?> allChats(@RequestParam(name = "page", defaultValue = "0") int page) {
        Sort sort = Sort.by("id").descending();
        Page<Chat> chats = chatService.findAll(PageRequest.of(page, 15, sort));
        if (chats.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(chats, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addMessage(@RequestBody Chat chat) {
        chatService.save(chat);
        return new ResponseEntity<>(chat, HttpStatus.CREATED);
    }
}
