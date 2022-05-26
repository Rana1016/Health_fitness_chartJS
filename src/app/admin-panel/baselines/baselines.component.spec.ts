import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselinesComponent } from './baselines.component';

describe('BaselinesComponent', () => {
  let component: BaselinesComponent;
  let fixture: ComponentFixture<BaselinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaselinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
