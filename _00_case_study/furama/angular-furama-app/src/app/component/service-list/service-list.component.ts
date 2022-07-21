import { Component, OnInit } from '@angular/core';
import {Service} from "../../interface/Service";
import {ServiceService} from "../../service/service.service";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  facilities: Service[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
    this.service.getAllServices().subscribe(services => {
      console.log(services)
      this.facilities = services.content;
    })
  }
}
