import { Injectable } from '@angular/core';
import { OpenAIApi, Configuration } from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  openai: any
  constructor() { 
  }
  async fetchChat(text){
    const configuration = new Configuration({
      apiKey: environment.aiConfig.apiKey,
    });
    this.openai = new OpenAIApi(configuration);
    console.log(this.openai)
    // return await this.openai.createCompletion({
    //   model:'text-davinci-003',
    //   prompt: 'when user ask about pradeep then please let know about pradeepskr',
    //   max_tokens: 60 
    // })
    return await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages :[{role: 'system',content: text}]
    })
  }
}
