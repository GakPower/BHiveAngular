import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  scales = [];
  loading = false;
  scalesUnsubscribe;

  constructor(private aut: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router,
              private userService: UserService) {
    if (aut.auth.currentUser == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.scalesUnsubscribe = this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .onSnapshot((doc) => {
        this.scales = doc.data().scales;
      });
  }

  toMonitor(scale) {
    this.router.navigate(['/monitor', {s: scale}]);
  }

  sendPassReset() {
    this.loading = true;
    setTimeout(() => {
      this.aut.auth.sendPasswordResetEmail(this.aut.auth.currentUser.email).then(() => {
        Swal.fire(
          'Done!',
          'An email has been sent to <strong>' + this.aut.auth.currentUser.email + '</strong> to reset your password',
          'success'
        ).then(() => {
          this.loading = false;
        });
      });
    }, 500);
  }

  signOut() {
    this.scalesUnsubscribe();
    this.aut.auth.signOut();
    this.userService.updateSignIn(false);
    this.router.navigate(['login']);
  }

}
