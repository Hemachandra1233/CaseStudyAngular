import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RoleAssignRequest } from 'src/app/role-assign-request';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { HomeEntryService } from '../home-entry.service';

@Component({
  selector: 'app-assign-user-role',
  templateUrl: './assign-user-role.component.html',
  styleUrls: ['./assign-user-role.component.css']
})
export class AssignUserRoleComponent implements OnInit {

  showUpdate = false;
  RoleIddisplay: any;
  Roles: any;
  roleReq: RoleAssignRequest = new RoleAssignRequest()
  Roles1: any;
  loadRole: any;
  loadEmail: any;
  data: any;

  constructor(private service2: SharedserviceService,
    private service: HomeEntryService,
    private dialogRef: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // console.log("checking", this.service2.updateRoleId)
    this.Roles1 =[]
    this.Roles = this.service2.globalRoles
    console.log("Universal Roles", this.Roles)
    console.log("id",this.service2.globalRoleChangeEmail);
    console.log("Role",this.service2.globalRoleChangeId)
    console.log("email",this.service2.globalUpdateRole);
    console.log("Assignee Id", this.service2.globalRoleChangeUserId);
    this.service.getAllRoles().subscribe( data => {
      this.Roles1 = data;
      this.Roles1.shift();
      console.log("Rolesss",this.Roles1)
    })
    // this.service.getRoleByUserId(this.service2.globalRoleChangeUserId).subscribe( data => {
    //   this.data = data;
    //   console.log("consoled data",this.data);
    //   this.loadRole = this.data.roleId;
    //   this.loadEmail = this.data.email;
    // })
    
    if (this.service2.globalUpdateRole !== undefined) {
      if(this.service2.globalRoleChangeId == "Member"){
        this.loadRole = 2;
      }
      else{
        this.loadRole = 3;
      }
      console.log("LoadRole",this.loadRole)
      this.showUpdate = true
      this.form = new FormGroup({
        email: new FormControl(this.service2.globalUpdateRole),
        roleId: new FormControl(this.loadRole, [Validators.required])
      })
    }
  }
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    roleId: new FormControl('', [Validators.required])
  });

  get Email() {
    return this.form.get('email');
  }
  get RoleId() {
    return this.form.get('roleId');
  }
  assignRole() {

    this.roleReq.email = this.Email?.value
    this.roleReq.roleId = this.RoleId?.value

    this.service.assignUserWithRole(this.roleReq).subscribe(data => {
      console.log(data);
      this.dialogRef.closeAll();
      this.toastr.success('Assigned Successfully','Message',{
        timeOut: 2000
      })
    },(error) => {
      this.toastr.warning("This user is already part of home " + this.service2.getViewHome())
    });
  }
  updateRole() {
    this.roleReq.email = this.Email?.value
    this.roleReq.roleId = this.RoleId?.value
    
    this.service.updateUserRole(this.roleReq).subscribe(data => {
      console.log(data);
      this.dialogRef.closeAll();
      this.toastr.success("Role Changed Successfully")
    })
  }

  deleteRole() {
    this.service.deleteAssignedUser(this.service2.globalRoleChangeUserId).subscribe( data => {
      console.log("Deleted Data", data);
      this.dialogRef.closeAll();
      this.toastr.success("Deleted Successfully", "Message", {
        timeOut: 2000
      })
    })
  }

}
