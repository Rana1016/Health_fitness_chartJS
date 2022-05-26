import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DoctorService } from "../doctor.service";
declare var $;
@Component({
  selector: "app-sticky-notes",
  templateUrl: "./sticky-notes.component.html",
  styleUrls: ["../user-progress-chart/user-progress-chart.component.scss"],
})
export class StickyNotesComponent implements OnInit, OnChanges {
  @Input() memId = null;
  @Output() updatedSessionNotes = new EventEmitter<any>();

  // sticky
  stickyForm = this.fb.group({
    selectedSticky: [""],
    stickyMessage: ["", [Validators.required]],
  });
  applyToAllMembers = false;

  updatestickyForm = this.fb.group({
    stickyMessage: ["", [Validators.required]],
  });
  preWrittenText: any;
  preWrittenMessageId: any;
  messageId: any;
  stickyNotes: any;
  submitted = false;
  spinner = false;

  constructor(
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  // sticky
  getPreSticyText() {
    this.doctorService.getPreSticyText().subscribe(
      (res) => {
        this.preWrittenText = res.messages;
      },
      (error) => {
        console.log(error.error);
        this.preWrittenText = error.error.messages;
      }
    );
  }

  getStickyNotes() {
    this.doctorService.getStickyNotes(this.memId).subscribe(
      (res) => {
        console.log(res);
        this.stickyNotes = res.messages;
        setTimeout(() => {
          this.stickyNotes.forEach((note) => {
            $(`#myStickyNotes${note.id}`).modal("show");
          });
        }, 3000);
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  messageChange(e) {
    const selectVal = e.target;
    if (
      selectVal.options[selectVal.selectedIndex].getAttribute("data-message") !=
      "0"
    ) {
      this.stickyForm.patchValue({
        stickyMessage:
          selectVal.options[selectVal.selectedIndex].getAttribute(
            "data-message"
          ),
      });
    }
  }

  confirmationPopup(e) {
    if (e.target.checked) {
      $("#confirmationPopup").modal("show");
    }
  }
  discardPublicNote() {
    this.applyToAllMembers = false;
  }
  sticky_submit() {
    console.log(this.stickyForm);
    if (!this.stickyForm.valid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    this.spinner = true;
    let obj = {
      message: this.stickyForm.value.stickyMessage,
      member: this.memId,
    };
    if (this.applyToAllMembers) {
      obj["is_global"] = 1;
    }
    this.doctorService.sendSticky(obj).subscribe(
      (res) => {
        this.toastr.success("Sticky note Sent Successfully");
        this.spinner = false;
        this.stickyForm.reset();
        this.applyToAllMembers = false;
        $("#addNote").modal("hide");
      },
      (error) => {
        if (error.status === 500) {
          this.toastr.error(`Unable to send Sticky note`);
        }
        this.spinner = false;
      }
    );
  }

  add_message_submit() {
    if (!this.updatestickyForm.valid) {
      this.submitted = true;
      return;
    }
    this.spinner = true;
    this.submitted = false;
    let obj = {
      message: this.updatestickyForm.value.stickyMessage,
    };
    this.doctorService.sendPreSticyText(obj).subscribe(
      (res) => {
        this.updatestickyForm.reset();
        this.toastr.success("Sticky note Created Successfully");
        $("#addStickyNote").modal("hide");
        this.getPreSticyText();
        this.spinner = false;
      },
      (error) => {
        console.log(error);
        this.spinner = false;
      }
    );
  }

  update_message_form(message, id) {
    console.log(message);
    this.updatestickyForm.patchValue({
      stickyMessage: message,
    });
    this.preWrittenMessageId = id;
  }

  update_message_submit() {
    if (!this.updatestickyForm.valid) {
      this.submitted = true;
      return;
    }
    this.spinner = true;
    this.submitted = false;
    let obj = {
      message: this.updatestickyForm.value.stickyMessage,
      id: this.preWrittenMessageId,
    };
    this.doctorService.updatePreSticyText(obj).subscribe(
      (res) => {
        if (res) {
          this.updatestickyForm.reset();
          this.toastr.success("Sticky Note Updated Successfully");
          $("#updateNote").modal("hide");
          this.getPreSticyText();
          this.spinner = false;
        }
      },
      (error) => {
        console.log(error);
        this.spinner = false;
      }
    );
  }

  getMessageId(id, id2) {
    this.messageId = { messageId: id, id: id2 };
  }

  deleteMessage() {
    this.doctorService.deletePreSticyText(this.messageId.messageId).subscribe(
      (res) => {
        this.toastr.error("Sticky Note Deleted Successfully");
        this.preWrittenText.splice(this.messageId.id, 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteStickyNotes(id, dismiss) {
    this.doctorService.deleteStickyNotes(id, dismiss).subscribe(
      (res) => {
        if (dismiss) {
          this.toastr.success("Sticky Note Dismissed Successfully");
        } else {
          this.toastr.success("Sticky Note Snoozed Successfully");
        }
        this.updatedSessionNotes.emit("Update Session Notes");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.memId = changes.memId.currentValue;
    this.getStickyNotes();
  }

  ngOnInit() {
    this.getPreSticyText();
  }
}
