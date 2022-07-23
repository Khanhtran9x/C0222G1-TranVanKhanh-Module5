import { Component, OnInit } from '@angular/core';
import {Customer} from '../../interface/customer';
import {CustomerService} from '../../service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  page = 0;
  totalItems: any;
  itemsPerPage = 6;
  customers: Customer[];
  customerId: number;
  customerName: string;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers(this.page).subscribe((customers: any) => {
      console.log(customers);
      this.customers = customers.content;
      this.totalItems = customers.totalElements;
    });
  }

  getPage(page) {
    page = page - 1;
    this.customerService.getAllCustomers(page).subscribe((customers: any) => {
      this.customers = customers.content;
      this.totalItems = customers.totalElements;
    });
  }

  getCustomerInfo(customerId: number, customerName: string) {
    this.customerId = customerId;
    this.customerName = customerName;
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.customerId)
      .subscribe(
        response => {
          console.log(response);
          this.getAllCustomers();
        },
        error => {
          console.log(error);
        });
  }
}
