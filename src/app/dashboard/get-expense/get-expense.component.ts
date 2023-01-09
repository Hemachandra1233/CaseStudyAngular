import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpenseEntryService } from 'src/app/expense-entry/expense-entry.service';
import { FileComponent } from 'src/app/expense-entry/file/file.component';
import { AssignUserRoleComponent } from 'src/app/home-entry/assign-user-role/assign-user-role.component';
import { HomeServiceService } from 'src/app/home/home-service.service';
import { ImpersonationService } from 'src/app/impersonation/impersonation.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { PopupComponent } from '../../popup/popup.component';


export interface UserData {
  transactionDate: Date;
  category: string[];
  expenseTo: string;
  amount: number;
  categoryId: number;
  spendTypeId: number;
  transactionTypeId: number;
}
@Component({
  selector: 'app-get-expense',
  templateUrl: './get-expense.component.html',
  styleUrls: ['./get-expense.component.css']
})
export class GetExpenseComponent implements OnInit {

  Roles = this.service2.globalRoles;
  startDate: any;
  endDate: any;

  form: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });
  get StartDate() {
    return this.form.get('startDate');
  }
  get EndDate() {
    return this.form.get('endDate');
  }

  submit() {
    this.startDate = formatDate(this.StartDate?.value, 'yyyy-MM-dd', 'en_US')
    this.endDate = formatDate(this.EndDate?.value, 'yyyy-MM-dd', 'en_US')
    this.service2.setGlobalEndDate(this.endDate);
    this.service2.setGlobalStartDate(this.startDate);
    console.log("After submitting Global Date is", this.service2.getglobalendDate())
    // this.x = true;
    console.log("Global Role is", this.service2.globalRoleId)
    if (this.service2.getGlobalRoleId() == 1 || parseInt(this.service2.getGlobalRoleId()) == 2) {
      this.views = true;
    }
    else {
      this.views = false
    }
    // this.service2.globalHomeId = this.route.snapshot.params['id'];
    //Previously used
    this.service.getExpensesByHomeId(this.service2.getGlobalHomeId()).subscribe(data => {
      console.log("Got between Datesssssss csunnn", data);
      // getExpensesByHomeId(this.service2.getGlobalHomeId())
    })
    // changed between dates
    if (this.startDate > this.endDate) {
      this.toastr.warning('Start Date Should Be Less Than End Date', 'Message', {
        timeOut: 2000,
      });
    }
    else {
      this.service.getDataBetweenDates(this.service2.getGlobalHomeId(), this.startDate, this.endDate).subscribe((data: any) => {
        this.showAmount = 0
        this.service2.globalExpense = []
        this.expense2 = []
        this.createdTime = []
        this.updatedTime = []
        this.expense = new MatTableDataSource();
        for (let i = 0; i < data.length; i++) {
          this.expense.data.push(data[i]);
          this.expense2.push(data[i])
          this.service2.globalExpense.push(data[i])
          this.createdOnDict[data[i].transactionId] = formatDate(data[i].createdOn, 'yyyy-MM-dd', 'en_US')
          this.updatedOnDict[data[i].transactionId] = formatDate(data[i].updatedOn, 'yyyy-MM-dd', 'en_US')
          this.createdTime.push(data[i].createdOnTime.trim());
          this.updatedTime.push(data[i].updatedOnTime.trim());         
        }
        console.log("expense 2", this.expense2)
        console.log("push data ==> ", this.service2.globalExpense.length);
        this.service2.setGlobalExpense(JSON.stringify(this.service2.globalExpense));
        // console.log("Global Expense" , this.service2.getGlobalExpense());

        // this.expense2 = data;
        // this.service2.globalExpense = data;
        this.expense.paginator = this.paginator;
        this.expense.sort = this.matSort;
        this.expense.filterPredicate = this.filterByCategory();
        this.expense2.forEach((element: any) => {
          if (element.spendType.type == "Expense") {
            this.showAmount = this.showAmount + element.amount;
          }
        });
      })
    }
  }
  id!: number;
  showNoHomes = false
  a = false;
  x = false;
  b = true;
  a1: any
  views!: boolean;
  viewAssign!: boolean;
  amount1: any;
  expense!: MatTableDataSource<any>;
  expense2 = new Array();
  chart: any;
  Categories: any;
  // 'Created Time','Updated Time',
  displayedColumns: string[] = ['transactionDate', 'amount', 'Category', 'description', 'spendType', 'Expense To', 'Created By', 'Created On', 'Updated On', 'Actions'];
  assignedHomes!: any;
  CreatedOn: any;
  updatedOn: any;
  createdTime: any;
  updatedTime: any;
  createdOnDict: any = {};
  updatedOnDict: any = {};


  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  constructor(private service: HomeServiceService,
    private route: ActivatedRoute,
    private service2: SharedserviceService,
    private dialogRef: MatDialog,
    private router: Router,
    private service3: ImpersonationService,
    private _service: ExpenseEntryService,
    private toastr: ToastrService) { }

  showAmount: any;
  ngOnInit(): void {

    //for showing my homes button in dashboard 
    this.expense2 = []
    console.log("Global Role Id", typeof (parseInt(this.service2.getGlobalRoleId())))
    if (parseInt(this.service2.getGlobalRoleId()) == 1 || parseInt(this.service2.getGlobalRoleId()) == 2) {
      this.views = true;
    }
    else {
      this.views = false
    }
    if (parseInt(this.service2.getGlobalRoleId()) == 1) {
      this.viewAssign = true;
    }
    else {
      this.viewAssign = false
    }
    var date = new Date();
    this.startDate = formatDate(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd', 'en_US')
    this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
    if ((this.service2.getGlobalStartDate() && this.service2.getglobalendDate()) == null) {
      this.form.setValue({
        startDate: this.startDate,
        endDate: this.endDate
      })
    }
    else {
      this.form.setValue({
        startDate: this.service2.getGlobalStartDate(),
        endDate: this.service2.getglobalendDate()
      })
    }
    console.log("Datesssssssssssss", this.service2.getGlobalStartDate());
    console.log("end datesssssssssss", this.endDate);
    this.CreatedOn = []
    this.createdTime = []
    this.updatedTime = []
    //changed between dates
    this.service.getDataBetweenDates(this.service2.getGlobalHomeId(), this.startDate, this.endDate).subscribe((data: any) => {
      this.service2.globalExpense = []
      this.expense = new MatTableDataSource();
      for (let i = 0; i < data.length; i++) {
        let date2 = formatDate(data[i].transactionDate, 'yyyy-MM-dd', 'en_US');
        if (this.startDate <= date2 && this.endDate >= date2) {
          this.expense2.push(data[i]);
          this.expense.data.push(data[i]);
          this.service2.globalExpense.push(data[i])
          console.log(data[i].transactionId)
          this.createdOnDict[data[i].transactionId] = formatDate(data[i].createdOn, 'yyyy-MM-dd', 'en_US')
          this.updatedOnDict[data[i].transactionId] = formatDate(data[i].updatedOn, 'yyyy-MM-dd', 'en_US')
          this.CreatedOn.push(formatDate(data[i].createdOn, 'yyyy-MM-dd', 'en_US'))
          this.createdTime.push(data[i].createdOnTime.trim());
          this.updatedTime.push(data[i].updatedOnTime.trim())
          // this.updatedTime.push(data[i].updatedOnTime)
          // this.createdTime.push(data[i].createdOn.slice(11,19));
        }
      }
      this.service2.setGlobalExpense(JSON.stringify(this.service2.globalExpense));
      this.expense.paginator = this.paginator;
      this.expense.sort = this.matSort;
      this.expense.filterPredicate = this.filterByCategory();
      this.showAmount = 0;
      console.log("Check ---", this.expense2)
      console.log("Ckeck Dates --", this.CreatedOn);
      console.log("Ckeck Created on Times --", this.createdTime);
      console.log("Ckeck Updated on Times --", this.updatedTime);
      console.log("Ckeck Times Dictionary --", this.createdOnDict);
      // this.createdOn = formatDate(new Date, 'yyyy-MM-dd', 'en_US')
      this.expense2.forEach((element: any) => {
        if (element.spendType.type == "Expense") {
          this.showAmount = this.showAmount + element.amount;
        }
      });
    })
    //Graphs To Do
    if (this.service2.getglobalendDate() && this.service2.getGlobalStartDate() !== null) {
      this.submit();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expense.filter = filterValue.trim().toUpperCase();
  }

  filterByCategory() {
    let filterFunction =
      (data: any, filter: string): boolean => {
        if (filter) {
          const categories = data.category.description.toUpperCase();
          if (categories.indexOf(filter) != -1) {
            return true;
          }
          return false;
        } else {
          return true;
        }
      };
    return filterFunction;
  }
  getAmount() {
    console.log(this.expense);
    this.amount1 = 0;
    this.a = true
    this.expense2.forEach((element: any) => {
      if (element.spendType.type == "Expense") {
        this.amount1 = this.amount1 + element.amount;
      }
    });
    this.service2.globalAmount = this.amount1;
    this.dialogRef.open(PopupComponent);
  }
  navToExpenseEntry() {
    this.service2.setShowExpenseHeading("false")
    let list = ["common"]
    this.service.getListOfExpenseTo().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].name);

        this.service2.globalExpenseTo.push(data[i]);
        list.push(data[i].name)
      }
      this.service2.setGlobalExpenseTo(JSON.stringify(list))
    })
    this.router.navigate(['/expenses']);
  }

  openChart() {
    if (this.b == true) {
      this.b = false;
    }
    else {
      this.b = true;
    }
    console.log(this.expense)
  }

  navToUpdateExpense(id: number) {
    this.service2.setShowExpenseHeading("true");
    this.router.navigate(['/dashboard/update-expense', id]);
  }

  assignHome() {
    this.service2.globalRoleChangeEmail = undefined;
    this.service2.globalUpdateRole = undefined;
    this.dialogRef.open(AssignUserRoleComponent);
  }

  // onDelete(id: number, msg: string){

  //   this.dialogRef.open(PopupComponent,{
  //     width: '390px',
  //     panelClass: 'confirm-dialog-container',
  //     disableClose: true,
  //     position: { top: "10px" },
  //     data :{
  //       message : 'Are you sure to delete ' + msg + ' ?'
  //     }
  //   }).afterClosed().subscribe(res => {
  //     console.log(res);
  //     if(res) {
  //       this.service.deleteHomebyHomeId(id).subscribe((data: any) => {
  //         console.log(data);
  //         this.ngOnInit();
  //         this.toastr.success('Deleted Successfully', 'Message',{
  //           timeOut: 2000
  //         })
  //       })
  //     }
  //   });
  // }

  deleteExpense(id: number, msg: string, msg2: string) {
    this.dialogRef.open(PopupComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data :{
        message : 'Are you sure to delete ' + msg +' ' + msg2 +' ?'
      }
    }).afterClosed().subscribe(res => {
      console.log(res);
      if(res) {
        console.log("deleting", id)
        this.service.deleteExpenseByTransactionId(id).subscribe(data => {
          console.log(data);
          this.toastr.success('Deleted Successfully', 'Message', {
            timeOut: 2000
          })
          if (this.service2.getglobalendDate() && this.service2.getGlobalStartDate() !== null) {
            this.submit();
          }
          else {
            this.ngOnInit();
          }
        })
      }
    });
  
  }
  getAssignedHomes() {
    this.service3.getAllHomesByAssigneeId().subscribe(data => {
      console.log(data);
      this.assignedHomes = data;
      if (this.assignedHomes.length == 0) {
        this.showNoHomes = true;
      }
    })
  }

  navToImpersonation(id: number) {
    this.router.navigate(['/imporsonation', id]);
    console.log(id);
  }

  getCategories() {
    this._service.getAllCategories().subscribe(data => {
      this.Categories = data;
    })
  }

  // downloadDocuments1(id: any) {
  //   console.log("downloaded successfully -->", id)
  //   this.service2.setFileTransactionId(id);
  //   this.service2.setFile("false");
  //   this.dialogRef.open(FileComponent, {
  //     width: 50%,
  //   });
  // }

  downloadDocuments(id: any){
    console.log("downloaded successfully -->", id)
    this.service2.setFileTransactionId(id);
    this.service2.setFile("false");

    this.dialogRef.open(FileComponent,{
      width: '60%'
    });
  }

  // this.dialogRef.open(PopupComponent,{
  //   width: '390px',
  //   panelClass: 'confirm-dialog-container',
  //   disableClose: true,
  //   position: { top: "10px" },
  //   da
  navtoFileDownload() {

  }
}
