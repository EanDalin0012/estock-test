import { Utils } from 'src/app/share/util/utils.static';
import { HTTPService } from './../../share/service/http.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from './../../share/service/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  userInfo: any;

  constructor(
    private dataService: DataService,
    private titleService: Title,
    private router: Router,
    private hTTPService: HTTPService
  ) {
    const url = (window.location.href).split('/');
    console.log(url);

    this.dataService.visitParamRouterChange(url[4]);
    this.titleService.setTitle('Edit User');
  }
  ngOnDestroy(): void {
    Utils.removeSecureStorage('edit-user');
  }

  ngOnInit(): void {
    this.userInfo= Utils.getSecureStorage('edit-user');
    console.log(this.userInfo);

  }

}
