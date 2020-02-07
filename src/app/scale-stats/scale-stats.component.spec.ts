import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleStatsComponent } from './scale-stats.component';

describe('ScaleStatsComponent', () => {
  let component: ScaleStatsComponent;
  let fixture: ComponentFixture<ScaleStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
