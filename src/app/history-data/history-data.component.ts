import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-history-data',
  templateUrl: './history-data.component.html',
  styleUrls: ['./history-data.component.css']
})
export class HistoryDataComponent implements OnInit {

  @Input() scale: string;
  history = [];
  allData;
  lastDoc;

  constructor(private db: AngularFirestore,
              private aut: AngularFireAuth) {
  }

  ngOnInit() {
    this.db.firestore.collection('scales')
      .doc(this.aut.auth.currentUser.uid).collection(this.scale)
      .get().then((snapshot) => {
      this.allData = snapshot.size;
      for (let i = 0; i < snapshot.docs.length && i < 6; i++) {
        const doc = snapshot.docs[i];
        this.history.push(doc.data());
        this.lastDoc =  doc;
      }
    });
  }

  fetchData(numOfData) {
    if (this.lastDoc != null) {
      this.db.firestore.collection('scales')
        .doc(this.aut.auth.currentUser.uid).collection(this.scale)
        .startAfter(this.lastDoc)
        .get().then((snapshot) => {
        for (let i = 0; i < snapshot.docs.length && i < numOfData; i++) {
          const doc = snapshot.docs[i];
          this.history.push(doc.data());
          this.lastDoc =  doc;
        }
      });
    }
  }

}
