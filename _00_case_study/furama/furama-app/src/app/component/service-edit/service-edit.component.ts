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
  serviceTypes: ServiceType[];
  rentTypes: RentType[];
  serviceForm = new FormGroup({
    serviceId: new FormControl(),
    serviceCode: new FormControl(),
    serviceName: new FormControl(),
    serviceArea: new FormControl(),
    serviceCost: new FormControl(),
    serviceNumberOfFloors: new FormControl(),
    serviceMaxPeople: new FormControl(),
    servicePoolArea: new FormControl(),
    serviceStandardRoom: new FormControl(),
    serviceType: new FormGroup({
      serviceTypeId: new FormControl()
    }),
    rentType: new FormGroup({
      rentTypeId: new FormControl()
    }),
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
      this.serviceForm.patchValue(service);
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
    this.service.updateService(this.serviceForm.value)
      .subscribe(
        response => {
          console.log(response);
          console.log('ok');
        },
        error => {
          console.log(error);
        });
    this.router.navigateByUrl('/services');
  }
}
