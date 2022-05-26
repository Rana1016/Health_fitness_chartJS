import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { DoctorService } from "../doctor.service";
import { ToastrService } from "ngx-toastr";

declare var $;

@Component({
  selector: "app-check-in-notes",
  templateUrl: "./check-in-notes.component.html",
  styleUrls: ["./check-in-notes.component.scss"],
})
export class CheckInNotesComponent implements OnInit, OnChanges {
  @Input() checkInReminderNotes = [];
  @Input() memId = "";
  @Output() updatedSessionNotes = new EventEmitter<any>();


  constructor(
    private doctorService: DoctorService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    $("#checkinReminderPopup").modal("show");
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.checkInReminderNotes) {
      this.checkInReminderNotes = changes.checkInReminderNotes.currentValue
      setTimeout(() => {
        this.checkInReminderNotes.forEach((note, index) => {
          note.message = note.message.replace(/\n/g, "<br />");
          $(`#checkInModal${note.id}`).modal("show");
        });
      }, 3000);
    }
    if (changes.memId) {
      this.memId = changes.memId.currentValue;
    }
  }
  dismissSnoozeCheckinReminder(dismiss) {
    this.doctorService
      .dismissSnoozeCheckInReminder(dismiss, this.memId)
      .subscribe(
        (res) => {
          if (dismiss) {
            this.toastr.success("Check-In Reminder Dismissed Successfully");
          } else {
            this.toastr.success("Check-In Reminder Snoozed Successfully");
          }
          this.updatedSessionNotes.emit("Update Session Notes");
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
