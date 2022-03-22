import { WebSocketService } from './../share/service/web-socket.service';
import { LoadUserRequest } from './../share/data/request/load.user.request';
import { environment } from './../../environments/environment';
import { HTTPService } from './../share/service/http.service';
import { Auth } from './../share/data/auth';
import { AuthentcatiionService } from './../share/service/authentcatiion.service';
import { LOCAL_STORAGE } from './../share/constant/constant';
import { Utils } from 'src/app/share/util/utils.static';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private baseUrl: string = '';
  auth!: Auth;
  loadUserRequest!: LoadUserRequest;

  url = 'http://localhost:8080/websocket'
  client: any;
  greeting: string = '';

  constructor(
    // private dataService: DataService,
    private authentcatiionService: AuthentcatiionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private hTTPService: HTTPService,
    private webSocketService: WebSocketService
    ) {
      this.loadUserRequest = {} as LoadUserRequest;
      this.auth = {} as Auth;
      this.baseUrl = environment.bizServer.server;
    }

  ngOnInit(): void {
    this.auth.userName = 'admin@gmail.com';
    this.auth.password = 'admin1234';
    console.log(this.auth);
    // this.webSocketService.connect();

  }

  routors() {
    this.router.navigate(['/acc']);
  }

  onLogin(form: NgForm) {
    console.log(form.form.value, form.invalid);
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    } else {
      this.authentcatiionService.login(this.auth).then((resp: any) => {
        console.log('authentcatiionService', resp);

        if(resp && resp.access_token) {
          const lang = Utils.getSecureStorage(LOCAL_STORAGE.I18N);

          const uri = '/api/user-info/load-user';
          this.loadUserRequest.userName = this.auth.userName;
          this.hTTPService.Post(uri, this.loadUserRequest).then(resposne =>{
            console.log('loadUserRequest', resposne);
            Utils.setSecureStorage(LOCAL_STORAGE.USER_INFO, resposne);
            Utils.setSecureStorage(LOCAL_STORAGE.CONSTANT_AUTHORITY, resposne.authorities);
            // this.connection();
            this.zone.run(() =>  this.router.navigate(['/home'], { replaceUrl: true }));
          });
        }

      }).catch((err: any) => {
          console.log(err);
      });
    }
  }

  changePassword(item: any) {
    // this.modalService.open(
    //   ChangePasswordComponent,
    //   {
    //     message: item,
    //     callback: _response => {

    //   }
    // });
  }

  connection(){
    const tokenValue = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    console.log(tokenValue);
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+tokenValue.access_token
    };
    console.log('header', header);

    let socket = new SockJS('http://localhost:8080/api/websocket', header)
    let stompClient = Stomp.over(socket)
    stompClient.connect(header, frame => {
      console.log('frame', frame);

      // stompClient.subscribe('/user/api/v1/socket/send/greetings', data => {
      //   console.log('data', data);
      // })
    })

  }

}
