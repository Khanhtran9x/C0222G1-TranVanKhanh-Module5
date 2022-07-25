import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerType} from '../../interface/customer-type';
import {CustomerService} from '../../service/customer.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  customerTypes: CustomerType[];

  constructor(private customerService: CustomerService,
              private toastr: ToastrService,
              private title: Title) {
    this.title.setTitle('Furama | Customer | Create');
  }

  ngOnInit(): void {
    this.getAllCustomerTypes();
    this.customerForm = new FormGroup({
      customerCode: new FormControl('', [Validators.required, Validators.pattern('^(KH-)\\d{4}$')]),
      customerName: new FormControl('', [Validators.required, Validators.pattern('[\\w\\s]+$')]),
      customerBirthday: new FormControl('',
        [Validators.required, Validators.pattern('^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'), this.checkAge]),
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

  checkAge(abstractControl: AbstractControl): any {
    const date = new Date(abstractControl.value);
    const now = new Date();
    if (now.getFullYear() - date.getFullYear() > 18) {
      return null;
    } else if (now.getFullYear() - date.getFullYear() === 18) {
      if (now.getMonth() > date.getMonth()) {
        console.log('month now >');
        return null;
      } else {
        if (now.getMonth() === date.getMonth()) {
          if (now.getDate() >= date.getDate()) {
            return null;
          } else {
            return {not18: true};
          }
        } else {
          return {not18: true};
        }
      }
    } else {
      return {not18: true};
    }
  }

  checkCode(abstractControl: AbstractControl): any {
    const code = abstractControl.value;
    console.log(code);
    if (code.length === 7) {
      this.customerService.checkCustomerCode(code).subscribe(customer => {
        console.log('kaka');
      });
    }
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
          this.toastr.success('Created successfully!', 'Customer');
        },
        error => {
          console.log(error);
        });
    this.customerForm.reset();
  }
}
