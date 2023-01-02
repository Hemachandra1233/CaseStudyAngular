import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HomeServiceService } from 'src/app/dashboard/home-service.service';

@Component({
  selector: 'app-impersonation',
  templateUrl: './impersonation.component.html',
  styleUrls: ['./impersonation.component.css']
})
export class ImpersonationComponent implements OnInit {

  id :any
  prepdata!:any
  expense!:MatTableDataSource<any>;


  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
  constructor(private route: ActivatedRoute,
              private service: HomeServiceService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.service.getExpensesByHomeId(this.id).subscribe(data => {
      this.prepdata = data
    })
    this.service.getExpensesByHomeId(this.id).subscribe( (data: any) =>{
      this.expense = new MatTableDataSource(data);
      this.expense.paginator = this.paginator;
      this.expense.sort = this.matSort;
      console.log(this.expense);
    })
  }

}
