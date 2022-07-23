import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CustomerType} from '../../interface/customer-type';
import {CustomerService} from '../../service/customer.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  id: number;
  customerTypes: CustomerType[];
  customerForm = new FormGroup({
    customerId: new FormControl(),
    customerCode: new FormControl(),
    customerName: new FormControl(),
    customerBirthday: new FormControl(),
    customerGender: new FormControl(),
    customerIdCard: new FormControl(),
    customerPhone: new FormControl(),
    customerEmail: new FormControl(),
    customerAddress: new FormControl(),
    customerType: new FormGroup({
      customerTypeId: new FormControl()
    })
  });
  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.getCustomer(this.id);
    this.getAllCustomerTypes();
  }
  getAllCustomerTypes() {
    this.customerService.getAllCustomerTypes().subscribe(customerTypes => {
      this.customerTypes = customerTypes;
    });
  }

  getCustomer(id) {
    this.customerService.findById(id).subscribe(customer => {
      this.customerForm.patchValue(customer);
    });
  }

  editCustomer() {
    this.customerService.updateCustomer(this.customerForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigateByUrl('/customers');
        },
        error => {
          console.log(error);
        });
  }
}
