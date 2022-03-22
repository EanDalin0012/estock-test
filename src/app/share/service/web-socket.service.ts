import { Injectable } from '@angular/core';
declare var SockJS: any;
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  // Open connection with the back-end socket
  public connect() {
    let socket = new SockJS(`http://localhost:8080/socket`);

    let stompClient = Stomp.over(socket);

    return stompClient;
}
}
