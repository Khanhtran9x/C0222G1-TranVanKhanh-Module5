package com.codegym.repository;

import com.codegym.model.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ITicketRepository extends PagingAndSortingRepository<Ticket, Integer> {
    @Query(value = "SELECT * FROM ticket WHERE start_point LIKE :startPoint AND end_point LIKE :endPoint\n" +
            "                       AND start_date BETWEEN :startDate AND :endDate", nativeQuery = true)
    Page<Ticket> search(@Param("startPoint") String startPoint, @Param("endPoint") String endPoint,
                              @Param("startDate") String startDate, @Param("endDate") String endDate, Pageable pageble);
}
