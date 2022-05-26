import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBaselineComponent } from './update-baseline.component';

describe('UpdateBaselineComponent', () => {
  let component: UpdateBaselineComponent;
  let fixture: ComponentFixture<UpdateBaselineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBaselineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBaselineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
