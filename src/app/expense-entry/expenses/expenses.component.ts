import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { PopupComponent } from 'src/app/dashboard/popup/popup.component';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { Transaction } from 'src/app/transaction';
import { ExpenseEntryService } from '../expense-entry.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { formatDate, Time } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FileComponent } from '../file/file.component';
import { ToastrService } from 'ngx-toastr';
import { HomeServiceService } from 'src/app/dashboard/home-service.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

 
  constructor(private _service: ExpenseEntryService,
    private service2: SharedserviceService,
    private service: HomeServiceService,
    private dialogRef: MatDialog,
    private router: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService) { }

  categ($event: any) {
    console.log($event);
  }

  expensesTo: any;
  public userFile: any = File;
  Categories: any;
  SpendTypes: any;
  TransactionTypes: any;
  transaction: Transaction = new Transaction();
  transacId: any;
  transaction3: any;

  loadCategory: any;
  loadSpendType: any;
  loadTransactiontype: any;
  showDocuments: any;
  form: FormGroup = new FormGroup({
    transactionDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    spendTypeId: new FormControl('', Validators.required),
    transactionTypeId: new FormControl('', Validators.required),
    createdBy: new FormControl('', Validators.required),
    expenseTo: new FormControl('', Validators.required)
  });

  get Description() {
    return this.form.get('description');
  }
  get CreatedBy() {
    return this.form.get('createdBy');
  }
  get Date() {
    return this.form.get('transactionDate');
  }
  get Time() {
    return this.form.get('transactionTime');
  }
  get Amount() {
    return this.form.get('amount');
  }
  get CatId() {
    return this.form.get('categoryId');
  }
  get SpendId() {
    return this.form.get('spendTypeId');
  }
  get TransactionTypeId() {
    return this.form.get('transactionTypeId');
  }
  get ExpenseTo() {
    return this.form.get('expenseTo')
  }

  showUpdateButton = false;
  expenseTo: any
  expenseToShow: any;
  @ViewChild(FormGroupDirective) myForm:any;
  ngOnInit(): void {


    console.log("created id",this.service2.getShowCategoryAfterCreated());
    let id = JSON.parse(this.service2.getShowCategoryAfterCreated());
    this.showDocuments = false;
    console.log("cat idddddd",this.service2.getShowCategoryAfterCreated())

    this.expenseTo = JSON.parse(this.service2.getGlobalExpenseTo());
    this.transacId = this.router.snapshot.params['id'];
    console.log("transac Id >>>>>>", this.transacId);
    this.service2.setFileTransactionId(this.transacId);
    console.log(this.service2.globalHomeId);
    
    this._service.getAllSpendTypes().subscribe(data => {
      this.SpendTypes = data;
    })
    this._service.getAllTransactionTypes().subscribe(data => {
      this.TransactionTypes = data;
    })
    this._service.getAllCategories().subscribe(data => {
      this.service2.GlobalCategories = data
      this.Categories = data;
    })

    this.expensesTo = ["common"]
    this.service.getListOfExpenseTo().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].name);

        if (this.expensesTo.includes(data[i].name)){
          continue;
        }
        else{
          this.expensesTo.push(data[i].name)
        }
        // this.service2.globalExpenseTo.push(data[i]);
      }
    })

    // console.log("expenses tooooooooooo", this.expensesTo);
    
    if (this.transacId !== undefined) {
      this.showUpdateButton = true;
      this._service.getExpenseById(this.transacId).subscribe((data: any) => {
        this.transaction3 = data;
        console.log("consoled data",this.transaction3);

        //On Load Data
        this.loadCategory = this.transaction3.category.id;
        this.loadSpendType = this.transaction3.spendType.id;
        this.loadTransactiontype = this.transaction3.transactionType.id;
        this.expenseToShow = this.transaction3.expenseTo;

        this.form = new FormGroup({
          transactionDate: new FormControl(data['transactionDate'], [Validators.required]),
          description: new FormControl(data['description'], [Validators.required]),
          amount: new FormControl(data['amount'], [Validators.required]),
          createdBy: new FormControl(data['createdBy'], [Validators.required]),
          categoryId: new FormControl(this.loadCategory ,[Validators.required]),
          spendTypeId: new FormControl(this.loadSpendType, [Validators.required]),
          expenseTo: new FormControl(this.expenseToShow,[Validators.required]),
          transactionTypeId: new FormControl(this.loadTransactiontype, [Validators.required])
        })
      })
    }
    else {
      this.loadSpendType = 1;
      this.loadTransactiontype = 2;
      let expenseDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
      this.form = new FormGroup({
        transactionDate: new FormControl(expenseDate, [Validators.required]),
        description: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required]),
        createdBy: new FormControl('', [Validators.required]),
        categoryId: new FormControl(this.createdCatId,[Validators.required]),
        spendTypeId: new FormControl(this.loadSpendType, [Validators.required]),
        expenseTo: new FormControl(this.service2.getGlobalUserName(),[Validators.required]),
        transactionTypeId: new FormControl(this.loadTransactiontype, [Validators.required])
      })
    }
  }

  expenseEntry() {
    this.showDocuments = true
    // this.transaction.transactionTime = this.Time?.value
    // console.log("type of entered time is",  this.transaction.transactionTime);
    this.transaction.transactionDate = this.Date?.value
    this.transaction.description = this.Description?.value
    this.transaction.amount = this.Amount?.value
    this.transaction.expenseTo = this.ExpenseTo?.value
    this.transaction.categoryId = this.CatId?.value
    this.transaction.createdBy = this.service2.getGlobalUserName()
    this.transaction.spendTypeId = this.SpendId?.value
    this.transaction.transactionTypeId = this.TransactionTypeId?.value


    this._service.expenseEntry(this.transaction).subscribe((data : any) => {
      console.log("Entered Expense Data", data.transactionId);
      this.service2.setFileTransactionId(data.transactionId)
      console.log("service got data", this.service2.getFileTransactionId());
      this.toastr.success('Successfull','Message', {
        timeOut: 2000
      })
      this.myForm.resetForm();
      // this.form.markAsUntouched();
      // this.ngOnInit();

      // this.loadSpendType = 1;
      // this.loadTransactiontype = 2;
      // let expenseDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
      // this.form.setValue({
      //   transactionDate: expenseDate,
      //   description: '',
      //   amount: '',
      //   createdBy: '',
      //   categoryId: '',
      //   spendTypeId: this.loadSpendType,
      //   expenseTo: this.service2.getGlobalUserName(),
      //   transactionTypeId: this.loadTransactiontype
      // })
      // this.form.reset();

      // this.form = new FormGroup({
      //   transactionDate: new FormControl(expenseDate, [Validators.required]),
      //   description: new FormControl('', [Validators.required]),
      //   amount: new FormControl('', [Validators.required]),
      //   createdBy: new FormControl('', [Validators.required]),
      //   categoryId: new FormControl(this.createdCatId,[Validators.required]),
      //   spendTypeId: new FormControl(this.loadSpendType, [Validators.required]),
      //   expenseTo: new FormControl(this.service2.getGlobalUserName(),[Validators.required]),
      //   transactionTypeId: new FormControl(this.loadTransactiontype, [Validators.required])
      // })
    }),(error : any) => {
      this.toastr.error("Something Went Wrong", "Error", {
        timeOut: 2000
      })
    };
  }
  getCategories() {
    this._service.getAllCategories().subscribe(data => {
      this.service2.GlobalCategories = data
      this.Categories = data;
    })
  }
  // createCategory() {
  //   console.log("clicked", this.service2.globalUserId);
  //   const popup = this.dialogRef.open(CreateCategoryComponent);
  //   popup.afterClosed().subscribe(item => {
  //     console.log("Data from created", item);
  //   })
  //   this._service.getAllCategories().subscribe(data => {
  //     this.service2.GlobalCategories = data
  //     this.Categories = data;
  //   })
  // }
  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.userFile = file;
  }

  updateExpense() {
    // debugger;
    // this.showDocuments = true
    this.transaction.transactionDate = this.Date?.value
    this.transaction.description = this.Description?.value
    this.transaction.amount = this.Amount?.value
    this.transaction.categoryId = this.CatId?.value
    this.transaction.createdBy = this.CreatedBy?.value
    this.transaction.spendTypeId = this.SpendId?.value
    this.transaction.transactionTypeId= this.TransactionTypeId?.value
    this.transaction.expenseTo = this.ExpenseTo?.value

    console.log("Entered Transaction",this.transaction);
    this._service.updateExpense(this.transacId, this.transaction).subscribe(data => {
      console.log(data);
      this.toastr.success("Updated Successfully","Message",{
        timeOut: 2000
      });
    });

  }

  navtoFileUpload(){
    this.service2.setFile("true");
    this.dialogRef.open(FileComponent);
    // this.route.navigate(['/expenses/file']);
  }

  navtoFileDownload(){
    this.service2.setFile("false");
    this.dialogRef.open(FileComponent);
  }
  createdCatId: any;
  addCat() {
    console.log("Clicked")
    this.dialogRef.open(CreateCategoryComponent).afterClosed().subscribe(res => {
      console.log("created category id",res);
      this.createdCatId = res;
      // this.form.get("categoryId")!.setValue(res);
      // this.form.get('categoryId')?.setValue(res);
      // this.form.controls["categoryId"].setValue(res);
      this.ngOnInit();
    });
    this._service.getAllCategories().subscribe(data => {
      this.service2.GlobalCategories = data
      this.Categories = data;
    })
  }
}



