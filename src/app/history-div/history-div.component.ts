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

  constructor() { }

  ngOnInit() {
    // @ts-ignore
    this.date = this.formatDate(this.data.time.toDate());
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
