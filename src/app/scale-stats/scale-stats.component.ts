import {AfterContentInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
// import { ChartType } from 'chart.js';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-scale-stats',
  templateUrl: './scale-stats.component.html',
  styleUrls: ['./scale-stats.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScaleStatsComponent implements OnInit {

  @Input() scale: string;

  secondaryRipple = getComputedStyle(document.documentElement).getPropertyValue('--secondaryRipple');
  secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
  primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');

  scaleData;
  animationDelay = 300;

  weightStat = {
    high: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    },
    low: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    }
  };
  diffStat = {
    high: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    },
    low: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    }
  };
  tempInStat = {
    high: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    },
    low: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    }
  };
  tempOutStat = {
    high: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    },
    low: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    }
  };
  humInStat = {
    high: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    },
    low: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    }
  };
  humOutStat = {
    high: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    },
    low: {
      inited: false,
      scale: '',
      stat: 0,
      date: this.formatDate(new Date()),
    }
  };

  constructor(private aut: AngularFireAuth,
              private db: AngularFirestore) {
    console.log(this.scale);
  }

  updateHighTopStat(doc, stat, storage, scale) {
    if (!storage.inited || storage.stat < stat) {
      storage.stat = stat;
      storage.date = this.formatDate(doc.docs[0].data().time.toDate());
      storage.scale = scale;
    }
  }
  updateLowTopStat(doc, stat, storage, scale) {
    if (!storage.inited || storage.stat > stat) {
      storage.stat = stat;
      storage.date = this.formatDate(doc.docs[0].data().time.toDate());
      storage.scale = scale;
    }
  }

  getTopStats(scale) {
    this.scaleData = this.db.firestore.collection('scales')
      .doc(this.aut.auth.currentUser.uid).collection(scale);

    this.scaleData.orderBy('weight', 'desc')
      .limit(1)
      .get().then((doc) => {
        this.updateHighTopStat(doc, doc.docs[0].data().weight, this.weightStat.high, scale);
    });
    this.scaleData.orderBy('weight', 'asc')
      .limit(1)
      .get().then((doc) => {
        this.updateLowTopStat(doc, doc.docs[0].data().weight, this.weightStat.low, scale);
    });

    this.scaleData.orderBy('diff', 'desc')
      .limit(1)
      .get().then((doc) => {
      const data = doc.docs[0].data();
      const storage = this.diffStat.high;
      if (!storage.inited || storage.stat < data.diff) {
        storage.stat = data.diff > 0 ? '+' + data.diff : data.diff;
        storage.date = this.formatDate(data.time.toDate());
        storage.scale = scale;
      }
    });
    this.scaleData.orderBy('diff', 'asc')
      .limit(1)
      .get().then((doc) => {
      const data = doc.docs[0].data();
      const storage = this.diffStat.low;
      if (!storage.inited || storage.stat > data.diff) {
        storage.stat = data.diff > 0 ? '+' + data.diff : data.diff;
        storage.date = this.formatDate(data.time.toDate());
        storage.scale = scale;
      }
    });

    this.scaleData.orderBy('humIn', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.updateHighTopStat(doc, doc.docs[0].data().humIn, this.humInStat.high, scale);
      });
    this.scaleData.orderBy('humIn', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.updateLowTopStat(doc, doc.docs[0].data().humIn, this.humInStat.low, scale);
    });

    this.scaleData.orderBy('humOut', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.updateHighTopStat(doc, doc.docs[0].data().humOut, this.humOutStat.high, scale);
    });
    this.scaleData.orderBy('humOut', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.updateLowTopStat(doc, doc.docs[0].data().humOut, this.humOutStat.low, scale);
    });

    this.scaleData.orderBy('tempIn', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.updateHighTopStat(doc, doc.docs[0].data().tempIn, this.tempInStat.high, scale);
    });
    this.scaleData.orderBy('tempIn', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.updateLowTopStat(doc, doc.docs[0].data().tempIn, this.tempInStat.low, scale);
    });

    this.scaleData.orderBy('tempOut', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.updateHighTopStat(doc, doc.docs[0].data().tempOut, this.tempOutStat.high, scale);
    });
    this.scaleData.orderBy('tempOut', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.updateLowTopStat(doc, doc.docs[0].data().tempOut, this.tempOutStat.low, scale);
    });
  }
  getAllTopStats() {
    this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .get().then((doc) => {
        const scales = doc.data().scales.map(x => x.name);
        for (const scale of scales) {
          this.getTopStats(scale);
        }
    });
  }

  ngOnInit() {
    if (this.scale === 'all') {
      this.getAllTopStats();
    } else {
      this.getTopStats(this.scale);
    }
  }

  formatDate(date: Date): string {
    let minutes: any = date.getMinutes();
    let seconds: any = date.getSeconds();
    let month: any = (date.getMonth() + 1);
    let day: any = date.getDate();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return day + '/' + month + '/' + date.getFullYear() + ' ' +
      '' + date.getHours() + ':' + minutes + ':' + seconds;
  }

  getTooltipMessage(data): string {
    if (this.scale === 'all') {
      return 'Scale: ' + data.scale + ' \n ' + 'Date: ' + data.date;
    } else {
      return 'Date: ' + data.date;
    }
  }
}
