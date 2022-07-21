import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../enviroment";
import {ServiceType} from "../interface/service-type";
import {RentType} from "../interface/rent-type";
import {Service} from "../interface/Service";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(API_URL + '/api/services');
  }

  getAllServiceTypes(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(API_URL + '/api/service-types');
  }

  getAllRentTypes(): Observable<RentType[]> {
    return this.http.get<RentType[]>(API_URL + '/api/rent-types');
  }
}
