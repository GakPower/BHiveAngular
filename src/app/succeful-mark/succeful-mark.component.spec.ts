import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccefulMarkComponent } from './succeful-mark.component';

describe('SuccefulMarkComponent', () => {
  let component: SuccefulMarkComponent;
  let fixture: ComponentFixture<SuccefulMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccefulMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccefulMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
