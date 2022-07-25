import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contract} from '../interface/contract';
import {environment} from '../enviroment';
import {Customer} from '../customer/interface/customer';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  getAllContracts(page: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(API_URL + `/api/contracts?page=${page}`);
  }

  saveContract(contract): Observable<Contract> {
    return this.http.post<Contract>(API_URL + '/api/contracts', contract);
  }

  deleteContract(contractId): Observable<Contract> {
    return this.http.delete<Contract>(API_URL + `/api/contracts/${contractId}`);
  }
}
