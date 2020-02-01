import { Component, OnInit } from '@angular/core';
import {FirebaseAuth, FirebaseFirestore} from '@angular/fire';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private db: AngularFirestore,
              private aut: AngularFireAuth,
              private router: Router) {
    if (aut.auth.currentUser == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
