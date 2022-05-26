import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { X3TrainingTabComponent } from './x3-training-tab.component';

describe('X3TrainingTabComponent', () => {
  let component: X3TrainingTabComponent;
  let fixture: ComponentFixture<X3TrainingTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ X3TrainingTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(X3TrainingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
