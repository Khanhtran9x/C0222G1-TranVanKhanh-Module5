import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerType} from '../../interface/customer-type';
import {CustomerService} from '../../service/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  customerTypes: CustomerType[];

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getAllCustomerTypes();
    this.customerForm = new FormGroup({
      customerCode: new FormControl('', [Validators.required, Validators.pattern('^(KH-)\\d{4}$')]),
      customerName: new FormControl('', [Validators.required, Validators.pattern('[\\w\\s]+$')]),
      customerBirthday: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$')]),
      customerGender: new FormControl('', Validators.required),
      customerIdCard: new FormControl('', [Validators.required, Validators.pattern('^\\d{9}$')]),
      customerPhone: new FormControl('', [Validators.required, Validators.pattern('(090)[\\d]{7}|(091)[\\d]{7}')]),
      customerEmail: new FormControl('', [Validators.required, Validators.email]),
      customerAddress: new FormControl('', Validators.required),
      customerType: new FormGroup({
        customerTypeId: new FormControl('', Validators.required)
      })
    });
  }

  getAllCustomerTypes() {
    this.customerService.getAllCustomerTypes().subscribe(customerTypes => {
      this.customerTypes = customerTypes;
    });
  }

  addNewCustomer() {
    console.log(this.customerForm.value);
    this.customerService.saveCustomer(this.customerForm.value)
      .subscribe(
        response => {
          console.log(response);
          console.log('ok');
        },
        error => {
          console.log(error);
        });
    this.customerForm.reset();
  }
}
