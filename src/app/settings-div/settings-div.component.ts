import {Component, Input, OnInit} from '@angular/core';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import Swal from 'sweetalert2';
import {MatRadioButton} from '@angular/material';
// import { firestore } from 'firebase';
import * as firebase from 'firebase/app';

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
  positive = getComputedStyle(document.documentElement).getPropertyValue('--positive');
  negative = getComputedStyle(document.documentElement).getPropertyValue('--negative');

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
  disabled = false;

  powerElement: number;

  expanded: boolean;

  constructor(private db: AngularFirestore,
              private aut: AngularFireAuth) {
  }

  ngOnInit() {
    this.getFrequencyOption();
    this.getPower();
  }

  addTime() {
    this.hint = '';
    if (!this.time) {
      this.hint = 'No time selected';
    } else if (this.customPlanList.indexOf(this.time) !== -1) {
      this.isInvalid = false;
      this.hint = 'Selected time is already part of the plan';
    } else {
      this.customPlanList.push(this.time);
      this.customPlanList.sort((x: string, y: string) => {
        return Number(x.replace(':', '')) - Number(y.replace(':', ''));
      });
      this.time = '';
      this.isInvalid = false;
    }
  }
  removeTime(time) {
    const index = this.customPlanList.indexOf(time);
    if (index > -1) {
      this.customPlanList.splice(index, 1);
    }
    this.time = '';
  }

  setTrans(element: MatRadioButton | number) {
    if (typeof element === 'object') {
      element.checked = true;
      this.transmissionElement = Number(element.value);

      this.expanded = element.value === '3';
    } else if (typeof element === 'number') {
      this.transmissionElement = element;
    }
  }

  getFrequencyOption() {
    this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .get().then((doc) => {
      const frequency = doc.data().scales.find(x => x.name === this.scale).freq;
      this.setTrans(frequency.type);
      this.customPlanList = frequency.plan.map(x => this.getTimeString(x.toDate()));
    });
  }

  getTimeString(date: Date) {
    return date.getHours() + ':' + date.getMinutes();
  }

  setPower(element: MatRadioButton | number) {
    if (typeof element === 'object') {
      element.checked = true;
      this.powerElement = Number(element.value);
    } else if (typeof element === 'number') {
      this.powerElement = element;
    }
  }

  getPower() {
    this.db.firestore.collection('users')
      .doc(this.aut.auth.currentUser.uid)
      .get().then((doc) => {
      this.powerElement = doc.data().scales.find(x => x.name === this.scale).power;
    });
  }

  apply() {
    this.disabled = true;
    setTimeout(() => {
      if (this.transmissionElement === 3 && this.customPlanList.length === 0) {
        this.isInvalid = true;
        this.disabled = false;
        Swal.fire(
          'Error!',
          'Frequency custom plan is empty!',
          'error'
        );
      } else {
        this.db.firestore.collection('users')
          .doc(this.aut.auth.currentUser.uid).get().then(doc => {
          const scales = doc.data().scales.map(x => {
            if (x.name === this.scale) {
              x.freq.plan = this.customPlanList.map(plan => {
                const splittedTime = plan.split(':');
                const newDate = new Date(new Date().setHours(Number(splittedTime[0]), Number(splittedTime[1]), 0, 0));
                return firebase.firestore.Timestamp.fromDate(newDate);
              });
              x.freq.type = this.transmissionElement;
              x.power = this.powerElement;
            }
            return x;
          });

          this.db.firestore.collection('users')
            .doc(this.aut.auth.currentUser.uid).set({
            scales
          }).then(() => {
            this.isInvalid = false;
            this.disabled = false;
            Swal.fire(
              'Applied!',
              'Settings have been changed successfully!',
              'success'
            );
          });
        });
      }
    }, 500);
  }
}
