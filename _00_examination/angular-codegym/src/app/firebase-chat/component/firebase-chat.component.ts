import { Component, OnInit } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import firebase from 'firebase/compat';
import initializeApp = firebase.initializeApp;

@Component({
  selector: 'app-firebase-chat',
  templateUrl: './firebase-chat.component.html',
  styleUrls: ['./firebase-chat.component.css']
})
export class FirebaseChatComponent implements OnInit {
  firebaseConfig = {
    apiKey: 'AIzaSyDgjTHUCwrAkv1m9P-ADKGW05l_hWNyOdE',
    authDomain: 'codegym-khanh-tran.firebaseapp.com',
    databaseURL: 'https://codegym-khanh-tran-default-rtdb.firebaseio.com',
    projectId: 'codegym-khanh-tran',
    storageBucket: 'codegym-khanh-tran.appspot.com',
    messagingSenderId: '1019015133392',
    appId: '1:1019015133392:web:2a2d01d93e7b4b10a546d5',
    measurementId: 'G-ZZGPLK8DFS'
  };

  constructor() { }

  ngOnInit(): void {
    const app = initializeApp(this.firebaseConfig);
    const analytics = getAnalytics(app);
  }

}
