import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExpenseEntryService } from '../expense-entry.service';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { SharedserviceService } from 'src/app/sharedservice.service';
import * as FileSaver from 'file-saver';
// import {fileSaver} from 'file-saver';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  showUploadOrDownload: any;
  fileNames: any;
  showNoFilesUploaded = false;

  constructor( private fileService: ExpenseEntryService,
               private dialogref: MatDialog,
               private service2: SharedserviceService) { }

  ngOnInit(): void {
    if (this.service2.getFile() == "true"){
      this.showUploadOrDownload = true;
    }
    else {
      this.showUploadOrDownload = false;
      this.filenames = [];
      this.fileService.getFileNames(this.service2.getFileTransactionId()).subscribe( data => {
        this.fileNames = data;
        if (this.fileNames.length == 0){
          this.showNoFilesUploaded = true;
        }
        console.log("File namesssss",this.fileNames.length)
      })
    }
  }

  // define a function to upload files
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); }
    this.fileService.upload(formData).subscribe(
      event => {
        this.showNoFilesUploaded = false
        console.log(event);
        this.resportProgress(event,"msg");
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // define a function to download files
  onDownloadFile(filename: string, originalFileName: string): void {
    this.fileService.download(filename).subscribe(
      event => {
        console.log("eventttttttttttt",event);
        this.resportProgress(event,originalFileName);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>, name: string): void {
    console.log("test event", httpEvent);
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          console.log("File Nameeeeee",httpEvent.headers)
          console.log("File Nameeeeee",httpEvent.headers.get('Content-Type'))
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
                  
          // var blob = new Blob([httpEvent.body!], {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`});
          // FileSaver.saveAs(blob, name);

          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name')!);
        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  close(){
    this.dialogref.closeAll();
  }
}
