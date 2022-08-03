package com.codegym.controller;

import com.codegym.model.Ticket;
import com.codegym.service.IBrandService;
import com.codegym.service.ITicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tickets")
public class TicketRestController {
    @Autowired
    private ITicketService ticketService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> allTickets(@RequestParam(name = "page", defaultValue = "0") int page) {
        Sort sort = Sort.by("id").ascending();
        Page<Ticket> tickets = ticketService.findAll(PageRequest.of(page, 5, sort));
        if (tickets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id){
        Optional<Ticket> ticket = ticketService.findById(id);
        if (!ticket.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ticket.get(), HttpStatus.OK);
    }

    @CrossOrigin @PostMapping
    public ResponseEntity<?> createTicket(@RequestBody Ticket ticket) {
        ticketService.save(ticket);
        return new ResponseEntity<>(ticket, HttpStatus.CREATED);
    }


    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Ticket> editTicket(@PathVariable Integer id, @RequestBody Ticket ticket) {
        Optional<Ticket> ticketOptional = ticketService.findById(id);
        if (!ticketOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ticket.setId(ticketOptional.get().getId());
        ticketService.save(ticket);
        return new ResponseEntity<>(ticket, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/search/{startPoint}&{endPoint}&{startDate}&{endDate}")
    public ResponseEntity<?> search(@PathVariable String startPoint, @PathVariable String endPoint,
                                    @PathVariable String startDate, @PathVariable String endDate,
                                    @RequestParam(name = "page", defaultValue = "0") int page) {
        Sort sort = Sort.by("id").ascending();
        Page<Ticket> tickets = ticketService.search(startPoint, endPoint, startDate, endDate, PageRequest.of(page, 4, sort));
        if (tickets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Ticket> ticket = ticketService.findById(id);
        if (!ticket.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ticketService.remove(ticket.get());
        return new ResponseEntity<>(ticket.get(), HttpStatus.OK);
    }}
