import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { HomeServiceService } from 'src/app/home/home-service.service';


@Component({
  selector: 'app-comparing-expenses',
  templateUrl: './comparing-expenses.component.html',
  styleUrls: ['./comparing-expenses.component.css']
})
export class ComparingExpensesComponent {

  expenseChartData: any;
  savingsChartData: any;

  dataByYear = [];
  year: any;

  expenseData = [];
  expenseAmountData: any;
  expenseMonthsData: any
  savingsMonthsData: any
  savingsData = [];
  savingsAmountData: any;
  months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];;
  constructor(private service: HomeServiceService) {

  }
  ngOnInit(): void {

    this.year = 2022
    this.expenseChartData = [];
    this.savingsChartData = [];

    this.dataByYear = []
    this.expenseAmountData = [];
    this.savingsAmountData = []
    this.expenseMonthsData = []
    this.savingsMonthsData = []
    this.service.getExpensesByYear(this.year).subscribe(data => {
      console.log("dataaaaaaa", data);
      this.dataByYear = data;
      data.forEach((val: any) => {
        if (val.type == 1) {
          this.expenseMonthsData.push(val.month);
          this.expenseAmountData.push(val.amount)
        }
        else {
          this.savingsMonthsData.push(val.month);
          this.savingsAmountData.push(val.amount);
        }
      });
      console.log("expenseAmountdata", this.expenseAmountData);
      console.log("savingsAmountData", this.savingsAmountData);
      console.log("expenseMonthsData", this.expenseMonthsData);
      console.log("savingsMonthsData", this.savingsMonthsData);
      for (let i = 1; i < this.months.length + 1; i++) {
        if (this.expenseMonthsData.includes(i)) {
          let index = this.expenseMonthsData.indexOf(i);
          this.expenseChartData.push(this.expenseAmountData[index]);
          console.log("indexxxxxxxxx", index);
        }
        else {
          this.expenseChartData.push(0);
        }
        if (this.savingsMonthsData.includes(i)) {
          let index = this.savingsMonthsData.indexOf(i);
          this.savingsChartData.push(this.savingsAmountData[index]);
          console.log("indexxxxxxxxx", index);
        }
        else {
          this.savingsChartData.push(0);
        }
      }
      console.log("Expense chart dataa", this.expenseChartData);
      console.log("Savings amount dataaa", this.savingsChartData);
      this.RenderExpenseChart1(this.expenseChartData,this.savingsChartData,this.months)
    })
    
  }

  // form: any;
  form: FormGroup = new FormGroup({
    year: new FormControl('')
  });
  get Year() {
    return this.form.get('year');
  }
  submit1() {
    if (this.myChart != null) {
      this.myChart.destroy()
    }
    console.log("clicked", typeof(parseInt(this.form.value.year)));
    this.year = parseInt(this.form.value.year);
    this.expenseChartData = [];
    this.savingsChartData = [];

    this.dataByYear = []
    this.expenseAmountData = [];
    this.savingsAmountData = []
    this.expenseMonthsData = []
    this.savingsMonthsData = []
    this.service.getExpensesByYear(this.year).subscribe(data => {
      console.log("dataaaaaaa", data);
      this.dataByYear = data;
      data.forEach((val: any) => {
        if (val.type == 1) {
          this.expenseMonthsData.push(val.month);
          this.expenseAmountData.push(val.amount)
        }
        else {
          this.savingsMonthsData.push(val.month);
          this.savingsAmountData.push(val.amount);
        }
      });
      console.log("expenseAmountdata", this.expenseAmountData);
      console.log("savingsAmountData", this.savingsAmountData);
      console.log("expenseMonthsData", this.expenseMonthsData);
      console.log("savingsMonthsData", this.savingsMonthsData);
      for (let i = 1; i < this.months.length + 1; i++) {
        if (this.expenseMonthsData.includes(i)) {
          let index = this.expenseMonthsData.indexOf(i);
          this.expenseChartData.push(this.expenseAmountData[index]);
          console.log("indexxxxxxxxx", index);
        }
        else {
          this.expenseChartData.push(0);
        }
        if (this.savingsMonthsData.includes(i)) {
          let index = this.savingsMonthsData.indexOf(i);
          this.savingsChartData.push(this.savingsAmountData[index]);
          console.log("indexxxxxxxxx", index);
        }
        else {
          this.savingsChartData.push(0);
        }
      }
      console.log("Expense chart dataa", this.expenseChartData);
      console.log("Savings amount dataaa", this.savingsChartData);
      this.RenderExpenseChart1(this.expenseChartData,this.savingsChartData,this.months)
    })
    
  }

  myChart: any;
  RenderExpenseChart1(expenselabeldata: any,savingslabeldata: any, amountdata: any) {
    console.log("expenseee data", expenselabeldata)
    this.myChart = new Chart("linechart1", {
      data: {
        datasets: [{
          type: 'line',
          label: 'Expense Dataset',
          data: expenselabeldata
        }, {
          type: 'line',
          label: 'Savings Data',
          data: savingslabeldata,
        }],
        labels: amountdata
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
}
