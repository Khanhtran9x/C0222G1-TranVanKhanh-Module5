import {Component, OnInit} from '@angular/core';
import {Service} from '../../interface/Service';
import {ServiceType} from '../../interface/service-type';
import {RentType} from '../../interface/rent-type';
import {FormControl, FormGroup} from '@angular/forms';
import {ServiceService} from '../../service/service.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {
  serviceForm: FormGroup;
  services: Service[] = [];
  serviceTypes: ServiceType[];
  rentTypes: RentType[];

  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.getAllServiceTypes();
    this.getAllRentTypes();
    this.getAllServices();

    this.serviceForm = new FormGroup({
      serviceCode: new FormControl(),
      serviceName: new FormControl(),
      serviceArea: new FormControl(),
      serviceCost: new FormControl(),
      serviceNumberOfFloors: new FormControl(),
      serviceMaxPeople: new FormControl(),
      servicePoolArea: new FormControl(),
      serviceStandardRoom: new FormControl(),
      serviceType: new FormControl(),
      rentType: new FormControl(),
      otherConvenience: new FormControl(),
      imgUrl: new FormControl()
    });
  }

  getAllServiceTypes() {
    this.service.getAllServiceTypes().subscribe(serviceTypes => {
      this.serviceTypes = serviceTypes;
    });
  }

  getAllRentTypes() {
    this.service.getAllRentTypes().subscribe(rentTypes => {
      this.rentTypes = rentTypes;
    });
  }

  getAllServices() {
    this.service.getAllServices(1).subscribe(services => {
      console.log(services);
      this.services = services;
    });
  }

  createNewFacility() {
    console.log(this.serviceForm.value);
  }
}
