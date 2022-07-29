package com.codegym.repository;

import com.codegym.model.Brand;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IBrandRepository extends PagingAndSortingRepository<Brand, Integer> {
}
