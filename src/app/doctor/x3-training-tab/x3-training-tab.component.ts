import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  AfterViewInit,
} from "@angular/core";

// Service
import { DoctorService } from "../doctor.service";
import { ToastrService } from "ngx-toastr";
import { Output, EventEmitter } from "@angular/core";

declare var $;

// Angular forms
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm,
} from "@angular/forms";

@Component({
  selector: "app-x3-training-tab",
  templateUrl: "./x3-training-tab.component.html",
  styleUrls: ["./x3-training-tab.component.scss"],
})
export class X3TrainingTabComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @ViewChild("audioElement", { static: false }) public _audioRef: ElementRef;
  private audio: HTMLMediaElement;
  @Input() memberId = "";
  @Input() coach = "";
  @Input() user: any;
  beep = false;
  hideTable = true;
  pushNotes = {
    chest_press_note: "",
    squat_note: "",
    overhead_press_note: "",
    tricep_push_note: "",
    chest_flys_note: "",
  };
  prevPushNotes = {
    chest_press_note: "",
    squat_note: "",
    overhead_press_note: "",
    tricep_push_note: "",
    chest_flys_note: "",
  };
  pullNotes = {
    dead_lift_note: "",
    bent_row_note: "",
    bicep_curl_note: "",
    calf_raise_note: ""
  };
  prevPullNotes = {
    dead_lift_note: "",
    bent_row_note: "",
    bicep_curl_note: "",
    calf_raise_note: ""
  };
  edit_note = "";
  submitted = false;
  highlightedNotes = [];
  highlightedNotesId = "";
  allNotesId = "";
  allNotes = [];
  flex = false;
  //!--Start---Progress Form Handling--//
  progress = this.fb.group({
    chest_press_band: new FormControl(0),
    chest_press_reps: new FormControl(0),
    chest_press_partials: new FormControl(0),
    squat_band: new FormControl(0),
    squat_reps: new FormControl(0),
    squat_partials: new FormControl(0),
    overhead_press_band: new FormControl(0),
    overhead_press_reps: new FormControl(0),
    overhead_press_partials: new FormControl(0),
    tricep_push_band: new FormControl(0),
    tricep_push_reps: new FormControl(0),
    tricep_push_partials: new FormControl(0),
    chest_flys_band: new FormControl(0),
    chest_flys_reps: new FormControl(0),
    chest_flys_partials: new FormControl(0),

    // dead_lift_band: new FormControl(0),
    // dead_lift_reps: new FormControl(0),
    // dead_lift_partials: new FormControl(0),
    // bent_row_band: new FormControl(0),
    // bent_row_reps: new FormControl(0),
    // bent_row_partials: new FormControl(0),
    // bicep_curl_band: new FormControl(0),
    // bicep_curl_reps: new FormControl(0),
    // bicep_curl_partials: new FormControl(0),
    // calf_raise_band: new FormControl(0),
    // calf_raise_reps: new FormControl(0),
    // calf_raise_partials: new FormControl(0),
  });
  progressPull = this.fb.group({
    dead_lift_band: new FormControl(0),
    dead_lift_reps: new FormControl(0),
    dead_lift_partials: new FormControl(0),
    bent_row_band: new FormControl(0),
    bent_row_reps: new FormControl(0),
    bent_row_partials: new FormControl(0),
    bicep_curl_band: new FormControl(0),
    bicep_curl_reps: new FormControl(0),
    bicep_curl_partials: new FormControl(0),
    calf_raise_band: new FormControl(0),
    calf_raise_reps: new FormControl(0),
    calf_raise_partials: new FormControl(0),
  });
  trainingData = {
    chest_press_band: null,
    chest_press_reps: null,
    chest_press_partials: null,
    squat_band: null,
    squat_reps: null,
    squat_partials: null,
    overhead_press_band: null,
    overhead_press_reps: null,
    overhead_press_partials: null,
    tricep_push_band: null,
    tricep_push_reps: null,
    tricep_push_partials: null,
    chest_flys_band: null,
    chest_flys_reps: null,
    chest_flys_partials: null,
    dead_lift_band: null,
    dead_lift_reps: null,
    dead_lift_partials: null,
    bent_row_band: null,
    bent_row_reps: null,
    bent_row_partials: null,
    bicep_curl_band: null,
    bicep_curl_reps: null,
    bicep_curl_partials: null,
    calf_raise_band: null,
    calf_raise_reps: null,
    calf_raise_partials: null,
  };
  goalsDifference = this.trainingData;
  reportingValues = this.trainingData;
  @Output() showCharts = new EventEmitter<any>();

  updateNotesForm = new FormGroup({
    notes: new FormControl("", [Validators.required]),
    coach: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
  });

  //!--Start---Note Form Handling----//
  note = new FormGroup({
    highlightedNote: new FormControl(false),
    note_for_patient: new FormControl("", [Validators.required]),
  });

  handleProgressForm() {
    console.log("Form Value ", this.progress.value);
    this.doctorService
      .addTrainingEntry(this.progress.value, this.memberId)
      .subscribe(
        (res) => {
          this.toastr.success("X3 Training Data Added Successfully.");
          this.getAllNotes();
          this.getHighlightedNotes();
          this.showCharts.emit("Chart");
        },
        (error) => {
          console.log("Error", error);
        }
      );
  }

  handleProgressPullForm() {
    console.log("Form Value ", this.progress.value);
    this.doctorService
      .addTrainingPullEntry(this.progressPull.value, this.memberId)
      .subscribe(
        (res) => {
          this.toastr.success("X3 Training Data Added Successfully.");
          this.getAllNotes();
          this.getHighlightedNotes();
          this.showCharts.emit("Chart");
        },
        (error) => {
          console.log("Error", error);
        }
      );
  }
  //!--End--- Progress Form Handling--//

  handleNoteForm() {
    var x3Note = this.note.value;
    this.note.reset();
    this.doctorService.addTrainingNote(x3Note, this.memberId).subscribe(
      (res) => {
        this.toastr.success("Note Added Successfully");
        this.getAllNotes();
        this.getHighlightedNotes();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //!--End---Note Form Handling----//

  play() {
    this.beep = true;
    this.audio.play();
    this.audio.loop = true;
  }

  stop() {
    this.audio.pause();
    this.beep = false;
  }

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getLatestTraining(this.memberId);
    this.getHighlightedNotes();
    this.getAllNotes();
  }

  ngOnChanges(changes: any) {
    if (changes.memberId) {
      this.memberId = changes.memberId.currentValue;
      this.getLatestTraining(this.memberId);
      this.getHighlightedNotes();
      this.getAllNotes();
      this.getX3PullNotes();
      this.getX3PushNotes();
    }
    if (changes.coach && changes.coach.firstChange) {
      this.coach = changes.coach.currentValue;
    }
    this.user = changes.user ? changes.user.currentValue : "";
  }

  ngAfterViewInit() {
    this.audio = this._audioRef.nativeElement;
  }

  getX3PushNotes() {
    this.doctorService.getX3PushNotes(this.memberId).subscribe(
      (res) => {
        this.pushNotes = {
          chest_press_note: res.chest_press_note ? res.chest_press_note: "",
          squat_note: res.squat_note ? res.squat_note : "",
          overhead_press_note: res.overhead_press_note ? res.overhead_press_note : "" ,
          tricep_push_note: res.tricep_push_note ? res.tricep_push_note : "",
          chest_flys_note: res.chest_flys_note ? res.chest_flys_note : ""
        };
        this.prevPushNotes = {...this.pushNotes}

      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateX3PushNotes() {
    this.doctorService.updateX3PushNotes(this.pushNotes,this.memberId).subscribe(
      (res) => {
        this.prevPushNotes = {...this.pushNotes}
        this.toastr.success("Push Notes Updated Successfully");
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getX3PullNotes() {
    this.doctorService.getX3PushNotes(this.memberId).subscribe(
      (res) => {
        this.pullNotes = {
          dead_lift_note: res.dead_lift_note ? res.dead_lift_note : "",
          bent_row_note: res.bent_row_note ? res.bent_row_note : "",
          bicep_curl_note: res.bicep_curl_note ? res.bicep_curl_note:  "",
          calf_raise_note: res.calf_raise_note ? res.calf_raise_note : ""
        };
        this.pullNotes = {...this.pullNotes}
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateX3PullNotes() {
    this.doctorService.updateX3PushNotes(this.pullNotes,this.memberId).subscribe(
      (res) => {
        this.prevPullNotes = {...this.pullNotes}
        this.toastr.success("Pull Notes Updated Successfully");
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getHighlightedNotes() {
    this.doctorService.getTrainingHighlightedNotes(this.memberId).subscribe(
      (res) => {
        this.highlightedNotes = res;
      },
      (error) => {}
    );
  }

  getNote1(id, date, text, coach) {
    this.edit_note = id;
    this.updateNotesForm.patchValue({
      notes: text,
      coach: coach,
      date: date.split(".")[0].split("Z")[0],
    });
  }

  getAllNotes() {
    this.doctorService.getTrainingAllNotes(this.memberId).subscribe(
      (res) => {
        this.allNotes = res;
        console.log(res);
      },
      (error) => {}
    );
  }

  isDecimal(num) {
    if (num === 0) {
      return true;
    }
    return (num ^ 0) !== num;
  }

  getLatestTraining(memberId) {
    this.doctorService.getLatestTraining(memberId).subscribe(
      (res) => {
        console.log(res);
        if (res.pull == 0 && res.push == 1) {
          this.flex = true;
        } else {
          this.flex = false;
        }
        this.progress.patchValue({
          chest_press_band: this.isDecimal(res.training_push.chest_press_band)
            ? res.training_push.chest_press_band
            : res.training_push.chest_press_band + ".0",
          chest_press_reps: res.training_push.chest_press_reps,
          chest_press_partials: res.training_push.chest_press_partials,
          squat_band: this.isDecimal(res.training_push.squat_band)
            ? res.training_push.squat_band
            : res.training_push.squat_band + ".0",
          squat_reps: res.training_push.squat_reps,
          squat_partials: res.training_push.squat_partials,
          overhead_press_band: this.isDecimal(
            res.training_push.overhead_press_band
          )
            ? res.training_push.overhead_press_band
            : res.training_push.overhead_press_band + ".0",
          overhead_press_reps: res.training_push.overhead_press_reps,
          overhead_press_partials: res.training_push.overhead_press_partials,
          tricep_push_band: this.isDecimal(res.training_push.tricep_push_band)
            ? res.training_push.tricep_push_band
            : res.training_push.tricep_push_band + ".0",
          tricep_push_reps: res.training_push.tricep_push_reps,
          tricep_push_partials: res.training_push.tricep_push_partials,
          chest_flys_band: this.isDecimal(res.training_push.chest_flys_band)
            ? res.training_push.chest_flys_band
            : res.training_push.chest_flys_band + ".0",
          chest_flys_reps: res.training_push.chest_flys_reps,
          chest_flys_partials: res.training_push.chest_flys_partials,

          // dead_lift_band: res.training_pull.dead_lift_band,
          // dead_lift_reps: res.training_pull.dead_lift_reps,
          // dead_lift_partials: res.training_pull.dead_lift_partials,
          // bent_row_band: res.training_pull.bent_row_band,
          // bent_row_reps: res.training_pull.bent_row_reps,
          // bent_row_partials: res.training_pull.bent_row_partials,
          // bicep_curl_band: res.training_pull.bicep_curl_band,
          // bicep_curl_reps: res.training_pull.bicep_curl_reps,
          // bicep_curl_partials: res.training_pull.bicep_curl_partials,
          // calf_raise_band: res.training_pull.calf_raise_band,
          // calf_raise_reps: res.training_pull.calf_raise_reps,
          // calf_raise_partials: res.training_pull.calf_raise_partials,
        });
        this.progressPull.patchValue({
          dead_lift_band: this.isDecimal(res.training_pull.dead_lift_band)
            ? res.training_pull.dead_lift_band
            : res.training_pull.dead_lift_band + ".0",
          dead_lift_reps: res.training_pull.dead_lift_reps,
          dead_lift_partials: res.training_pull.dead_lift_partials,
          bent_row_band: this.isDecimal(res.training_pull.bent_row_band)
            ? res.training_pull.bent_row_band
            : res.training_pull.bent_row_band + ".0",
          bent_row_reps: res.training_pull.bent_row_reps,
          bent_row_partials: res.training_pull.bent_row_partials,
          bicep_curl_band: this.isDecimal(res.training_pull.bicep_curl_band)
            ? res.training_pull.bicep_curl_band
            : res.training_pull.bicep_curl_band + ".0",
          bicep_curl_reps: res.training_pull.bicep_curl_reps,
          bicep_curl_partials: res.training_pull.bicep_curl_partials,
          calf_raise_band: this.isDecimal(res.training_pull.calf_raise_band)
            ? res.training_pull.calf_raise_band
            : res.training_pull.calf_raise_band + ".0",
          calf_raise_reps: res.training_pull.calf_raise_reps,
          calf_raise_partials: res.training_pull.calf_raise_partials,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  UpdateNotes() {
    if (!this.updateNotesForm.valid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    var user = this.updateNotesForm.value;
    var today = new Date(user.date);
    var time =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    user.date = time;
    this.doctorService
      .updateTrainingNote(this.edit_note, user)
      .subscribe((res) => {
        this.toastr.success("Note Updated Successfully");
        this.getHighlightedNotes();
        this.getAllNotes();
        $("#editNote").modal("hide");
      });
  }

  getHighlightedNoteId(id) {
    this.highlightedNotesId = id;
  }

  getAllNoteId(id) {
    this.allNotesId = id;
  }

  deleteHighlightedNote() {
    this.doctorService
      .deleteNote("training", this.highlightedNotesId)
      .subscribe((res) => {
        this.toastr.error("Note Successfully Deleted");
        this.getHighlightedNotes();
      });
  }

  deleteAllNote() {
    this.doctorService
      .deletePreviousNote("training", this.allNotesId)
      .subscribe((res) => {
        this.toastr.error("Note Successfully Deleted");
        this.getAllNotes();
      });
  }
}

interface trainingObject {
  chest_press_band: null;
  chest_press_reps: null;
  chest_press_partials: null;
  squat_band: null;
  squat_reps: null;
  squat_partials: null;
  overhead_press_band: null;
  overhead_press_reps: null;
  overhead_press_partials: null;
  tricep_push_band: null;
  tricep_push_reps: null;
  tricep_push_partials: null;
  chest_flys_band: null;
  chest_flys_reps: null;
  chest_flys_partials: null;
  dead_lift_band: null;
  dead_lift_reps: null;
  dead_lift_partials: null;
  bent_row_band: null;
  bent_row_reps: null;
  bent_row_partials: null;
  bicep_curl_band: null;
  bicep_curl_reps: null;
  bicep_curl_partials: null;
  calf_raise_band: null;
  calf_raise_reps: null;
  calf_raise_partials: null;
}
