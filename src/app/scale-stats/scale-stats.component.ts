import {AfterContentInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-scale-stats',
  templateUrl: './scale-stats.component.html',
  styleUrls: ['./scale-stats.component.css'],
})
export class ScaleStatsComponent implements OnInit {

  @Input() scale: string;

  secondaryRipple = getComputedStyle(document.documentElement).getPropertyValue('--secondaryRipple');
  secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
  primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  tertiary = getComputedStyle(document.documentElement).getPropertyValue('--tertiary');
  secondaryFont = getComputedStyle(document.documentElement).getPropertyValue('--secondaryFont');

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

  weightChart: Chart = [];
  weightDiffChart: Chart = [];
  tempInChart: Chart = [];
  tempOutChart: Chart = [];
  humInChart: Chart = [];
  humOutChart: Chart = [];
  signalChart: Chart = [];
  batteryChart: Chart = [];

  allScales = [];

  constructor(private aut: AngularFireAuth,
              private db: AngularFirestore,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid).get()
      .then((doc) => {
        this.allScales = doc.data().scales.map(x => x.name);
        this.createCharts();
        if (this.scale !== 'all') {
          this.getTopStats(this.scale);
          this.getChartData(this.scale, 0);
        } else {
          this.allScales.forEach((scale) => {
            this.getTopStats(scale);
            this.getChartData(scale, this.allScales.indexOf(scale));
          });
        }
      });
  }
  createCharts() {
    this.weightChart = this.createLineChart(
      this.elementRef.nativeElement.querySelector('.weightChart'),
      'Weight'
    );
    this.weightDiffChart = this.createLineChart(
      this.elementRef.nativeElement.querySelector('.weightDiffChart'),
      'Weight Difference'
    );
    this.tempInChart = this.createLineChart(
      this.elementRef.nativeElement.querySelector('.tempInChart'),
      'Inside Temperature'
    );
    this.tempOutChart = this.createLineChart(
      this.elementRef.nativeElement.querySelector('.tempOutChart'),
      'Outside Temperature'
    );
    this.humInChart = this.createLineChart(
      this.elementRef.nativeElement.querySelector('.humInChart'),
      'Inside Humidity'
    );
    this.humOutChart = this.createLineChart(
      this.elementRef.nativeElement.querySelector('.humOutChart'),
      'Outside Humidity'
    );
    this.signalChart = this.createLineChart(
      this.elementRef.nativeElement.querySelector('.signalChart'),
      'Signal'
    );
    this.batteryChart = this.createLineChart(
      this.elementRef.nativeElement.querySelector('.batteryChart'),
      'Battery'
    );
  }
  getChartData(scale, scaleIndex) {
    this.db.firestore.collection('scales')
      .doc(this.aut.auth.currentUser.uid).collection(scale)
      .orderBy('time', 'desc')
      .limit(31)
      .get().then((docs) => {
      docs.forEach(doc => {
        const data = doc.data();
        this.weightChart.data.datasets[scaleIndex].data.push({t: data.time.toDate(), y: data.weight});
        this.weightDiffChart.data.datasets[scaleIndex].data.push({t: data.time.toDate(), y: data.diff});
        this.humInChart.data.datasets[scaleIndex].data.push({t: data.time.toDate(), y: data.humIn});
        this.humOutChart.data.datasets[scaleIndex].data.push({t: data.time.toDate(), y: data.humOut});
        this.tempInChart.data.datasets[scaleIndex].data.push({t: data.time.toDate(), y: data.tempIn});
        this.tempOutChart.data.datasets[scaleIndex].data.push({t: data.time.toDate(), y: data.tempOut});
        this.signalChart.data.datasets[scaleIndex].data.push({t: data.time.toDate(), y: data.signal});
        this.batteryChart.data.datasets[scaleIndex].data.push({t: data.time.toDate(), y: data.batt});
      });
      this.weightChart.update();
      this.weightDiffChart.update();
      this.humInChart.update();
      this.humOutChart.update();
      this.tempInChart.update();
      this.tempOutChart.update();
      this.signalChart.update();
      this.batteryChart.update();
    });
  }
  getTopStats(scale) {
    const scaleData = this.db.firestore.collection('scales')
      .doc(this.aut.auth.currentUser.uid).collection(scale);
    scaleData.orderBy('weight', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.updateHighTopStat(doc, doc.docs[0].data().weight, this.weightStat.high, scale);
    });
    scaleData.orderBy('weight', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.updateLowTopStat(doc, doc.docs[0].data().weight, this.weightStat.low, scale);
    });

    scaleData.orderBy('diff', 'desc')
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
    scaleData.orderBy('diff', 'asc')
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

    scaleData.orderBy('humIn', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.updateHighTopStat(doc, doc.docs[0].data().humIn, this.humInStat.high, scale);
    });
    scaleData.orderBy('humIn', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.updateLowTopStat(doc, doc.docs[0].data().humIn, this.humInStat.low, scale);
    });

    scaleData.orderBy('humOut', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.updateHighTopStat(doc, doc.docs[0].data().humOut, this.humOutStat.high, scale);
    });
    scaleData.orderBy('humOut', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.updateLowTopStat(doc, doc.docs[0].data().humOut, this.humOutStat.low, scale);
    });

    scaleData.orderBy('tempIn', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.updateHighTopStat(doc, doc.docs[0].data().tempIn, this.tempInStat.high, scale);
    });
    scaleData.orderBy('tempIn', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.updateLowTopStat(doc, doc.docs[0].data().tempIn, this.tempInStat.low, scale);
    });

    scaleData.orderBy('tempOut', 'desc')
      .limit(1)
      .get().then((doc) => {
      this.updateHighTopStat(doc, doc.docs[0].data().tempOut, this.tempOutStat.high, scale);
    });
    scaleData.orderBy('tempOut', 'asc')
      .limit(1)
      .get().then((doc) => {
      this.updateLowTopStat(doc, doc.docs[0].data().tempOut, this.tempOutStat.low, scale);
    });
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

  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  createLineChart(chartElement: ElementRef,
                  title: string) {
    const datasets = [];
    if (this.scale !== 'all') {
      datasets.push({
        data: [],
        label: this.scale,
        fill: false,
        lineTension: .2,
        borderColor: this.secondary,
        borderWidth: 4,
        pointHoverBackgroundColor: this.secondary,
        pointHoverBorderColor: this.secondaryRipple
      });
    } else {
      let count = 0;
      const colors = [
        '#FFAC1D',
        '#00dd94',
        '#3251c7',
        '#b81c5c',
        '#2e9fc7',
        '#c7621a',
        '#732ec7',
        '#00a361',
        '#c4c71d',
        '#a82ec7',
      ];
      this.allScales.forEach((scale) => {
        const color = count > colors.length ? this.getRandomColor() : colors[count++];
        datasets.push({
          data: [],
          label: scale,
          fill: false,
          lineTension: .2,
          borderColor: color,
          borderWidth: 4,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: color
        });
      });
    }
    return new Chart(chartElement, {
      type: 'line',
      data: {
        datasets
      },
      options: {
        tooltips: {
          mode: 'nearest',
          titleFontSize: 15,
          bodyFontSize: 15,
          backgroundColor: this.primary,
          titleFontColor: this.secondary,
          bodyFontColor: this.secondary,
          borderColor: this.secondary,
          borderWidth: 1
        },
        responsive: true,
        maintainAspectRatio: false,
        title: {
          text: title + ' During Last Month',
          display: true,
          fontColor: this.tertiary,
          fontFamily: this.secondaryFont,
          fontStyle: 'normal',
          fontSize: 18
        },
        legend: {
          labels: {
            fontColor: this.tertiary,
            fontFamily: this.secondaryFont,
            fontSize: 15
          }
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(255,255,255,.04)'
            },
            scaleLabel: {
              display: true,
              labelString: title,
              fontColor: this.secondary,
              fontFamily: this.secondaryFont,
              fontStyle: 'normal',
              fontSize: 18
            },
            ticks: {
              beginAtZero: true,
              fontColor: this.tertiary,
              fontFamily: this.secondaryFont,
              fontSize: 13
            }
          }],
          xAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(255,255,255,.04)'
            },
            scaleLabel: {
              display: true,
              labelString: 'Time',
              fontColor: this.secondary,
              fontFamily: this.secondaryFont,
              fontStyle: 'normal',
              fontSize: 18
            },
            type: 'time',
            time: {
              unit: 'day'
            },
            distribution: 'series',
            ticks: {
              beginAtZero: true,
              fontColor: this.tertiary,
              fontFamily: this.secondaryFont,
              fontSize: 13
            }
          }]
        }
      }
    });
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
