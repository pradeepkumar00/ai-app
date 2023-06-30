import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { BehaviorSubject } from 'rxjs';

// import { getAnalytics } from "firebase/analytics";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public declare db;
  value$=new BehaviorSubject(<any>0);
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyChiaWoslpqtxhIfQ2HIYhfg-r8BBcVO2E",
      authDomain: "sikaredu-7.firebaseapp.com",
      databaseURL: "https://sikaredu-7-default-rtdb.firebaseio.com",
      projectId: "sikaredu-7",
      storageBucket: "sikaredu-7.appspot.com",
      messagingSenderId: "784161471090",
      appId: "1:784161471090:web:adb8e42c0ae93954f6a0eb",
      measurementId: "G-PYXSMV71CT"
    };
    
    var app = initializeApp(firebaseConfig);
    // this.db=getAnalytics(app)
    this.db=getDatabase(app)
   }
  addchat(payload){
    push(ref(this.db, 'chat'),payload)
    // this.db.ref().child("chat").set({
    //   name: 'name',
    //   age: 'age'
    // })
  }
  startchat(){
    onValue(ref(this.db,'chat'),(snapshot)=>{
      if(snapshot.val()){
        let value=Object.values(snapshot.val())
        this.value$.next(value)
      }
      else{
        this.value$.next(1)
      }
    })
  }
  getchat(){
    return this.value$
  }


}
