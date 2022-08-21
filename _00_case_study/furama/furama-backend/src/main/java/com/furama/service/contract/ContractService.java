package com.furama.service.contract;

import com.furama.model.contract.Contract;
import com.furama.model.contract.ContractDetail;
import com.furama.model.contract.DTO.ContractDTO;
import com.furama.repository.contract.IContractDetailRepository;
import com.furama.repository.contract.IContractRepository;
import com.furama.repository.service.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ContractService implements IContractService{
    @Autowired
    private IContractRepository contractRepository;

    @Override
    public Page<Contract> findAll(Pageable pageble) {
        return contractRepository.findAll(pageble);
    }

    @Override
    public Set<ContractDetail> contractDetailSet() {
        return null;
    }

    @Override
    public void save(Contract contract) {
        contractRepository.save(contract);
    }

    @Override
    public Optional<Contract> findById(Integer id) {
        return contractRepository.findById(id);
    }

    @Override
    public void update(Contract contract) {
        contractRepository.save(contract);
    }

    @Override
    public void remove(Contract contract) {
        contractRepository.delete(contract);
    }

    @Override
    public Double calculateTotalMoney(Contract contract) {
        double contractDetailQuantity = 0;
        double attachServiceCost = 0;
        Set<ContractDetail> contractDetails = contract.getContractDetails();
        for (ContractDetail contractDetail: contractDetails) {
            contractDetailQuantity += Double.parseDouble(contractDetail.getQuantity());
            attachServiceCost += Double.parseDouble(contractDetail.getAttachService().getAttachServiceCost());
        }
        double serviceCost = Double.parseDouble(contract.getService().getServiceCost());
        return serviceCost + contractDetailQuantity * attachServiceCost;
    }
}
