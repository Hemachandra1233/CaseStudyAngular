import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  constructor() { }

  shareduser:any;
  sharedhome:any;
  sharedexpense:any;
  amount = 0;
  globalUserId:any;
  globalAmount=0;
  globalHomeId!:any;
  globalExpense = new Array();
  globalRoleId!:any;
  globalAssignUser=false
  globalRoles = [
    // {
    //   "id": 1,
    //   "desc": "Owner"
    // },
    {
      "id": 2,
      "desc": "Member"
    },
    {
      "id": 3,
      "desc": "Visitor"
    }
  ];
  globalExpenseTo = [
    {
      "id":1,
      "name": "common"
    }
  ];
  globalToken = null;
  showCreateHomeMessage: any;

  public getUserId(): any {
    return sessionStorage.getItem('userId');
  }
  public setUserId(UserId: string) {
    sessionStorage.setItem('userId', UserId)
  }
  public getGlobalRoleId(): any {
    return sessionStorage.getItem('globalRoleId');
  }
  public setGlobalRoleId(RoleId: string) {
    return sessionStorage.setItem('globalRoleId', RoleId);
  }
  public setGlobalExpense(Expense: string){
    return sessionStorage.setItem('expense', Expense);
  }
  public getGlobalExpense():any{
    return sessionStorage.getItem('expense');
  }
  public getGlobalHomeId():any{
    return sessionStorage.getItem('homeId');
  }
  public setGlobalHomeId(HomeId: string) {
    return sessionStorage.setItem('homeId', HomeId)
  }


  showMyHome = false;
  public getViewHome(): any{
    return sessionStorage.getItem('view');
  }
  public setViewHome(view: string): any{
    return sessionStorage.setItem('view', view);
  }

  public setGlobalStartDate(StartDate: string):any {
    return sessionStorage.setItem('startDate', StartDate)
  }
  public getGlobalStartDate():any {
    return sessionStorage.getItem('startDate');
  }

  public setGlobalEndDate(endDate: string): any{
    return sessionStorage.setItem('endDate', endDate)
  }
  public getglobalendDate(): any {
    return sessionStorage.getItem('endDate');
  }

  public setChartStartDate(startDate: any): any{
    return sessionStorage.setItem('chartStartDate', startDate)
  }
  public setChartEndDate(endDate: string): any {
    return sessionStorage.setItem('chartEndDate',endDate);
  }
  public getChartStartDate(): any {
    return sessionStorage.getItem('chartStartDate');
  }
  public getChartEndDate(): any {
    return sessionStorage.getItem('chartEndDate');
  }

  public setGlobalExpenseTo(expenseTo: string): any {
    return sessionStorage.setItem('expenseTo', expenseTo);
  }
  public getGlobalExpenseTo(): any{
    return sessionStorage.getItem('expenseTo');
  }

  public getShowExpenseHeading(): any{
    return sessionStorage.getItem('showExp');
  }
  public setShowExpenseHeading(exp: string): any {
    return sessionStorage.setItem('showExp', exp)
  }

  public setGlobalUserId(userId: string): any {
    return sessionStorage.setItem('userId', userId);
  }
  public getGlobalUserId(): any {
    return sessionStorage.getItem('userId');
  }

  public setGlobalUserName(userName: string): any {
    return sessionStorage.setItem('userName',userName);
  }
  public getGlobalUserName(): any {
    return sessionStorage.getItem('userName');
  }
  globalRoleChangeEmail: any;
  globalRoleChangeId: any;
  globalUpdateRole: any;
  globalRoleChangeUserId: any;

  public setUpdateDescription(desc: string) {
    return sessionStorage.setItem('updateDescription',desc);
  }
  public getUpdateDescription(): any {
    return sessionStorage.getItem('updateDescription');
  }
  GlobalCategories: any;
  public getFile(): any {
    return sessionStorage.getItem('file');
  }
  public setFile(file: string): any {
    return sessionStorage.setItem('file',file);
  }
  updateRoleId: any;
  showCategoryAfterCreated: any;

  public setShowCategoryAfterCreated(catId: string): any {
    return sessionStorage.setItem('catId', catId);
  }
  public getShowCategoryAfterCreated(): any {
    return sessionStorage.getItem('catId');
  }

  public setFileTransactionId(TransacId: string) {
    sessionStorage.setItem('TransacId', TransacId)
  }
  public getFileTransactionId(): any {
    return sessionStorage.getItem('TransacId');
  }

  updateHomeId: any;
}
