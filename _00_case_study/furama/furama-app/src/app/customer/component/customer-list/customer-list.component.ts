import { Component, OnInit } from '@angular/core';
import {Customer} from '../../interface/customer';
import {CustomerService} from '../../service/customer.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

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
  constructor(private customerService: CustomerService,
              private toastr: ToastrService,
              private title: Title) {
    this.title.setTitle('Furama | Customer');
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers(this.page).subscribe((customers: any) => {
      console.log(customers);
      this.customers = customers.content;
      this.totalItems = customers.totalElements;
      this.toastr.success('Loaded successfully!', 'Customer');
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
          this.toastr.success('Deleted successfully!', 'Customer');
        },
        error => {
          console.log(error);
        });
  }
}
