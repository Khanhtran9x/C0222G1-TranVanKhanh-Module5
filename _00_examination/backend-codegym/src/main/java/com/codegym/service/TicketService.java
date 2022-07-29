package com.codegym.service;

import com.codegym.model.Ticket;
import com.codegym.repository.ITicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService implements ITicketService {
    @Autowired
    private ITicketRepository iTicketRepository;

    @Override
    public Page<Ticket> findAll(Pageable pageble) {
        return iTicketRepository.findAll(pageble);
    }

    @Override
    public List<Ticket> findAll() {
        return null;
    }

    @Override
    public void save(Ticket ticket) {
        iTicketRepository.save(ticket);
    }

    @Override
    public Optional<Ticket> findById(Integer id) {
        return iTicketRepository.findById(id);
    }

    @Override
    public void update(Ticket ticket) {
        iTicketRepository.save(ticket);
    }

    @Override
    public void remove(Ticket ticket) {
        iTicketRepository.delete(ticket);
    }

    @Override
    public Page<Ticket> search(String startPoint, String endPoint, String startDate, String endDate, Pageable pageble) {
        return iTicketRepository.search("%" + startPoint + "%", "%" + endPoint + "%", startDate, endDate, pageble);
    }

}
