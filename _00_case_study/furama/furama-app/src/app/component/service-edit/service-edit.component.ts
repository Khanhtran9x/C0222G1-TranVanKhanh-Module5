import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service/service.service';
import {Form, FormControl, FormGroup} from '@angular/forms';
import {Service} from '../../interface/Service';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceType} from '../../interface/service-type';
import {RentType} from '../../interface/rent-type';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
  id: number;
  serviceObj: Service;
  serviceTypes: ServiceType[];
  serviceTypeId: number;
  rentTypes: RentType[];
  rentTypeId: number;
  serviceForm = new FormGroup({
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
    descriptionOtherConvenience: new FormControl(),
    imgUrl: new FormControl()
  });

  constructor(private service: ServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllServiceTypes();
    this.getAllRentTypes();
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.getService(this.id);
  }

  getService(id) {
    this.service.findById(id).subscribe(service => {
      this.serviceTypeId = service.serviceType.serviceTypeId;
      this.rentTypeId = service.rentType.rentTypeId;
      this.serviceForm.patchValue(service);
      this.serviceForm.value.serviceType = this.serviceTypeId;
      this.serviceForm.value.rentType = this.rentTypeId;
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

  updateService() {
    this.serviceObj = this.serviceForm.value;
    if (isNaN(this.serviceForm.value.serviceType)) {
      this.serviceObj.serviceType = {
        serviceTypeId: this.serviceTypeId
      };
    } else {
      this.serviceObj.serviceType = {
        serviceTypeId: Number(this.serviceForm.value.serviceType)
      };
    }
    if (isNaN(this.serviceForm.value.rentType)) {
      this.serviceObj.rentType = {
        rentTypeId: Number(this.rentTypeId)
      };
    } else {
      this.serviceObj.rentType = {
        rentTypeId: Number(this.serviceForm.value.rentType)
      };
    }
    this.serviceObj.serviceId = this.id;
    console.log(this.serviceObj);
    this.service.updateService(this.serviceObj)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    this.router.navigateByUrl('/services');
  }
}
