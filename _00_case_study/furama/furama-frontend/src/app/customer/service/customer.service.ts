import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Customer} from '../interface/customer';
import {environment} from '../../enviroment';
import {CustomerType} from '../interface/customer-type';
import {AuthService} from '../../login/service/auth.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private authenticationService: AuthService) {
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

  checkCustomerCode(code): Observable<Customer> {
    return this.http.get<Customer>(API_URL + `/api/customers/code/${code}`);
  }

  private handleError(httpError: HttpErrorResponse) {
    let message = '';
    if (httpError.error instanceof ProgressEvent) {
      console.log('in progrss event');
      message = 'Network error';
    } else {
      message = JSON.parse(httpError.error).message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later. Error Message- ' + message);
  }
}
