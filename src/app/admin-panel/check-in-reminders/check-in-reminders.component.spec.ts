import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInRemindersComponent } from './check-in-reminders.component';

describe('CheckInRemindersComponent', () => {
  let component: CheckInRemindersComponent;
  let fixture: ComponentFixture<CheckInRemindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInRemindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
