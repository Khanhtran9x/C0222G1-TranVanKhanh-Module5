package com.furama.service.contract;

import com.furama.model.contract.AttachService;
import com.furama.model.employee.Employee;

import java.util.List;
import java.util.Optional;

public interface IAttachServiceService {
    List<AttachService> findAll();
    Optional<AttachService> findById(Integer id);
}
