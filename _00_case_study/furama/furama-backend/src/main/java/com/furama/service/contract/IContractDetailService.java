package com.furama.service.contract;

import com.furama.model.contract.ContractDetail;
import com.furama.repository.contract.ContractDetailDTO;

import java.util.List;
import java.util.Optional;

public interface IContractDetailService {
    List<ContractDetail> findAll();
    List<ContractDetailDTO> findAllContractDetailDTO();
    void save(ContractDetail contractDetail);
    Optional<ContractDetail> findById(Integer id);
    void remove(ContractDetail contractDetail);
}
