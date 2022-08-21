package com.furama.repository.contract;

import com.furama.model.contract.ContractDetail;
import com.furama.model.contract.DTO.ContractDetailDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.SqlResultSetMapping;
import java.util.List;

public interface IContractDetailRepository extends JpaRepository<ContractDetail, Integer> {

    @Query(value = "SELECT contract_detail_id AS contractDetailId, quantity AS quantity, attach_service_id AS attachService" +
            "contract_id AS contract FROM contract_detail", nativeQuery = true)
    List<ContractDetailDTO> findAllContractDetailDTO();
}
