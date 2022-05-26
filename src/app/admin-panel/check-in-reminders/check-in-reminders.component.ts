import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "../admin.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

declare var $;

@Component({
  selector: "app-check-in-reminders",
  templateUrl: "./check-in-reminders.component.html",
  styleUrls: ["./check-in-reminders.component.scss"],
})
export class CheckInRemindersComponent implements OnInit {
  allReminders = [];
  reminderObject = {};
  reminderId: any;
  addReminderForm = new FormGroup({
    checkInNumber: new FormControl("", [Validators.required]),
    selectModule: new FormControl("Levelup Popup", [Validators.required]),
    message: new FormControl("", [Validators.required]),
  });
  submitted = false;
  formTitle = "Add Check-In Reminder";
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllCheckReminders();
    $("#AddNewReminder").on("hide.bs.modal", (e) => {
      this.addReminderForm.reset();
      this.addReminderForm.patchValue({
        selectModule: "Levelup Popup",
      });
    });
  }
  get getReminderFormData(): { [key: string]: AbstractControl } {
    return this.addReminderForm.controls;
  }
  getAllCheckReminders() {
    this.adminService.getAllReminders().subscribe(
      (res) => {
        this.allReminders = res;
        this.allReminders = this.allReminders.sort((a, b) => parseInt(a.check_in_number ) - parseInt(b.check_in_number ));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteRemider(id) {
    this.reminderId = id;
  }
  addNewEntry() {
    this.formTitle = "Add Check-In Reminder";
    $("#AddNewReminder").modal("show");
  }
  updateReminder(reminder) {
    this.formTitle = "Update Check-In Reminder";
    $("#AddNewReminder").modal("show");
    this.reminderObject = reminder;
    this.addReminderForm.patchValue({
      checkInNumber: reminder.check_in_number,
      selectModule: reminder.action,
      message: reminder.message,
    });
  }
  updateReminderObject() {
    console.log(this.addReminderForm.value);
    this.adminService
      .updateReminder(this.addReminderForm.value, this.reminderObject)
      .subscribe((res) => {
        const index = this.allReminders.indexOf(this.reminderObject);
        console.log(index);
        this.allReminders.splice(index, 1);
        this.allReminders.push(res);
        this.allReminders = this.allReminders.sort((a, b) => parseInt(a.check_in_number ) - parseInt(b.check_in_number ));
        this.toastr.success("Check-In Reminder Updated Successfully.");
        this.addReminderForm.reset();
        this.addReminderForm.patchValue({
          selectModule: "Levelup Popup",
        });
        $("#AddNewReminder").modal("hide");
      });
  }
  addReminder() {
    this.adminService.addReminder(this.addReminderForm.value).subscribe(
      (res) => {
        this.addReminderForm.reset();
        this.addReminderForm.patchValue({
          selectModule: "Levelup Popup",
        });
        $("#AddNewReminder").modal("hide");
        this.toastr.success("Check-In Reminder Added Successfully.");
        this.allReminders.push(res);
        this.allReminders = this.allReminders.sort((a, b) => parseInt(a.check_in_number ) - parseInt(b.check_in_number ));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateReminderData() {
    if (!this.addReminderForm.valid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    if (this.formTitle === "Add Check-In Reminder") {
      this.addReminder();
    } else {
      this.updateReminderObject();
    }
  }
  deleteReminderObject() {
    this.adminService.deleteReminder(this.reminderId).subscribe(
      (res) => {
        const index = this.allReminders.findIndex(
          (x) => x.id === this.reminderId
        );
        this.allReminders.splice(index, 1);
        this.allReminders = this.allReminders.sort((a, b) => parseInt(a.check_in_number ) - parseInt(b.check_in_number ));
        this.toastr.error("Check-In Reminder Deleted Successfully");
      },
      (error) => {}
    );
  }
}
