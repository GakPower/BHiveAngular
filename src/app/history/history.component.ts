import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  scales = [];

  constructor(private db: AngularFirestore,
              private aut: AngularFireAuth,
              private router: Router) {
    if (aut.auth.currentUser == null) {
      this.router.navigate(['/login']);
    }
    this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .get().then((doc) => {
        this.scales = doc.data().scales.map(x => x.name);
      });
  }

}
