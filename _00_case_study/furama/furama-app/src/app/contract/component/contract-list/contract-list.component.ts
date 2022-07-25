import { Component, OnInit } from '@angular/core';
import {Contract} from '../../interface/contract';
import {ContractService} from '../../service/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  page = 0;
  totalItems: any;
  itemsPerPage = 6;
  contracts: Contract[];
  contractId: number;

  constructor(private contractService: ContractService) { }

  ngOnInit(): void {
    this.getAllContracts();
  }

  getAllContracts() {
    this.contractService.getAllContracts(this.page).subscribe((contracts: any) => {
      console.log(contracts);
      this.contracts = contracts.content;
      this.totalItems = contracts.totalElements;
    });
  }

  getPage(page) {
    page = page - 1;
    this.contractService.getAllContracts(page).subscribe((contracts: any) => {
      console.log(contracts);
      this.contracts = contracts.content;
      this.totalItems = contracts.totalElements;
    });
  }

  getContractInfo(contractId: number) {
    this.contractId = contractId;
  }

  deleteContract() {
    this.contractService.deleteContract(this.contractId)
      .subscribe(
        response => {
          console.log(response);
          this.getAllContracts();
        },
        error => {
          console.log(error);
        });
  }
}
