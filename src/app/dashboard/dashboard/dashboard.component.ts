import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Home } from 'src/app/home';
import { AssignUserRoleComponent } from 'src/app/home-entry/assign-user-role/assign-user-role.component';
import { ImpersonationService } from 'src/app/impersonation/impersonation.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id!:number;
  link = "/dashboard/get-expenses"
  name = "Table"
  home:Home = new Home();
  a : any;
  views: any;
  constructor(private router: ActivatedRoute,
              private _service: HomeServiceService,
              private route: Router,
              private service2: SharedserviceService,
              private dialogRef: MatDialog,
              private service3: ImpersonationService
               ) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id']
    console.log(this.service2.globalToken);
    this.a = this.service2.showMyHome;
    if (this.service2.getGlobalRoleId() == 1 || parseInt(this.service2.getGlobalRoleId()) == 2) {
      this.views = true;
    }
    else {
      this.views = false
    }
  }

  createHome(){
    // this.id = this.router.snapshot.params['id']
    // this._service.createhomeByUserId(this.id,this.home).subscribe(data => {
    //   alert("submitted")
    // },error => alert("sorry"));
    this.route.navigate(["/dashboard/createhome/"])
  }

  changeLink(){
    if(this.link == "/dashboard/view-expenses" && this.name == "Graph"){
      this.link = "/dashboard/get-expenses";
      this.name = "Table"
    }
    else{
      this.link = "/dashboard/view-expenses";
      this.name = "Graph";
    }
  }

  showNoHomes: any;
  assignedToHomes:any;
  disableUpdateRole: any;
  getAssignedToHomes() {
    if (this.service2.getGlobalRoleId() == 1){
      this.disableUpdateRole = false;
    }
    else{
      this.disableUpdateRole = true;
    }
    this.assignedToHomes = []
    this._service.getHomeAssignedToDetails(this.service2.getGlobalHomeId()).subscribe( data => {
      console.log("Home Assigned To Data",data);
      this.assignedToHomes = data;
      if (this.assignedToHomes.length == 0) {
        this.showNoHomes = true
      }
    })
  }

  updateRole(id : number, email: string, role: string, roleId: number, userId: number){
    this.service2.globalRoleChangeEmail = email;
    this.service2.globalRoleChangeId = id;
    this.service2.globalUpdateRole = role;
    this.service2.globalRoleChangeUserId = userId;
    console.log("Role ID", roleId)
    this.dialogRef.open(AssignUserRoleComponent);
  }

  assignedHomes: any;
  showNoHomes2: any
  getAssignedHomes() {
    this.service3.getAllHomesByAssigneeId().subscribe(data => {
      console.log(data);
      this.assignedHomes = data;
      if (this.assignedHomes.length == 0){
        this.showNoHomes2 = true;
      }
    })
  }
  navToImpersonation(id: number) {
    this.route.navigate(['/imporsonation',id]);
    console.log(id); 
  }

  AssignedData: any;
  getExpensesByHomeId(id: any, description: any) {
    window.location.reload();
    this.service2.setGlobalHomeId(id);
    this.service2.setViewHome(description);
    console.log("Global Home Id",this.service2.getGlobalHomeId())
    this._service.checkAssignedByHomeIdAndAssigneeId(id,this.service2.getGlobalUserId()).subscribe(data => {
      this.AssignedData = data
      console.log("Assigned Data",this.AssignedData)
      if(this.AssignedData == null){
        this.service2.setGlobalRoleId("1");
        this.route.navigate(['dashboard/view-expenses']);
      }
      else{
        this.service2.setGlobalRoleId(this.AssignedData.roleId);
        this.route.navigate(['dashboard/view-expenses']);
      }
    })
  }

  navToExpenseEntry() {
    this.service2.setShowExpenseHeading("false")
    let list = ["common"]
    this._service.getListOfExpenseTo().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].name);
        console.log("Expense to dataa", data);
        this.service2.globalExpenseTo.push(data[i]);
        list.push(data[i].name)
      }
      this.service2.setGlobalExpenseTo(JSON.stringify(list))
    })
    this.route.navigate(['/expenses']);
  }
}
