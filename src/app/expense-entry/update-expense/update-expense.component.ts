import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { Transaction } from 'src/app/transaction';
import { ExpenseEntryService } from '../expense-entry.service';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent implements OnInit {

  transacId!:any;
  Categories!:any;
  SpendTypes!:any;
  TransactionTypes!:any;
  transaction:Transaction = new Transaction();
  transaction2!:any;
  transaction3!:any;
  constructor(private router: ActivatedRoute,
              private service2: SharedserviceService,
              private _service : ExpenseEntryService) { }

  form: FormGroup = new FormGroup({
    transactionDate: new FormControl(''),
    description : new FormControl(''),
    amount: new FormControl(''),
    categoryId: new FormControl(''),
    spendTypeId: new FormControl(''),
    transactionTypeId: new FormControl(''),
    createdBy: new FormControl(''), 
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
  ngOnInit(): void {
    this.transacId = this.router.snapshot.params['id'];
    console.log(this.service2.globalHomeId);
    this._service.getExpenseById(this.transacId).subscribe((data: any) => {
      this.transaction3 = data;
      console.log(this.transaction3);
      this.form = new FormGroup( {
        transactionDate: new FormControl(data['transactionDate']),
        description: new FormControl(data['description']),
        amount: new FormControl(data['amount']),
        createdBy: new FormControl(data['createdBy']),
        categoryId: new FormControl(data['category']['description']),
        spendTypeId: new FormControl('hello'),
        transactionTypeId: new FormControl('')
      })
    })
  }

  getCategories(){
    this._service.getAllCategories().subscribe(data => {
      this.Categories = data;
    })
  }
  getSpendTypes(){
    this._service.getAllSpendTypes().subscribe(data => {
      this.SpendTypes = data;
    })
  }
  getTransactionTypes() {
    this._service.getAllTransactionTypes().subscribe(data => {
      this.TransactionTypes = data;
    })
  }
  updateExpense() {
    this.transaction.transactionDate = this.Date?.value
    this.transaction.description = this.Description?.value
    this.transaction.amount = this.Amount?.value
    this.transaction.categoryId = this.CatId?.value
    this.transaction.createdBy = this.CreatedBy?.value
    this.transaction.spendTypeId = this.SpendId?.value
    this.transaction.transactionTypeId= this.TransactionTypeId?.value

    console.log("Entered Transaction",this.transaction);
    this._service.updateExpense(this.transacId, this.transaction).subscribe(data => {
      console.log(data);
      this.transaction2 = data;
      alert("updated successfully");
    });

  }
}
