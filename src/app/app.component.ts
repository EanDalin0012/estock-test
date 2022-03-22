import { LOCAL_STORAGE, LANGUAGE } from './share/constant/constant';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from './share/util/utils.static';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sqlserver-demo';

  url = 'http://localhost:8080/websocket'
  client: any;
  greeting: string = '';

  // subject = new  WebSocket('ws://localhost', null, { headers: { Authorization: '' }});

  constructor(
    private translate: TranslateService
  ) {
    this.setInitialAppLanguage();
    (window as any).global = window;
    // this.connection();
  }
  setInitialAppLanguage() {
    const i18n = Utils.getSecureStorage(LOCAL_STORAGE.I18N );
    if ( !i18n ) {
      Utils.setSecureStorage(LOCAL_STORAGE.I18N, LANGUAGE.I18N_EN.toString());
      this.translate.setDefaultLang( LANGUAGE.I18N_EN.toString() );
      this.translate.use( LANGUAGE.I18N_EN.toString() );
    } else {
      this.translate.setDefaultLang( 'en' );
      this.translate.use( i18n );
    }
  }

  connection() {

    let ws = new SockJS('http://localhost:8080/websocket', {headers: {'Authorization': 'Beer '}});
    this.client = Stomp.over(ws);
    let that = this;

    this.client.connect({}, function(frame: any) {
      that.client.subscribe("/topic/greeting", (message:any) => {
        alert(message);
      });
    });
  }

  // sendToServer(event: any) {
  //   this.subject.subscribe();
  //   this.subject.next('test mesage');
  //   this.subject.complete
  // }

}
