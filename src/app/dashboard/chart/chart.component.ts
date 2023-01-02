import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
import { SharedserviceService } from 'src/app/sharedservice.service';
Chart.register(...registerables)

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  // chartdata:any;

  // amount = 0;
  // labeldata:any [] = [];
  // amountdata:any [] =[];
  expense = JSON.parse(this.service2.getGlobalExpense());
  constructor(private service2 : SharedserviceService) { }

  ngOnInit(): void {
    let amount = 0;
    let labeldata: any = []
    let amountdata: any = []
    this.RenderChart(labeldata,amountdata);
    this.expense.forEach((element:any) => {
      if(element.spendType.type == "Expense"){
        labeldata.push(element.category.description);
        amountdata.push(element.amount);
        amount = amount + element.amount;
      }
    });
    labeldata.push("Total");
    amountdata.push(amount);
  }

  RenderChart(labeldata:any,amountdata:any){
    const myChart = new Chart("barchart",{
      type : 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: '# expense amount',
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
        scales : {
          y : {
            beginAtZero: true
          }
        }
      }
    });
  }
}
