import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ValidatorFn, Validators} from '@angular/forms';
import {CustomValidators} from '../providers/CustomValidators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      country: new FormControl('Viet Nam', Validators.required),
      age: new FormControl('', [Validators.min(18), Validators.required]),
      gender: new FormControl('true', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('^\\+84\\d{9,10}$')])
    }, [CustomValidators.MatchValidator('password', 'confirmPassword')]);
  }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }
}
