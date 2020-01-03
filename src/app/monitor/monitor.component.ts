import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  isSignedIn;
  scales;
  constructor(private aut: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.updateScales();
  }

  ngOnInit() {
    this.isSignedIn = this.aut.auth.currentUser != null;
  }

  updateScales() {
    this.db.database.ref('users/' + this.aut.auth.currentUser.uid + '/scales').on('value', (snapshot) => {
      this.scales = snapshot.val();
      console.log(snapshot.val());
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.code);
    });
  }

}
