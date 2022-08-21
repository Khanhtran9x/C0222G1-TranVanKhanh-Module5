package com.furama.model.contract;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity(name = "contract_detail")
public class ContractDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contractDetailId;
    @Column(columnDefinition = "INT")
    private String quantity;

    @ManyToOne
    @JoinColumn(name="contract_id", nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Contract contract;

    @ManyToOne
    @JoinColumn(name="attach_service_id", nullable=false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AttachService attachService;

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
