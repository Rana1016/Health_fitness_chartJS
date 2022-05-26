import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "../admin.service";
import { ToastrService } from "ngx-toastr";
import {FormControl,Validators} from "@angular/forms";

@Component({
  selector: "app-acuity",
  templateUrl: "./acuity.component.html",
  styleUrls: ["./acuity.component.scss"],
})

export class AcuityComponent implements OnInit {

  @Input() memberId = "";
  locationCalendarIds = [];
  allCalendarIds: any;
  selectedCalendar:any = null;
  submittedError = '';
  setId: any;
  acuityForm = new FormControl("", [Validators.required]);

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCalendarId();
  }

  getCalendarId() {
    this.adminService.getCalendarId().subscribe(
      (res) => {
        this.allCalendarIds = res.calenders;
        this.getLocationCalendersIds();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleFormSubmit() {
    let id = this.acuityForm.value;
    let itemFound = this.locationCalendarIds.filter((item) => item.id == id);
    let calendarFound = this.allCalendarIds.filter((calendar) => calendar.id == id);
    if (!this.acuityForm.valid || itemFound.length > 0 || calendarFound.length == 0) {
      if(!this.acuityForm.valid){
        this.submittedError = 'Calendar Id is required';
      }else if(itemFound.length > 0){
        this.submittedError = 'Calendar ID already Exists';
      }else{
        this.submittedError = 'Invalid Calendar ID';
      }
      return;
    }
    this.submittedError = '';
    let calendarData = {};
    this.locationCalendarIds.forEach((item, index) => {
      calendarData[item.id] = item.delay_time;
    });
    calendarData[id] = calendarFound[0].delay_time;
    this.adminService.updateCalendarIds(calendarData).subscribe((res) => {
      this.acuityForm.reset();
      this.toastr.success(`${calendarFound.name} Id Added Successfully.`);
      let obj = {
        name : calendarFound[0].name,
        id:id,
        delay_time:calendarFound[0].delay_time,
        input_field:false,
        updateError:''
      };
      this.locationCalendarIds.push(obj);
    });
  }

  getLocationCalendersIds() {
    let tempIds = [];
    this.adminService.getLocationCalendarIds().subscribe(
      (res) => {
        tempIds = res.calender_id.split(", ");
        tempIds.forEach((item) => {
          const calendarName = this.allCalendarIds.find((calendar) => calendar.id == item);
          let obj = {
            name:calendarName.name,
            id:calendarName.id,
            delay_time:calendarName.delay_time,
            input_field:false,
            updateError:''
          };
          this.locationCalendarIds.push(obj);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setDeleteId(id) {
    this.setId = id;
  }

  deleteId() {
    let ind = this.locationCalendarIds.findIndex(x=>x.id==this.setId);
    this.locationCalendarIds.splice(ind, 1);
    let calendarData = {};
    this.locationCalendarIds.forEach((item, index) => {
      calendarData[item.id] = item.delay_time;
    });
    this.adminService.updateCalendarIds(calendarData).subscribe((res)=>{
      this.toastr.error("Calendar Id Deleted Successfully");
    });
  }

  updateId(idIndex, oldId) {
    let calendarData = {};
    let checkIds = this.locationCalendarIds.filter(x=>x.id == oldId);
    let calendarFound = this.allCalendarIds.filter((calendar) => calendar.id == oldId);
    if(oldId == '' || checkIds.length > 1 || calendarFound.length == 0){
      if(oldId == ''){
        this.locationCalendarIds[idIndex].updateError = 'Calendar ID is required';
      }else if(checkIds.length > 1){
        this.locationCalendarIds[idIndex].updateError = 'Calendar ID already Exists';
      }else{
        this.locationCalendarIds[idIndex].updateError = 'Invlaid Calendar ID';
      }
      return;
    }
    this.locationCalendarIds[idIndex].name = calendarFound[0].name; 
    this.locationCalendarIds[idIndex].input_field = false; 
    this.locationCalendarIds[idIndex].updateError = '';
    this.locationCalendarIds.forEach((item,index)=>{
      calendarData[item.id] = item.delay_time;
    });
    this.adminService.updateCalendarIds(calendarData).subscribe((res) => {
      this.toastr.success(`Calender Id Updated Successfully.`);
    });
  }

  setUpdateValue(i) {
    let ind = this.locationCalendarIds.findIndex(x=>x.input_field == true);
    if(ind != -1){
      let calendar = this.allCalendarIds.find(x=>x.name==this.locationCalendarIds[ind].name);
      this.locationCalendarIds[ind].id = calendar.id;
      this.locationCalendarIds[ind].delay_time = calendar.delay_time;
      this.locationCalendarIds[ind].input_field = false;
    }
    if(i != ind){
      this.locationCalendarIds[i].input_field = !this.locationCalendarIds[i].input_field;
    }
  }
}
