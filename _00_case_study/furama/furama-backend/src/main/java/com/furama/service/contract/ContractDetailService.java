package com.furama.service.contract;

import com.furama.model.contract.ContractDetail;
import com.furama.repository.contract.ContractDetailDTO;
import com.furama.repository.contract.IContractDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractDetailService implements IContractDetailService{
    @Autowired
    private IContractDetailRepository contractDetailRepository;

    @Override
    public List<ContractDetail> findAll() {
        return contractDetailRepository.findAll();
    }

    @Override
    public List<ContractDetailDTO> findAllContractDetailDTO() {
        return null;
    }

    @Override
    public void save(ContractDetail contractDetail) {
        contractDetailRepository.save(contractDetail);
    }

    @Override
    public Optional<ContractDetail> findById(Integer id) {
        return contractDetailRepository.findById(id);
    }

    @Override
    public void remove(ContractDetail contractDetail) {
        contractDetailRepository.delete(contractDetail);
    }
}
