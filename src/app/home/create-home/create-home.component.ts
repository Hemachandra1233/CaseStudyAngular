import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { t } from 'chart.js/dist/chunks/helpers.core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { UserAuthService } from 'src/app/authfiles/user-auth.service';
import { Home } from 'src/app/home';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-create-home',
  templateUrl: './create-home.component.html',
  styleUrls: ['./create-home.component.css']
})
export class CreateHomeComponent implements OnInit {

  b: any;
  id!: number;
  home:Home = new Home();
  //for showing no homes createHome message
  data:any;
  @ViewChild(FormGroupDirective) myForm:any;
  constructor(private _service : HomeServiceService,
    private route : Router,
    private service2: SharedserviceService,
    private router: ActivatedRoute,
    public userAuthService: UserAuthService,
    private toastr: ToastrService,
    private dialogRef: MatDialog) {
      this.b = this.service2.shareduser;
     }

  form: FormGroup = new FormGroup({
    description: new FormControl('',[Validators.required]),
  });
 
  get Description() {
    return this.form.get('description');
  }
  
  showUpdate = false;
  updateId: any;
  showByUserId: any;
  ngOnInit(): void {
    this.data = this.service2.showCreateHomeMessage;
    // this.service2.updateHomeId = undefined
    console.log("Update home id",this.service2.updateHomeId)
    console.log(this.service2.getUpdateDescription())
    this.id = this.router.snapshot.params['id']
    // this.updateId = this.service2.updateHomeId
    console.log("Update idddddddddddddddddddddddd", this.id);
    this.updateId = this.id
    if (this.updateId !== undefined){
      this.showUpdate = true
      this.form = new FormGroup({
        description : new FormControl(this.service2.getUpdateDescription())
      })
    }
  }

  createHome(){
    this.id = this.router.snapshot.params['id']
    this._service.createhomeByUserId(this.home).subscribe(data => {
      alert("submitted")
    },(error) => {
      console.log(error);
    });
  }

  createHomeFromDashboard() {
    this.home.description = this.Description?.value;
    this.home.createdBy = this.service2.getGlobalUserName();

    this._service.createhomeByUserId(this.home).subscribe(data => {
      this.service2.showCreateHomeMessage = false
      this.toastr.success('Home Created Successfully', 'Message', {
        timeOut: 2000,
      });
      this.myForm.resetForm();
      
      // this.dialogRef.closeAll();
      // window.location.reload()
      
      // if (this.dialogRef.afterAllClosed) {
      //   window.location.reload()
      // }
      this.route.navigate(['/homes'])
    }, (error) => {
      this.toastr.error(error.message, 'Message', {
        timeOut: 3000,
      });
    });
    
    
  }

  updateHome(){
    this.home.description = this.Description?.value;
    this.home.createdBy = this.service2.getGlobalUserName();
    console.log(this.home.description);
    console.log(this.service2.getUpdateDescription())
    if (this.home.description == this.service2.getUpdateDescription()){
      this.toastr.warning('Please Change Home Name')
    }
    else{
      this.service2.setUpdateDescription(this.home.description);
      this._service.updateHome(this.home).subscribe(data => {
        this.toastr.success('Updated Successfully', 'Update Message', {
          timeOut: 2000,
        });
        console.log(data);
        this.service2.updateHomeId = undefined;
        // this.dialogRef.closeAll();
        this.route.navigate(['/homes'])
      })
    // window.location.reload();
    }
  }
}
