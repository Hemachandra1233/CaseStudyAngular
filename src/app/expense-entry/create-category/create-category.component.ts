import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/category';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { ExpenseEntryService } from '../expense-entry.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  submit:any;
  categories: any;
  categories2: any;
  category: Category = new Category();
  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    createdBy: new FormControl('')
  });
 
  get Description() {
    return this.form.get('description');
  }
  constructor(private service: ExpenseEntryService,
              private service2: SharedserviceService,
              private dialogRef: MatDialogRef<CreateCategoryComponent>,
              private toastr: ToastrService) { }

  @ViewChild(FormGroupDirective) myForm:any;
  ngOnInit(): void {
    this.categories = this.service2.GlobalCategories;
    this.categories2 = []
    for(let i=0; i<this.categories.length; i++){
      this.categories2.push(this.categories[i].description.toLowerCase());
    }
    console.log(this.categories2);
    
  }

  CreateCat() {
    this.category.description = this.Description?.value;
    this.category.createdBy = this.service2.getGlobalUserName();

    if (this.categories2.includes(this.category.description.toLowerCase())){
      this.toastr.warning('Category Already Exists', 'Message',{
        timeOut: 2000
      })
    }
    else {
      this.service.createCategoryByUserId(this.category).subscribe((data: any) =>
        {
          console.log("Cat Data created", data);
          this.service2.showCategoryAfterCreated = data.id;
          this.service2.setShowCategoryAfterCreated(data.id);
          console.log(this.service2.getShowCategoryAfterCreated());
          console.log("catttt",this.service2.showCategoryAfterCreated);
          
          this.toastr.success('Category Created', 'Message',{
            timeOut: 2000
          })
          this.myForm.resetForm();
          this.dialogRef.close(data.id);
          // if (this.dialogRef.afterClosed()) {
          //   window.location.reload()
          // }
        }), (error: any) => {
          this.toastr.error(error.message, 'Message', {
            timeOut: 2000
          })
        }
      // console.log(this.submit) 
    }
  }
}
