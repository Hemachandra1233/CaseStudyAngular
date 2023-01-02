import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/authfiles/user-auth.service';
import { HomeServiceService } from 'src/app/dashboard/home-service.service';
import { RegistrationService } from 'src/app/registration.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { User } from 'src/app/user';
import { LoginUserService } from '../login-registration-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // user User = new User();
  email!: string;
  user:User = new User();
  x!:any;
  a!:any;
  userData = this.service2.shareduser;
  constructor(private _service: LoginUserService,
    private route: Router,
    private service2: SharedserviceService,
    private homeservice: HomeServiceService,
    private userAuthService: UserAuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.email);
    console.log(this.service2.globalToken)
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
  });

  get LoginEmail() {
    return this.form.get('email');
  }
  get LoginPassword() {
    return this.form.get('password');
  }

  // loginUser(){
  //   this._service.LoginUserFromRemote(this.user).subscribe(
  //     data => console.log("response recieved"),
  //     error => console.log("error occured")
  //   );
  // }
  loginUser(){
    this.user.email = this.LoginEmail?.value;
    this.user.password = this.LoginPassword?.value
    this._service.loginUser(this.user).subscribe(data =>{
      this.a = true;
      this.userData = data;
      this.service2.setGlobalUserId(this.userData.user.id);
      this.service2.setUserId(this.userData.user.id);
      console.log("Session user id is",typeof(parseInt(this.service2.getUserId())));
      
      // console.log(this.userData.user.id);
      this.service2.setGlobalUserName(this.userData.user.name);
      console.log(this.userData.token);

      this.service2.globalToken = this.userData.token;
      this.userAuthService.setToken(this.userData.token);
      // console.log("User Id ", this.service2.globalUserId);
      this.navToDashboard(parseInt(this.service2.getUserId()));
      
    },(error)=> this.toastr.error('Please Enter Valid Credentials', 'Message', {
      timeOut: 2000,
    })); 
    this.email = this.user.email;
    
  }

  navToDashboard(id: number) {
    // this._service.getAllHomesByUserId(this.service2.shareduser).subscribe(data => {
    //   if (data == null){
    //     this.route.navigate(['dashboard/createhome']);
    //     console.log(data)
        
    //   }
    //   else{
    //     this.route.navigate(['dashboard/gethomes']);
    //     console.log(data)
    //     this.service2.sharedhome = data;
    //   }
    // })

    this.homeservice.getAllHomesByUserId().subscribe( data =>{
      this.x = data;
      if (this.x[0]==null){
        this.route.navigate(['dashboard/createhome',this.service2.getGlobalUserId()]);
        this.service2.showCreateHomeMessage = true;
      }
      else{
        this.route.navigate(['/gethomes']);
      }
    }
    )
  }
}
