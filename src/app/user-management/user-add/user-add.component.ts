import { TranslateService } from '@ngx-translate/core';
import { HTTPResponseCode } from './../../share/constant/constant';
import { FileUploadService } from './../../share/service/file-upload.service';
import { Observable } from 'rxjs';
import { UserInfo } from './../../share/data/user-info';
import { HTTPService } from './../../share/service/http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from './../../share/service/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';

interface IUser {
  name: string;
  nickname: string;
  email: string;
  password: string;
  showPassword: boolean;
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user!: IUser;
  userInfo!: UserInfo;
  submitted = false;
  // selectedFiles!: FileList;
  selectedFiles: any;
  message = '';
  imageSrc: string = '';
  fileInfos?: Observable<any>;
  fileName: string = '';
  currentFile: any ;
  progress = 0;
  errorMsg = '';
  sourceId: number = 0;
  baseUrl: string = '';

  constructor(
    private dataService: DataService,
    private titleService: Title,
    private router: Router,
    private hTTPService: HTTPService,
    private fileUploadService: FileUploadService,
    private translate: TranslateService,
  ) {
    this.user = {} as IUser;
    this.userInfo = {} as UserInfo;
    const url = (window.location.href).split('/');
    this.dataService.visitParamRouterChange(url[4]);
    this.titleService.setTitle('Add User');
  }

  ngOnInit(): void {
  }

  public validate(form: NgForm): void {
    console.log(form.form.value, form.invalid);

    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
  }

  public validateForm(form: NgForm): void {
    console.log(form.form.value, form.invalid);

    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    } else {
      this.userInfo.roleId = Number(this.userInfo.roleId);
      this.userInfo.departmentId = Number(this.userInfo.departmentId);
      console.log(this.userInfo);
      this.hTTPService.Post('/api/user-info/save', this.userInfo).then(response => {
        console.log(response);
      });
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.progress = 0;
    const file: File | null = this.selectedFiles.item(0);
    this.currentFile = file;
    this.errorMsg = '';
  }

  upload(): void {
    this.errorMsg = '';
    this.submitted = true;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileUploadService.upload(this.currentFile,  '', 'LstVideo').subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {

              console.log(event.body);


              // if(event.body?.result.resultCode === HTTPResponseCode.Success) {
              //   this.sourceId = event.body.body.sourceId;
              //   this.imageSrc = this.baseUrl+"/unsecur/api/image/reader/v0/read/"+this.sourceId;
              // } else {
              //   if(event.body?.result.responseMessage === 'videoSourceNameReadyHave') {
              //     this.errorMsg = this.translate.instant('videoSource.message.videoSourceNameReadyHave');
              //   } else {
              //     this.errorMsg = event.body?.result.responseMessage;
              //   }

              // }
            }
          },
          (err: any) => {
            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }


}
