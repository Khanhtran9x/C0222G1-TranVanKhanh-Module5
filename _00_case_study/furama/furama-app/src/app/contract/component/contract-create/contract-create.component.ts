import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContractService} from '../../service/contract.service';
import {Service} from '../../../facility/interface/Service';
import {Customer} from '../../../customer/interface/customer';
import {CustomerService} from '../../../customer/service/customer.service';
import {ServiceService} from '../../../facility/service/service.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.css']
})
export class ContractCreateComponent implements OnInit {
  contractForm: FormGroup;
  services: Service[];
  customers: Customer[];

  constructor(private contractService: ContractService,
              private serviceService: ServiceService,
              private customerService: CustomerService,
              private toastr: ToastrService,
              private title: Title) {
    this.title.setTitle('Furama | Contract | Create');
  }

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllServices();
    this.contractForm = new FormGroup({
      contractStartDate: new FormControl('',
        [Validators.required, Validators.pattern('^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$')]),
      contractEndDate: new FormControl('',
        [Validators.required, Validators.pattern('^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$')]),
      contractDeposit: new FormControl('', [Validators.required, Validators.min(0)]),
      customer: new FormGroup({
        customerId: new FormControl('', Validators.required),
      }),
      service: new FormGroup({
        serviceId: new FormControl('', Validators.required),
      }),
      employee: new FormGroup({
        employeeId: new FormControl(),
      }),
    }, this.checkDate);
  }

  checkDate(abstractControl: AbstractControl): any {
    const startDate = new Date(abstractControl.value.contractStartDate);
    const endDate = new Date(abstractControl.value.contractEndDate);
    return endDate > startDate ? null : {dateerror: true};
  }

  getAllServices() {
    this.serviceService.getAllServicesList().subscribe(services => {
      this.services = services;
    });
  }

  getAllCustomers() {
    this.customerService.getAllCustomersList().subscribe(customers => {
      this.customers = customers;
    });
  }

  addNewContract() {
    console.log(this.contractForm.value);
    this.contractForm.value.employee.employeeId = 1;
    this.contractService.saveContract(this.contractForm.value)
      .subscribe(
        response => {
          console.log(response);
          console.log('ok');
          this.toastr.success('Created successfully!', 'Contract Creation');
        },
        error => {
          console.log(error);
        });
    this.contractForm.reset();
  }
}
