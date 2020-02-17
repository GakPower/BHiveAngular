import {Component, Input, OnInit} from '@angular/core';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import Swal from 'sweetalert2';
import {MatRadioButton} from '@angular/material';

@Component({
  selector: 'app-settings-div',
  templateUrl: './settings-div.component.html',
  styleUrls: ['./settings-div.component.css']
})
export class SettingsDivComponent implements OnInit {

  primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  primaryRipple = getComputedStyle(document.documentElement).getPropertyValue('--primaryRipple');
  secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary');
  secondaryDisabled = getComputedStyle(document.documentElement).getPropertyValue('--secondaryDisabled');
  tertiary = getComputedStyle(document.documentElement).getPropertyValue('--tertiary');
  font = getComputedStyle(document.documentElement).getPropertyValue('--secondaryFont');

  timePickerTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: this.primary,
      buttonColor: this.tertiary,
      primaryFontFamily: this.font
    },
    dial: {
      dialBackgroundColor: this.primaryRipple,
    },
    clockFace: {
      clockFaceBackgroundColor: this.primaryRipple,
      clockHandColor: this.secondary,
      clockFaceTimeInactiveColor: this.tertiary
    }
  };

  @Input() scale: string;

  customPlanList = [];
  time;
  hint = '';
  transmissionElement: number;
  isInvalid = false;
  freqDisabled = false;
  powerDisabled = false;

  powerElement: number;

  constructor(private db: AngularFirestore,
              private aut: AngularFireAuth) {
  }

  ngOnInit() {
    this.transmissionElement = 1;
    this.powerElement = 1;
    this.getFrequencyOption();
    this.getPower();
  }

  addTime() {
    this.hint = '';
    if (!this.time) {
      this.hint = 'No time selected';
    } else if (this.customPlanList.indexOf(this.time) !== -1) {
      this.hint = 'Selected time is already part of the plan';
    } else {
      this.customPlanList.push(this.time);
      this.customPlanList.sort((x: string, y: string) => {
        return Number(x.replace(':', '')) - Number(y.replace(':', ''));
      });
      this.time = '';
    }
  }
  removeTime(time) {
    const index = this.customPlanList.indexOf(time);
    if (index > -1) {
      this.customPlanList.splice(index, 1);
    }
    this.time = '';
  }

  applyTransmission() {
    this.freqDisabled = true;
    setTimeout(() => {
      if (this.transmissionElement === 3 && this.customPlanList.length === 0) {
        this.isInvalid = true;
        this.freqDisabled = false;
      } else {
        Swal.fire(
          'Applied!',
          'The setting about the frequency are changed successfully!',
          'success'
        ).then(() => {
          this.isInvalid = false;
          this.freqDisabled = false;
        });
      }
    }, 500);
  }

  setTrans(element: MatRadioButton) {
    element.checked = true;
    this.transmissionElement = Number(element.value);
  }

  getFrequencyOption() {
    this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .get().then((doc) => {
      const frequency = doc.data().scales.find(x => x.name === this.scale).freq;
      this.transmissionElement = frequency.type;
      this.customPlanList = frequency.plan.map(x => this.getTimeString(x.toDate()));
    });
  }

  getTimeString(date: Date) {
    return date.getHours() + ':' + date.getMinutes();
  }

  setPower(element: MatRadioButton) {
    element.checked = true;
    this.powerElement = Number(element.value);
  }

  getPower() {
    this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .get().then((doc) => {
      this.powerElement = doc.data().scales.find(x => x.name === this.scale).power;
    });
  }

  applyPower() {
    this.powerDisabled = true;
    setTimeout(() => {
      Swal.fire(
        'Applied!',
        'The setting about the power are changed successfully!',
        'success'
      ).then(() => {
        this.powerDisabled = false;
      });
    }, 500);
  }
}
