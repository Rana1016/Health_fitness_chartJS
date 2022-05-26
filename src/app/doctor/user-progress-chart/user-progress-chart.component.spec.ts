import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgressChartComponent } from './user-progress-chart.component';

describe('UserProgressChartComponent', () => {
  let component: UserProgressChartComponent;
  let fixture: ComponentFixture<UserProgressChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProgressChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
