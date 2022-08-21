import {Component, OnInit} from '@angular/core';
import {ServiceType} from '../../interface/service-type';
import {RentType} from '../../interface/rent-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../../service/service.service';
import {validateAndRewriteCoreSymbol} from '@angular/compiler-cli/src/ngtsc/imports';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {
  serviceForm: FormGroup;
  serviceTypes: ServiceType[];
  rentTypes: RentType[];

  constructor(private service: ServiceService,
              private toastr: ToastrService,
              private title: Title) {
    this.title.setTitle('Furama | Facility | Create');
  }

  ngOnInit(): void {
    this.getAllServiceTypes();
    this.getAllRentTypes();

    this.serviceForm = new FormGroup({
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

  addNewService() {
    this.service.saveService(this.serviceForm.value)
      .subscribe(
        response => {
          console.log(response);
          console.log('ok');
          this.toastr.success('Created successfully!', 'Facility');
        },
        error => {
          console.log(error);
        });
    this.serviceForm.reset();
  }
}
