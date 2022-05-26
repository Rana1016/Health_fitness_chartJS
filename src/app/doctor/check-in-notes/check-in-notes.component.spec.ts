import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInNotesComponent } from './check-in-notes.component';

describe('CheckInNotesComponent', () => {
  let component: CheckInNotesComponent;
  let fixture: ComponentFixture<CheckInNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
