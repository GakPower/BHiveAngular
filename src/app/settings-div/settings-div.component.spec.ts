import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDivComponent } from './settings-div.component';

describe('SettingsDivComponent', () => {
  let component: SettingsDivComponent;
  let fixture: ComponentFixture<SettingsDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
