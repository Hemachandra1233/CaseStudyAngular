import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/authfiles/user-auth.service';
import { AssignUserRoleComponent } from 'src/app/home-entry/assign-user-role/assign-user-role.component';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { CreateHomeComponent } from '../create-home/create-home.component';
import { HomeServiceService } from '../home-service.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-get-homes',
  templateUrl: './get-homes.component.html',
  styleUrls: ['./get-homes.component.css']
})
export class GetHomesComponent implements OnInit {

  color = "accent"
  AssignedData!: any;
  constructor(private service2: SharedserviceService,
              private router: Router,
              private route: ActivatedRoute,
              private service : HomeServiceService,
              private dialogRef: MatDialog,
              private toastr: ToastrService,
              private confirmService: NgConfirmService) { }
  x : any
  homes!: any;
  check: any;
  userId: any;
  ngOnInit(): void {
    this.service.getAllHomesByUserId().subscribe( data =>{
      this.x = data;
      console.log("Homes Data",data);
    })
    this.userId = parseInt(this.service2.getUserId());
  }

  // getExpensesByHomeId(id: number, description: any) {
  //   this.service.checkAssignedByHomeIdAndAssigneeId(id,this.userId).subscribe(data => {
  //     this.AssignedData = data
  //     console.log("Assigned Data",this.AssignedData)
  //     if(this.AssignedData.length == 0){
  //       this.service2.setGlobalRoleId("1");
  //       this.router.navigate(['dashboard/get-expense',id]);
  //     }
  //     else{
  //       this.service2.setGlobalRoleId(this.AssignedData[0].roleId);
  //       this.router.navigate(['dashboard/get-expense',id]);
  //     }
  //   })
  // }

  getExpensesByHomeId(id: any, description: any) {
    this.service2.setGlobalHomeId(id);
    this.service2.setViewHome(description);
    console.log("Global Home Id",this.service2.getGlobalHomeId())
    this.service.checkAssignedByHomeIdAndAssigneeId(id,this.service2.getGlobalUserId()).subscribe(data => {
      this.AssignedData = data
      console.log("Assigned Data",this.AssignedData)
      if(this.AssignedData == null){
        this.service2.setGlobalRoleId("1");
        this.router.navigate(['dashboard/view-expenses']);
      }
      else{
        this.service2.setGlobalRoleId(this.AssignedData.roleId);
        this.router.navigate(['dashboard/view-expenses']);
      }
    })
  }

  updateHome(id: string,description: string){
    console.log("dddddddddddddddddddd",description);
    this.service2.setUpdateDescription(description);
    this.service2.setGlobalHomeId(id);
    this.service2.updateHomeId = id;
    this.dialogRef.open(CreateHomeComponent);
    // this.router.navigate(['/dashboard/updatehome',id]);
  }

  openCreateHome() {
    // this.dialogRef.open(CreateHomeComponent);
    // this.ngOnInit();
    this.router.navigate(['/dashboard/createhome'])
  }
  onDelete(id: number, msg: string){

    this.dialogRef.open(PopupComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data :{
        message : 'Are you sure to delete ' + msg + ' ?'
      }
    }).afterClosed().subscribe(res => {
      console.log(res);
      if(res) {
        this.service.deleteHomebyHomeId(id).subscribe((data: any) => {
          console.log(data);
          this.ngOnInit();
          this.toastr.success('Deleted Successfully', 'Message',{
            timeOut: 2000
          })
        })
      }
    });
  }

  ondelete(id : number, home: any) {
    
    this.confirmService.showConfirm("Are you sure",
     () => {
      this.service.deleteHomebyHomeId(id).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
        this.toastr.success('Deleted Successfully', 'Message',{
          timeOut: 2000
        })
      })
    },
    () => {
      console.log("Selected No")
    })
  }
  assignHome(id : any) {
    this.service2.setGlobalHomeId(id);
    this.service2.globalRoleChangeEmail = undefined;
    this.service2.globalUpdateRole = undefined;
    this.dialogRef.open(AssignUserRoleComponent);
    console.log("Home Id" , this.service2.getGlobalHomeId())
  }

  assignedToHomes: any;
  disableUpdateRole: any;
  showNoHomes : any;
  getAssignedToHomes(id : any) {

    this.showNoHomes = false;
    this.service.checkAssignedByHomeIdAndAssigneeId(id,this.service2.getGlobalUserId()).subscribe(data => {
      this.AssignedData = data
      if(this.AssignedData == null){
        this.service2.setGlobalRoleId("1");
      }
      else{
        this.service2.setGlobalRoleId(this.AssignedData.roleId);
      }
      if (this.service2.getGlobalRoleId() == 1){
        this.disableUpdateRole = false;
      }
      else{
        this.disableUpdateRole = true;
      }
      this.assignedToHomes = []
      this.service.getHomeAssignedToDetails(id).subscribe( data => {
        console.log("Home Assigned To Data",data);
        this.assignedToHomes = data;
        if (this.assignedToHomes.length == 0) {
          this.showNoHomes = true
        }
      })
    })
  }
  updateRole(id : any, email: string, role: string, roleId: number, userId: number){
    this.service2.globalRoleChangeEmail = email;
    this.service2.globalRoleChangeId = id;
    this.service2.globalUpdateRole = role;
    this.service2.globalRoleChangeUserId = userId;
    this.service2.setGlobalHomeId(email); //here email is homeId
    console.log("Role ID", roleId)
    this.dialogRef.open(AssignUserRoleComponent);
  }
}
