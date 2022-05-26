import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProgressChartComponent } from './user-progress-chart/user-progress-chart.component';


const routes: Routes = [
  {path:'',component:UserProgressChartComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
