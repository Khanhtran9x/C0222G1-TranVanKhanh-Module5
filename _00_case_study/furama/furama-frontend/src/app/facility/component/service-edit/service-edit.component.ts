import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service/service.service';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceType} from '../../interface/service-type';
import {RentType} from '../../interface/rent-type';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

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
    serviceCode: new FormControl('', [Validators.required, Validators.pattern('^(DV-)\\d{4}$')]),
    serviceName: new FormControl('', [Validators.required, Validators.pattern('[\\w\\s]+$')]),
    serviceArea: new FormControl('', [Validators.required, Validators.min(0)]),
    serviceCost: new FormControl('', [Validators.required, Validators.min(0)]),
    serviceNumberOfFloors: new FormControl('', [Validators.required, Validators.min(1)]),
    serviceMaxPeople: new FormControl('', [Validators.required, Validators.min(1)]),
    servicePoolArea: new FormControl('', [Validators.required, Validators.min(1)]),
    serviceStandardRoom: new FormControl('', Validators.required),
    serviceType: new FormGroup({
      serviceTypeId: new FormControl('', Validators.required)
    }),
    rentType: new FormGroup({
      rentTypeId: new FormControl('', Validators.required)
    }),
    descriptionOtherConvenience: new FormControl('', Validators.required),
    imgUrl: new FormControl('', Validators.required)
  });

  constructor(private service: ServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private title: Title) {
    this.title.setTitle('Furama | Facility | Edit');
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
          this.toastr.success('Edited successfully!', 'Facility');
        },
        error => {
          console.log(error);
        });
    this.router.navigateByUrl('/services');
  }
}
