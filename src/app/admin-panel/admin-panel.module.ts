import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AcuityComponent } from './acuity/acuity.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaselinesComponent } from './baselines/baselines.component';
import { MembersComponent } from './members/members.component';
import { DataTablesModule } from 'angular-datatables';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReportsComponent } from './reports/reports.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { CheckInRemindersComponent } from './check-in-reminders/check-in-reminders.component';
import { ManageSiteComponent } from './manage-site/manage-site.component';
@NgModule({
  declarations: [AdminComponent, AcuityComponent, BaselinesComponent, MembersComponent, ReportsComponent,SuperAdminComponent, CheckInRemindersComponent, ManageSiteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelRoutingModule,
    DataTablesModule,
    MatProgressSpinnerModule,
    ImageCropperModule
  ]
})
export class AdminPanelModule { }
