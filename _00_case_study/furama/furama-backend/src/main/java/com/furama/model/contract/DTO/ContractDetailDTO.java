package com.furama.model.contract.DTO;

import com.furama.model.contract.AttachService;
import com.furama.model.contract.Contract;

public class ContractDetailDTO {
    private Integer contractDetailId;
    private String quantity;
    private Contract contract;
    private AttachService attachService;

    public ContractDetailDTO() {
    }

    public ContractDetailDTO(Integer contractDetailId, String quantity, Contract contract, AttachService attachService) {
        this.contractDetailId = contractDetailId;
        this.quantity = quantity;
        this.contract = contract;
        this.attachService = attachService;
    }

    public Integer getContractDetailId() {
        return contractDetailId;
    }

    public void setContractDetailId(Integer contractDetailId) {
        this.contractDetailId = contractDetailId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public AttachService getAttachService() {
        return attachService;
    }

    public void setAttachService(AttachService attachService) {
        this.attachService = attachService;
    }
}
