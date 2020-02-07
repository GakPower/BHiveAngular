import { Component, Input, OnInit} from '@angular/core';
// import { ChartType } from 'chart.js';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-scale-stats',
  templateUrl: './scale-stats.component.html',
  styleUrls: ['./scale-stats.component.css']
})
export class ScaleStatsComponent implements OnInit {

  @Input() scale: string;

  secondaryRipple = getComputedStyle(document.documentElement).getPropertyValue('--secondaryRipple');
  secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
  primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');

  scaleData;

  weightStat = {
    high: 0,
    low: 0
  };
  diffStat = {
    high: 0,
    low: 0
  };
  tempInStat = {
    high: 0,
    low: 0
  };
  tempOutStat = {
    high: 0,
    low: 0
  };
  humInStat = {
    high: 0,
    low: 0
  };
  humOutStat = {
    high: 0,
    low: 0
  };

  constructor(private aut: AngularFireAuth,
              private db: AngularFirestore) {
  }

  getTopStats() {
    this.scaleData = this.db.firestore.collection('scales')
      .doc(this.aut.auth.currentUser.uid).collection(this.scale);

    this.scaleData.orderBy('weight', 'desc')
      .limit(1)
      .get().then((doc) => {
        this.weightStat.high = doc.docs[0].data().weight;
    });
    this.scaleData.orderBy('weight', 'asc')
      .limit(1)
      .get().then((doc) => {
        this.weightStat.low = doc.docs[0].data().weight;
    });

    this.scaleData.orderBy('diff', 'desc')
      .limit(1)
      .get().then((doc) => {
        const diff = doc.docs[0].data().diff;
        this.diffStat.high = diff > 0 ? '+' + diff : diff;
    });
    this.scaleData.orderBy('diff', 'asc')
      .limit(1)
      .get().then((doc) => {
        const diff = doc.docs[0].data().diff;
        this.diffStat.low = diff > 0 ? '+' + diff : diff;
    });

    this.scaleData.orderBy('humIn', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.humInStat.high = doc.docs[0].data().humIn;
    });
    this.scaleData.orderBy('humIn', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.humInStat.low = doc.docs[0].data().humIn;
    });

    this.scaleData.orderBy('humOut', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.humOutStat.high = doc.docs[0].data().humOut;
    });
    this.scaleData.orderBy('humOut', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.humOutStat.low = doc.docs[0].data().humOut;
    });

    this.scaleData.orderBy('tempIn', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.tempInStat.high = doc.docs[0].data().tempIn;
    });
    this.scaleData.orderBy('tempIn', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.tempInStat.low = doc.docs[0].data().tempIn;
    });

    this.scaleData.orderBy('tempOut', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.tempOutStat.high = doc.docs[0].data().tempOut;
    });
    this.scaleData.orderBy('tempOut', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.tempOutStat.low = doc.docs[0].data().tempOut;
    });
  }

  ngOnInit() {
    this.getTopStats();

  }
}
