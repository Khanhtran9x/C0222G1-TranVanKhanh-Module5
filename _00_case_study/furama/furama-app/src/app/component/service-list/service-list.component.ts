import {Component, OnInit} from '@angular/core';
import {Service} from '../../interface/Service';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  page = 0;
  totalItems: any;
  itemsPerPage = 6;
  services: Service[] = [];

  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
    this.service.getAllServices(this.page).subscribe((services: any) => {
      console.log(services);
      this.services = services.content;
      this.totalItems = services.totalElements;
    });
  }

  getPage(page) {
    page = page - 1;
    this.service.getAllServices(page).subscribe((services: any) => {
      console.log(services);
      this.services = services.content;
      this.totalItems = services.totalElements;
    });
  }
}
