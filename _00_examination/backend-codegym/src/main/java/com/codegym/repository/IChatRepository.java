package com.codegym.repository;

import com.codegym.model.Chat;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IChatRepository extends PagingAndSortingRepository<Chat, Integer> {
}
