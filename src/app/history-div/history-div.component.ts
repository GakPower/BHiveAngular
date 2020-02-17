import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-history-div',
  templateUrl: './history-div.component.html',
  styleUrls: ['./history-div.component.css']
})
export class HistoryDivComponent implements OnInit {

  @Input() data: object;
  @Input() latest = true;
  date;

  diff = '';
  weight = 0;
  signal = 0;
  tempIn = 0;
  tempOut = 0;
  humIn = 0;
  humOut = 0;
  batt = 0;

  constructor() { }

  ngOnInit() {
    // @ts-ignore
    this.date = this.formatDate(this.data.time.toDate());
    // @ts-ignore
    this.diff = this.data.diff;
    // @ts-ignore
    this.weight = this.data.weight;
    // @ts-ignore
    this.signal = this.data.signal;
    // @ts-ignore
    this.humIn = this.data.humIn;
    // @ts-ignore
    this.humOut = this.data.humOut;
    // @ts-ignore
    this.tempIn = this.data.tempIn;
    // @ts-ignore
    this.tempOut = this.data.tempOut;
    // @ts-ignore
    this.batt = this.data.batt;
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

}
