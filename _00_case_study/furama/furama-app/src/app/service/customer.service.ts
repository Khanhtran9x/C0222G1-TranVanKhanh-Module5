import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../interface/customer';
import {environment} from '../enviroment';
import {CustomerType} from '../interface/customer-type';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getAllCustomers(page: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL + `/api/customers?page=${page}`);
  }

  getAllCustomersList(): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL + '/api/customers/list');
  }

  getAllCustomerTypes(): Observable<CustomerType[]> {
    return this.http.get<CustomerType[]>(API_URL + '/api/customer-types');
  }

  saveCustomer(customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL + '/api/customers', customer);
  }

  updateCustomer(customer): Observable<Customer> {
    return this.http.put<Customer>(API_URL + `/api/customers/${customer.customerId}`, customer);
  }

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(API_URL + `/api/customers/${id}`);
  }

  deleteCustomer(customerId): Observable<Customer> {
    return this.http.delete<Customer>(API_URL + `/api/customers/${customerId}`);
  }
}
