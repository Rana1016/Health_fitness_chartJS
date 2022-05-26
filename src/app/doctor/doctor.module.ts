import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DoctorRoutingModule } from './doctor-routing.module';
import { UserProgressChartComponent } from './user-progress-chart/user-progress-chart.component';
import { UpdateBaselineComponent } from './update-baseline/update-baseline.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ChartsModule } from 'ng2-charts';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DataTablesModule } from 'angular-datatables';
import { X3TrainingTabComponent } from './x3-training-tab/x3-training-tab.component';
import { GraphsComponent } from './graphs/graphs.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material'
import { GetDoctorsComponent } from './get-doctors/get-doctors.component';
import { StickyNotesComponent } from './sticky-notes/sticky-notes.component';
import {AutosizeModule} from 'ngx-autosize';
import { CheckInNotesComponent } from './check-in-notes/check-in-notes.component';
@NgModule({
  declarations: [UserProgressChartComponent, UpdateBaselineComponent, X3TrainingTabComponent, GraphsComponent, GetDoctorsComponent, StickyNotesComponent, CheckInNotesComponent],
  imports: [
    AutosizeModule,
    CommonModule,
    DoctorRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ChartsModule,
    MatTooltipModule,
    ImageCropperModule,
    DataTablesModule,
    MatIconModule,
  ]
})
export class DoctorModule { }
