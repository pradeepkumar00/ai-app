import { Component, OnInit } from '@angular/core';
import { OpenAIApi } from 'openai';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/service/firebase.service';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  text=''
  chatArray;
  sub: Subscription;
  constructor(private openAIApi: OpenAIApi,
    private restService: RestService,
    private firebase: FirebaseService) { }

  ngOnInit() {
    this.firebase.startchat();
    this.firebase.getchat().subscribe(res=>{
      this.chatArray=res
      console.log(this.chatArray)
    })

  }
  async send(){
    const payload={
      type: 0,
      value: this.text
    }
    this.firebase.addchat(payload);
    const data=await this.restService.fetchChat(this.text)
    console.log(data.data.choices[0].message)
    const payload1={
      type: 1,
      value: data.data.choices[0].message
    }
    this.firebase.addchat(payload1);

    // this.firebase.addchat()
  }

}
