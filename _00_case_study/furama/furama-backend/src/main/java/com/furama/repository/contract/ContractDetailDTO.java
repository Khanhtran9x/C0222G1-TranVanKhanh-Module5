package com.furama.repository.contract;

import com.furama.model.contract.AttachService;
import com.furama.model.contract.Contract;

public interface ContractDetailDTO {
    Integer getContractDetailId();
    String getQuantity();
    Contract getContract();
    AttachService getAttachService();
}
