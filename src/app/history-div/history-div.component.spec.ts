import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDivComponent } from './history-div.component';

describe('HistoryDivComponent', () => {
  let component: HistoryDivComponent;
  let fixture: ComponentFixture<HistoryDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
