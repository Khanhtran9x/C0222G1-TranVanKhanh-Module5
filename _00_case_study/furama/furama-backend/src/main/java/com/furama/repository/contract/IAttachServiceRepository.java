package com.furama.repository.contract;

import com.furama.model.contract.AttachService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IAttachServiceRepository extends JpaRepository<AttachService, Integer> {
}
