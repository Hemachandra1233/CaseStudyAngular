import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { AssignUserRoleComponent } from 'src/app/home-entry/assign-user-role/assign-user-role.component';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.css']
})
export class ViewExpensesComponent implements OnInit {

  constructor(private service2: SharedserviceService,
    private service: HomeServiceService,
    private dialogRef: MatDialog,
    private toastr: ToastrService) { }


  showBar = true;
  expenses: any;
  expenses2: any;
  startDate: any;
  endDate: any;
  totalAmount: any;
  //for graph
  amount = 0;
  labeldata: any;
  amountdata: any;
  labels: any;
  amounts: any;
  myChart: any;
  //for plotting expenses vs savings graph
  expenseLabelData = ['Expense', 'Savings'];
  expenseAmountData: any;
  totalAmountLegend: any;
  myChart1: any;
  //for plotting credit vs debit graph
  creditLabelData = ['Credit', 'Debit'];
  creditAmountData: any;
  myChart2: any;

  remainingAmount: any;//for showing remaining amount in credit an debit graph

  b: any;
  viewHome: any;
  views!: boolean;
  expenseTo: any;
  expenseToAmount: any;
  expenseTo1: any; //for removing duplicates
  expenseToAmount1: any;
  ngOnInit(): void {
    this.remainingAmount = 0;
    if (this.service2.getGlobalRoleId() == 1) {
      this.views = true;
    }
    else {
      this.views = false
    }

    this.totalAmountLegend = 0
    this.b = false
    this.service2.globalAmount = 0
    this.viewHome = this.service2.getViewHome();
    this.expenses = [];
    this.expenses2 = []
    let homeId = parseInt(this.service2.getGlobalHomeId());
    var date = new Date();
    this.startDate = formatDate(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd', 'en_US')
    this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    // console.log(">>>>>>>>>>>>>>>>>>111",this.service2.getChartStartDate())
    // console.log(">>>>>>>>>222",this.service2.getChartEndDate())
    if ((this.service2.getChartStartDate() && this.service2.getChartEndDate()) == null) {
      this.form.setValue({
        startDate: this.startDate,
        endDate: this.endDate
      })
      this.service.getExpensesByHomeId(homeId).subscribe((data: any) => {
        this.expenses2 = data;
        for (let i = 0; i < data.length; i++) {
          let date2 = formatDate(data[i].transactionDate, 'yyyy-MM-dd', 'en_US');
          if (this.startDate <= date2 && this.endDate >= date2) {
            this.expenses.push(data[i]);
          }
        }
        // console.log("between dates", this.expenses);
        // console.log("expense 2", this.expenses2);
        this.labeldata = []
        this.amountdata = []
        this.expenseAmountData = []
        this.creditAmountData = []
        this.expenseTo = []
        this.expenseToAmount = []
        let amount = 0
        let amount2 = 0
        let creditAmount1 = 0
        let creditAmount2 = 0
        let label = ''
        this.expenses.forEach((element: any) => {
          if (element.spendType.type == "Expense") {
            this.labeldata.push(element.category.description);
            this.amountdata.push(element.amount);
            this.expenseTo.push(element.expenseTo);
            this.expenseToAmount.push(element.amount);
            amount = amount + element.amount;
            this.service2.globalAmount = this.service2.globalAmount + element.amount
            this.totalAmount = this.totalAmount + element.amount
          }
          else {
            amount2 = amount2 + element.amount
          }
          if (element.transactionType.description.toLowerCase() == "credit") {
            creditAmount1 = creditAmount1 + element.amount
          }
          else {
            creditAmount2 = creditAmount2 + element.amount;
          }
          this.remainingAmount = creditAmount1 - creditAmount2;
        });

        // console.log("Expense To Data >>>>>>>>>>>>>", this.expenseTo);
        // console.log("Expense To amount data >>.", this.expenseToAmount);

        // console.log("label data", this.labeldata)
        // console.log("amount data", this.amountdata)
        this.expenseAmountData.push(amount);
        this.expenseAmountData.push(amount2);
        // console.log("aaaaaaaaaaaaaaaaaa", this.expenseAmountData);
        this.creditAmountData.push(creditAmount1);
        this.creditAmountData.push(creditAmount2);
        this.totalAmountLegend = creditAmount1 + creditAmount2;
        console.log("Remaining data", this.remainingAmount);
        // console.log("bbbbbbbbbbbbbbb", this.creditAmountData);

        this.labels = [];
        this.amounts = [];
        let x = new Set(this.labeldata);
        for (const element of x.values()) {
          let sum = 0;
          for (let j = 0; j < this.labeldata.length; j++) {
            if (element == this.labeldata[j]) {
              sum = sum + this.amountdata[j];
            }
          }
          this.labels.push(element);
          this.amounts.push(sum);
        }
        // console.log("labelsssssssssssssssssss", this.labels);
        // console.log("amountssssssssssss", this.amounts);
        this.expenseTo1 = [] // for duplicates
        this.expenseToAmount1 = [] //for duplicates
        let y = new Set(this.expenseTo);
        for (const element of y.values()) {
          let sum = 0;
          for (let j = 0; j < this.expenseTo.length; j++) {
            if (element == this.expenseTo[j]) {
              sum = sum + this.amountdata[j];
            }
          }
          this.expenseTo1.push(element);
          this.expenseToAmount1.push(sum);
        }

        // console.log("Filtered Expense To",this.expenseTo1);
        // console.log("Filtered Expense To amount", this.expenseToAmount1);

        if (this.showBar) {
          this.RenderExpensesChart(this.labels, this.amounts)  //expense chart
          this.RenderCreditDebitChart(this.creditLabelData, this.creditAmountData);  //credit vs debit chart
          this.RenderExpenseSavingsChart(this.expenseLabelData, this.expenseAmountData);  //expense vs debit chart
          this.RenderChartByPersons(this.expenseTo1, this.expenseToAmount1);
        }
        if (!this.showBar) {
          this.RenderExpensesPieChart(this.labels, this.amounts);
          this.RenderCreditDebitPieChart(this.creditLabelData, this.creditAmountData);
          this.RenderExpenseSavingsPieChart(this.expenseLabelData, this.expenseAmountData);
          this.RenderChartByPersonsPie(this.expenseTo1, this.expenseToAmount1);
        }
      })
    }
    else {
      this.form.setValue({
        startDate: this.service2.getChartStartDate(),
        endDate: this.service2.getChartEndDate()
      })
      this.submit1();
    }

    console.log(this.endDate)
    console.log("start date is", this.startDate);

    console.log("Global chart start date", this.service2.getChartStartDate());



    // if(this.service2.getChartStartDate() && this.service2.getChartEndDate() !== null){
    //   this.submit1();
    // }
  }

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

  submit1() {
    this.service2.globalAmount = 0;
    this.remainingAmount = 0;

    // this.myChart.destroy();
    // this.myChart1.destroy();
    // this.myChart2.destroy();
    if (this.myChart != null) {
      this.myChart.destroy()
    }
    if (this.myChart2 != null) {
      this.myChart2.destroy()
    }
    if (this.myChart1 != null) {
      this.myChart1.destroy()
    }
    if (this.myChart4 != null) {
      this.myChart4.destroy()
    }
    if (this.myChart7 != null) {
      this.myChart7.destroy()
    }
    if (this.myChart8 != null) {
      this.myChart8.destroy()
    }
    if (this.myChart9 != null) {
      this.myChart9.destroy()
    }
    if (this.myChart10 != null) {
      this.myChart10.destroy()
    }

    this.labeldata = []
    this.amountdata = []
    this.expenseAmountData = []
    this.creditAmountData = []

    this.expenses = []
    this.startDate = formatDate(this.StartDate?.value, 'yyyy-MM-dd', 'en_US')
    this.endDate = formatDate(this.EndDate?.value, 'yyyy-MM-dd', 'en_US')
    if (this.startDate > this.endDate) {
      this.toastr.warning('Start Date Should Be Less Than End Date', 'Message', {
        timeOut: 2000,
      });
    }
    else {
      this.service2.setChartStartDate(this.startDate);
      this.service2.setChartEndDate(this.endDate);
      this.service.getExpensesByHomeId(this.service2.getGlobalHomeId()).subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          let date2 = formatDate(data[i].transactionDate, 'yyyy-MM-dd', 'en_US');
          if (this.startDate <= date2 && this.endDate >= date2) {
            this.expenses.push(data[i]);
          }
        }
        console.log("between dates", this.expenses);
        let amount = 0;
        let amount2 = 0;
        let creditAmount1 = 0
        let creditAmount2 = 0
        this.expenseTo = []
        this.expenses.forEach((element: any) => {
          if (element.spendType.type == "Expense") {
            this.labeldata.push(element.category.description);
            this.amountdata.push(element.amount);
            this.expenseTo.push(element.expenseTo);
            amount = amount + element.amount;
            this.service2.globalAmount = this.service2.globalAmount + element.amount
            this.totalAmount = this.totalAmount + element.amount
          }
          else {
            amount2 = amount2 + element.amount

          }
          if (element.transactionType.description.toLowerCase() == "credit") {
            creditAmount1 = creditAmount1 + element.amount
          }
          else {
            creditAmount2 = creditAmount2 + element.amount;
          }
          this.remainingAmount = creditAmount1 - creditAmount2;
        });
        console.log("label data", this.labeldata)
        console.log("amount data", this.amountdata)
        this.expenseAmountData.push(amount);
        this.expenseAmountData.push(amount2);
        console.log("aaaaaaaaaaaaaaaaaa", this.expenseAmountData);
        this.creditAmountData.push(creditAmount1);
        this.creditAmountData.push(creditAmount2);
        this.totalAmountLegend = creditAmount1 + creditAmount2
        console.log("bbbbbbbbbbbbbbb", this.creditAmountData);

        this.labels = [];
        this.amounts = [];
        let x = new Set(this.labeldata);
        for (const element of x.values()) {
          let sum = 0;
          for (let j = 0; j < this.labeldata.length; j++) {
            if (element == this.labeldata[j]) {
              sum = sum + this.amountdata[j];
            }
          }
          this.labels.push(element);
          this.amounts.push(sum);
        }
        console.log("labelsssssssssssssssssss", this.labels);
        console.log("amountssssssssssss", this.amounts);
        this.expenseTo1 = [] // for duplicates
        this.expenseToAmount1 = [] //for duplicates
        let y = new Set(this.expenseTo);
        for (const element of y.values()) {
          let sum = 0;
          for (let j = 0; j < this.expenseTo.length; j++) {
            if (element == this.expenseTo[j]) {
              sum = sum + this.amountdata[j];
            }
          }
          this.expenseTo1.push(element);
          this.expenseToAmount1.push(sum);
        }

        if (this.showBar) {
          this.RenderExpensesChart(this.labels, this.amounts);
          this.RenderCreditDebitChart(this.creditLabelData, this.creditAmountData);  //credit vs debit chart
          this.RenderExpenseSavingsChart(this.expenseLabelData, this.expenseAmountData);  //expense vs debit chart
          this.RenderChartByPersons(this.expenseTo1, this.expenseToAmount1);
        }
        else {
          this.RenderExpensesPieChart(this.labels, this.amounts);
          this.RenderCreditDebitPieChart(this.creditLabelData, this.creditAmountData);
          this.RenderExpenseSavingsPieChart(this.expenseLabelData, this.expenseAmountData);
          this.RenderChartByPersonsPie(this.expenseTo1, this.expenseToAmount1);
        }
      })

    }
  }

  RenderExpensesChart(labeldata: any, amountdata: any) {
    this.myChart = new Chart("barchart", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: '#Total expense amount is ' + this.service2.globalAmount,
          data: amountdata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }

    });

  }


  RenderCreditDebitChart(labeldata: any, amountdata: any) {
    this.myChart2 = new Chart("barchart1", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: '# Total amount ' + this.totalAmountLegend + ' :Remaining Amount  ' + this.remainingAmount,
          data: amountdata,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  RenderExpenseSavingsChart(labeldata: any, amountdata: any) {
    this.myChart1 = new Chart("barchart2", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: '# Total amount ' + this.totalAmountLegend,
          data: amountdata,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  myChart4: any;
  RenderChartByPersons(labeldata: any, amountdata: any) {
    this.myChart4 = new Chart("barchart3", {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: '# Total Expense Spent ' + this.service2.globalAmount,
          data: amountdata,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  assignHome() {
    this.service2.globalRoleChangeEmail = undefined;
    this.service2.globalUpdateRole = undefined;
    this.dialogRef.open(AssignUserRoleComponent);
  }

  myChart7: any;
  myChart8: any;
  myChart9: any;
  myChart10: any;
  RenderExpensesPieChart(labeldata: any, amountdata: any) {
    this.myChart7 = new Chart("piechart1", {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [{
          label: '#Total expense amount is ' + this.service2.globalAmount,
          data: amountdata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }

    });

  }
  RenderCreditDebitPieChart(labeldata: any, amountdata: any) {
    this.myChart8 = new Chart("piechart2", {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [{
          label: '#Total expense amount is ' + this.service2.globalAmount,
          data: amountdata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  RenderExpenseSavingsPieChart(labeldata: any, amountdata: any) {
    this.myChart9 = new Chart("piechart3", {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [{
          label: '#Total expense amount is ' + this.service2.globalAmount,
          data: amountdata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  RenderChartByPersonsPie(labeldata: any, amountdata: any) {
    this.myChart10 = new Chart("piechart4", {
      type: 'pie',
      data: {
        labels: labeldata,
        datasets: [{
          label: '#Total expense amount is ' + this.service2.globalAmount,
          data: amountdata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  name = "Pie";
  changeToPieorBar() {
    if (this.showBar == true) {
      this.showBar = false;
      this.name = 'Bar'
      this.ngOnInit()
    }
    else {
      this.showBar = true
      this.name = 'Pie'
      this.ngOnInit()
    }
  }
}


