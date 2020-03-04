import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  scales = [];

  constructor(private aut: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router) {
    if (aut.auth.currentUser == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .get().then((doc) => {
        this.scales = doc.data().scales.map(x => x.name);
      });
  }
}
