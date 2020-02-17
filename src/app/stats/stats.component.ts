import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatsComponent implements OnInit {
  scalesUnsubscribe;
  scales = [];

  constructor(private db: AngularFirestore,
              private aut: AngularFireAuth,
              private router: Router) {
    if (aut.auth.currentUser == null) {
      this.router.navigate(['/login']);
    }
    this.scalesUnsubscribe = this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .onSnapshot((doc) => {
        this.scales = doc.data().scales.map(x => x.name);
      });
  }

  ngOnInit() {
  }

}
