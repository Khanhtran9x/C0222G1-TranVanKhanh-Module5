package com.furama.repository.contract;

import com.furama.model.contract.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IContractRepository extends JpaRepository<Contract, Integer> {
}
