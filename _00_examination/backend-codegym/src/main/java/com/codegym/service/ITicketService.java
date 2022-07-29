package com.codegym.service;

import com.codegym.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ITicketService {
    Page<Ticket> findAll(Pageable pageble);

    List<Ticket> findAll();

    void save(Ticket ticket);

    Optional<Ticket> findById(Integer id);

    void update(Ticket ticket);

    void remove(Ticket ticket);

    Page<Ticket> search(String startPoint, String endPoint, String startDate, String endDate, Pageable pageble);
}
