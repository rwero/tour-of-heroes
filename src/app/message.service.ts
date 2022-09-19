import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }


  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
        if(this.messages.length >5){
            this.messages = this.messages.splice(1,5);
        }
  }

  clear() {
    this.messages = [];
  }
}
