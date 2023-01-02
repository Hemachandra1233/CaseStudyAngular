import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { User } from 'src/app/user';
import { LoginUserService } from '../login-registration-user.service';
import { PasswordStrengthValidator } from 'src/app/password-strength-validator';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild(FormGroupDirective) Hform:any;

  constructor(private _regservice: LoginUserService,
    private toastr: ToastrService) { }

  enableLogin: any;
  user:User = new User();

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, PasswordStrengthValidator]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  });

  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }
  get PhoneNo() {
    return this.form.get('phone');
  }
  get Name() {
    return this.form.get('name');
  }

  errorMessage: any;
  a:any;
  registerUser() {
    this.user.email = this.Email?.value
    this.user.password = this.Password?.value
    this.user.phoneNo = this.PhoneNo?.value
    this.user.name = this.Name?.value
    return this._regservice.registerUser(this.user).subscribe(data =>{
      this.toastr.success("User Registered Successfully");
      this.enableLogin = true;
      this.Hform.resetForm();
    },(error) => {
      this.toastr.error(error.message, 'Message', {
        timeOut: 2000,
      });
    }
    );
  }
}
