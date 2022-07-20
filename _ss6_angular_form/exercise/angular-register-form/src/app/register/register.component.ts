import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../providers/CustomValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.minLength(6), Validators.required]),
        confirmPassword: new FormControl('', [Validators.required, passwordMatchValidator]),
        country: new FormControl('Viet Nam', Validators.required),
        age: new FormControl('', [Validators.min(18), Validators.required]),
        gender: new FormControl('true', Validators.required),
        phone: new FormControl('', [Validators.required, Validators.pattern('^\\+84\\d{9,10}$')])
      });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }
}
