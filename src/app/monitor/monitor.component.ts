import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Chart} from 'chart.js';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  isSignedIn;
  scales;
  LineChart: Chart = [];
  primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
  selectedScale;

  liveData = {
    weight: 0,
    diff: 0,
    tempIn: 0,
    humIn: 0,
    tempOut: 0,
    humOut: 0,
    batt: 0,
    signal: 0,
  };

  constructor(private aut: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    if (aut.auth.currentUser != null) {
      this.updateScales();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.isSignedIn = this.aut.auth.currentUser != null;

    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Today',
          fill: false,
          lineTension: .2,
          borderColor: this.secondary,
          borderWidth: 4
        }, {
          label: 'Yesterday',
          fill: false,
          lineTension: .2,
          borderColor: 'rgb(153,153,153)',
          borderWidth: 4
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              const date = data.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index].t;
              if (tooltipItem[0].datasetIndex === 0) {
                return this.getFormattedDate(date, new Date(Date.now()));
              } else {
                return this.getFormattedDate(date, this.getYesterdayDate());
              }
            }
          },
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
          text: 'Weight During Day',
          display: true,
          fontColor: 'white',
          fontSize: 18
        },
        legend: {
          labels: {
            fontColor: 'white',
            fontSize: 15
          }
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: true ,
              color: 'rgba(255,255,255,.04)'
            },
            scaleLabel: {
              display: true,
              labelString: 'Weight',
              fontColor: this.secondary,
              fontStyle: 'bold',
              fontSize: 18
            },
            ticks: {
              beginAtZero: true,
              fontColor: 'white',
              fontSize: 13
            }
          }],
          xAxes: [{
            gridLines: {
              display: true ,
              color: 'rgba(255,255,255,.04)'
            },
            scaleLabel: {
              display: true,
              labelString: 'Time',
              fontColor: this.secondary,
              fontStyle: 'bold',
              fontSize: 18
            },
            type: 'time',
            time: {
              displayFormats: {
                hour: 'H:mm'
              }
            },
            distribution: 'series',
            ticks: {
              beginAtZero: true,
              fontColor: 'white',
              fontSize: 13
            }
          }]
        }
      }
    });
  }
  updateScaleData() {
    this.updateLiveData();
    this.updateChartData();
  }

  updateScales() {
    this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .get().then((doc) => {
        this.activatedRoute.params.subscribe(params => {
          this.scales = doc.data().scales.map(x => x.name);
          if (params.s != null && this.scales.includes(params.s)) {
            this.selectedScale = params.s;
          } else if (this.scales.length > 0) {
            this.selectedScale = this.scales[0];
          }
          this.updateScaleData();
        });
      });
  }

  extractData(data) {
    return {
      weight: data.weight,
      diff: data.diff > 0 ? '+' + data.diff : data.diff,
      tempIn: data.tempIn,
      humIn: data.humIn,
      tempOut: data.tempOut,
      humOut: data.humOut,
      batt: data.batt,
      signal: data.signal,
    };
  }

  updateLiveData() {
    this.db.firestore.collection('scales')
      .doc(this.aut.auth.currentUser.uid)
      .collection(this.selectedScale)
      .orderBy('time', 'desc')
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.liveData = this.extractData(doc.data());
        });
      });
  }
  updateTodayWeight() {
    this.LineChart.data.datasets[0].data = [];
    const lastDay = new Date(Date.now()).getDate();
    this.db.firestore.collection('scales')
      .doc(this.aut.auth.currentUser.uid)
      .collection(this.selectedScale)
      .orderBy('time', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const date = doc.data().time.toDate();
          if (lastDay === date.getDate()) {
            this.LineChart.data.datasets[0].data.push({t: new Date(0, 0, 0,
                date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()), y: doc.data().diff});
            this.LineChart.update();
          } else {
            return true;
          }
      });
    });
  }
  updateYesterdayWeight() {
    this.LineChart.data.datasets[1].data = [];
    const lastDay = this.getYesterdayDate().getDate();
    this.db.firestore.collection('scales')
      .doc(this.aut.auth.currentUser.uid)
      .collection(this.selectedScale)
      .orderBy('time', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const date = doc.data().time.toDate();
          if (date.getDate() === lastDay) {
            this.LineChart.data.datasets[1].data.push({t: new Date(0, 0, 0,
                date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()), y: doc.data().diff});
            this.LineChart.update();
          } else if (date.getDate() < lastDay) {
            return true;
          }
        });
      });
  }

  updateChartData() {
    this.updateTodayWeight();
    this.updateYesterdayWeight();
  }

  getYesterdayDate() {
    return new Date(new Date().setDate(new Date().getDate() - 1));
  }
  getFormattedDate(date, currentDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return months[currentDate.getMonth()] + ' ' + currentDate.getDate() + ' ' + currentDate.getFullYear() + ' ' +
      '' + date.getHours() + ':' + minutes + ':' + seconds;
  }
}
