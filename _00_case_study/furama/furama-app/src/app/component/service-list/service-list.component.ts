import { Component, OnInit } from '@angular/core';
import {Service} from "../../interface/Service";
import {ServiceService} from "../../service/service.service";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  curPage: number;
  pageSize: number;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getAllServices();
    this.curPage = 1;
    this.pageSize = 10;
  }

  getAllServices() {
    this.service.getAllServices().subscribe(services => {
      console.log(services)
      this.services = services;
    })
  }

  numberOfPages() {
    return Math.ceil(this.services.length / this.pageSize);
  };
}
