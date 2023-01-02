import { Component } from '@angular/core';
import { SharedserviceService } from './sharedservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PersonalFinanceManagement';
  a1:any
  constructor(private service2: SharedserviceService){
    this.a1=this.service2.globalAssignUser
  }
  assignUserView = this.service2.globalAssignUser
}
