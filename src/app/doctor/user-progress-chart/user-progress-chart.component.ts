import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm,
} from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { DoctorService } from "../doctor.service";
import { ImageCroppedEvent } from "ngx-image-cropper";
import Compressor from "compressorjs";
// import  $ from 'jquery';
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

import { environment } from "src/environments/environment";
import { DatePipe } from "@angular/common";
import { TOUCH_BUFFER_MS } from "@angular/cdk/a11y";
import * as moment from "moment-timezone";

// import { timeStamp } from 'console';
// import { resolveNaptr } from 'dns';
// import { read } from 'fs';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { EventEmitter } from "@angular/core";

declare var $;

@Component({
  selector: "app-user-progress-chart",
  templateUrl: "./user-progress-chart.component.html",
  styleUrls: ["./user-progress-chart.component.scss"],
})
export class UserProgressChartComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  @ViewChild("autoCompleteField", { static: false })
  input;
  dtElement: DataTableDirective;
  refreshGraphs: EventEmitter<boolean> = new EventEmitter();
  refreshPosturePics: EventEmitter<boolean> = new EventEmitter();
  appointment: false;
  assignedDoctor = false;
  user_error = null;
  imageElement: any;
  goal_1_val: any;
  goal_2_val: any;
  goal_3_val: any;
  goal_4_val: any;
  test_push1: any;
  hideTable1 = true;
  hideTable2 = true;
  hideTable3 = true;
  url_profile_image:any;
  showNote1Btn = "";
  showNote2Btn = "";
  userCalendarId: any;
  update_note_count = 0;
  showBaselineFormButton: any;
  showPopup = false;
  test_push2: any;
  test_push3: any;
  test_push4: any;
  locationDetails: any;
  modalName = "";
  baselineFormTempValues = {};
  count_member_list = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  url: SafeResourceUrl;
  url_iframe: SafeResourceUrl;
  url2: SafeResourceUrl;
  date_type: boolean;
  quickTasks: any;
  messageId: any;
  memDoctors = [];
  currentUserPic: any;
  reportTrainingValues: any;
  height_temp_values = {
    48.0: "4’ 0”",
    48.25: "4’ ¼”",
    48.5: "4’ ½”",
    48.75: "4’ ¾”",
    49.0: "4’ 1”",
    49.25: "4’ 1 ¼”",
    49.5: "4’ 1 ½”",
    49.75: "4’ 1 ¾”",
    50.0: "4’ 2”",
    50.25: "4’ 2 ¼”",
    50.5: "4’ 2 ½”",
    50.75: "4’ 2 ¾”",
    51.0: "4’ 3”",
    51.25: "4’ 3 ¼”",
    51.5: "4’ 3 ½",
    51.75: "4’ 3 ¾”",
    52.0: "4’ 4”",
    52.25: "4’ 4 ¼”",
    52.5: "4’ 4 ½”",
    52.75: "4’ 4 ¾”",
    53.0: "4’ 5”",
    53.25: "4’ 5 ¼”",
    53.5: "4’ 5 ½”",
    53.75: "4’ 5 ¾”",
    54.0: "4’ 6”",
    54.25: "4’ 6 ¼”",
    54.5: "4’ 6 ½”",
    54.75: "4’ 6 ¾”",
    55.0: "4’ 7”",
    55.25: "4’ 7 ¼”",
    55.5: "4’ 7 ½”",
    55.75: "4’ 7 ¾”",
    56.0: "4’ 8”",
    56.25: "4’ 8 ¼”",
    56.5: "4’ 8 ½”",
    56.75: "4’ 8 ¾”",
    57.0: "4’ 9”",
    57.25: "4’ 9 ¼”",
    57.5: "4’ 9 ½”",
    57.75: "4’ 9 ¾”",
    58.0: "4’ 10”",
    58.25: "4’ 10 ¼”",
    58.5: "4’ 10 ½”",
    58.75: "4’ 10 ¾”",
    59.0: "4’ 11”",
    59.25: "4’ 11 ¼”",
    59.5: "4’ 11 ½”",
    59.75: "4’ 11 ¾”",
    60.0: "5’ 0”",
    60.25: "5’ ¼”",
    60.5: "5’ ½”",
    60.75: "5’ ¾”",
    61.0: "5’ 1”",
    61.25: "5’ 1 ¼”",
    61.5: "5’ 1 ½”",
    61.75: "5’ 1 ¾”",
    62.0: "5’ 2”",
    62.25: "5’ 2 ¼”",
    62.5: "5’ 2 ½”",
    62.75: "5’ 2 ¾”",
    63.0: "5’ 3”",
    63.25: "5’ 3 ¼”",
    63.5: "5’ 3 ½”",
    63.75: "5’ 3 ¾”",
    64.0: "5’ 4”",
    64.25: "5’ 4 ¼”",
    64.5: "5’ 4 ½”",
    64.75: "5’ 4 ¾”",
    65.0: "5’ 5”",
    65.25: "5’ 5 ¼”",
    65.5: "5’ 5 ½”",
    65.75: "5’ 5 ¾”",
    66.0: "5’ 6”",
    66.25: "5’ 6 ¼”",
    66.5: "5’ 6 ½”",
    66.75: "5’ 6 ¾”",
    67.0: "5’ 7”",
    67.25: "5’ 7 ¼”",
    67.5: "5’ 7 ½”",
    67.75: "5’ 7 ¾”",
    68.0: "5’ 8”",
    68.25: "5’ 8 ¼”",
    68.5: "5’ 8 ½”",
    68.75: "5’ 8 ¾”",
    69.0: "5’ 9”",
    69.25: "5’ 9 ¼”",
    69.5: "5’ 9 ½”",
    69.75: "5’ 9 ¾”",
    70.0: "5’ 10”",
    70.25: "5’ 10 ¼”",
    70.5: "5’ 10 ½”",
    70.75: "5’ 10 ¾”",
    71.0: "5’ 11”",
    71.25: "5’ 11 ¼”",
    71.5: "5’ 11 ½”",
    71.75: "5’ 11 ¾”",
    72.0: "6’ 0”",
    72.25: "6’ ¼”",
    72.5: "6’ ½”",
    72.75: "6’ ¾”",
    73.0: "6’ 1”",
    73.25: "6’ 1 ¼”",
    73.5: "6’ 1 ½”",
    73.75: "6’ 1 ¾”",
    74.0: "6’ 2”",
    74.25: "6’ 2 ¼”",
    74.5: "6’ 2 ½”",
    74.75: "6’ 2 ¾",
    75.0: "6’ 3",
    75.25: "6’ 3 ¼”",
    75.5: "6’ 3 ½”",
    75.75: "6’ 3 ¾”",
    76.0: "6’ 4”",
    76.25: "6’ 4 ¼”",
    76.5: "6’ 4 ½”",
    76.75: "6’ 4 ¾”",
    77.0: "6’ 5”",
    77.25: "6’ 5 ¼”",
    77.5: "6’ 5 ½”",
    77.75: "6’ 5 ¾”",
    78.0: "6’ 6”",
    78.25: "6’ 6 ¼”",
    78.5: "6’ 6 ½”",
    78.75: "6’ 6 ¾”",
    79.0: "6’ 7”",
    79.25: "6’ 7 ¼”",
    79.5: "6’ 7 ½”",
    79.75: "6’ 7 ¾”",
    80.0: "6’ 8”",
    80.25: "6’ 8 ¼”",
    80.5: "6’ 8 ½”",
    80.75: "6’ 8 ¾”",
    81.0: "6’ 9”",
    81.25: "6’ 9 ¼”",
    81.5: "6’ 9 ½”",
    81.75: "6’ 9 ¾”",
    82.0: "6’ 10”",
    82.25: "6’ 10 ¼”",
    82.5: "6’ 10 ½”",
    82.75: "6’ 10 ¾”",
    83.0: "6’ 11”",
    83.25: "6’ 11 ¼”",
    83.5: "6’ 11 ½”",
    83.75: "6’ 11 ¾”",
    84.0: "7’ 0”",
  };
  filteredValues = [];
  edit1 = {};
  cleared = false;

  selectQuickTaskVal: any;
  selectQuickTaskId: any;
  openMenu: boolean = false;
  updateImage: boolean = true;
  imageEditing: boolean = false;
  updatedImageFile: any = null;
  ImageName = "";
  checkInReminderNotes = [];
  formTitle = "Register a new user";
  formBtn = "Add Member Now";
  base = environment.baseUrl;
  UserObj: any = {};
  scale = 1;
  formType = 1;
  leg_strength_test_val = 0;
  balance_test_val = 0;
  x3_chest_val = 0;
  x3_bicep_val = 0;
  toggle_note = 0;
  toggle_note2 = 0;
  highlighted_note_id_1 = null;
  highlighted_note_id_2 = null;
  highlighted_note_id_3 = null;
  previous_note_id_1 = null;
  previous_note_id_2 = null;
  previous_note_id_3 = null;
  x3_form_show: boolean;
  btracks_form_show: boolean;
  submitted = false;
  table_user_id = null;
  addition_info: any;
  appointment_id: any;
  addition_boolean: boolean;
  addAppointmentMemberForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [
      Validators.required, // role: new FormControl(""),

      Validators.pattern("((([0-9]{3}))|[0-9]{3})[s-]?[\0-9]{3}[s-]?[0-9]{4}$"),
    ]),
    dob2: new FormControl(""),
    get_email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  memberForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [
      Validators.required,
      Validators.pattern("((([0-9]{3}))|[0-9]{3})[s-]?[\0-9]{3}[s-]?[0-9]{4}$"),
    ]),
    userName: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),
    ]),
    dob2: new FormControl(""),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  updateMemberForm = new FormGroup({
    get_first_name: new FormControl("", [Validators.required]),
    get_last_name: new FormControl("", [Validators.required]),
    phone_number: new FormControl("", [
      Validators.required,
      Validators.pattern("((([0-9]{3}))|[0-9]{3})[s-]?[\0-9]{3}[s-]?[0-9]{4}$"),
    ]),
    dob: new FormControl(""),
    get_email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),
    ]),
    role: new FormControl(""),
    password: new FormControl("", [Validators.minLength(6)]),
  });

  updateNotesForm = new FormGroup({
    notes: new FormControl("", [Validators.required]),
    coach: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
  });

  reviewForm = new FormGroup({
    review_area: new FormControl("", [Validators.required]),
  });

  positionForm = new FormGroup({
    ugt_arm: new FormControl(""),
    ugt_seat: new FormControl(""),
    coozies: new FormControl(""),
    yoga: new FormControl(""),
    lgt_seat: new FormControl(""),
    lgt_pads: new FormControl(""),
    cgt_arm: new FormControl(""),
    cgt_seat: new FormControl(""),
    pgt_arm: new FormControl(""),
    pgt_pads_plate: new FormControl(""),
    ugt_pr: new FormControl(""),
    lgt_pr: new FormControl(""),
    cgt_pr: new FormControl(""),
    pgt_pr: new FormControl(""),
  });

  addNoteForm = new FormGroup({
    highlightedNote: new FormControl(""),
    noteText: new FormControl("", [Validators.required]),
  });

  messageForm = new FormGroup({
    selectedMessage: new FormControl(""),
    message: new FormControl("", [Validators.required]),
  });
  updateMessageForm = new FormGroup({
    message: new FormControl("", [Validators.required]),
  });
  addBaselineNoteForm = new FormGroup({
    highlightedNote: new FormControl(""),
    noteText: new FormControl("", [Validators.required]),
  });

  addBodyNoteForm = new FormGroup({
    highlightedNote: new FormControl(""),
    noteText: new FormControl("", [Validators.required]),
  });

  description = new FormGroup({
    Text: new FormControl("", [Validators.required]),
  });

  description2 = new FormGroup({
    Text2: new FormControl("", [Validators.required]),
  });

  memberId = new FormControl("");
  memId = null;
  members = [];
  member_id = "";
  futureAppointments = [];
  futureAppointmentsData: any;
  futureAppointsCompleteData = {};
  file_name: any;
  spinner = false;
  highlightedNotes = [];
  graphLoaded = false;
  previousNotes = [];
  highlightedNotes2 = [];
  user_note;
  previousNotes2 = [];
  highlightedNotes3 = [];
  edit_note1: any;
  edit_note2: any;
  edit_note3: any;
  previousNotes3 = [];
  user_found = false;
  addMemberError = null;
  date_exist = false;
  olddate = null;
  positionNotes: any;
  today: string;
  ugtNote = "";
  lgtNote = "";
  cgtNote = "";
  pgtNote = "";
  vibePlateFocus = "";
  lastBaseline="";
  vibePlateFocusUpdated = "";
  arrows = false;
  coachName = null;
  preWrittenText: any;
  preWrittenMessage: any;
  preWrittenMessageId: any;
  user_required_email = null;
  baseline_count = 0;
  birthday: any;
  appointment_data_time: any;
  appointment_data_url = "";
  constructor(
    private authService: AuthService,
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}

  showDoctorModal() {
    this.showPopup = true;
  }

  getVibePlateFocus() {
    this.doctorService.getVibePlate(this.memId).subscribe(
      (res) => {
        this.lastBaseline = res.last_baseline;
        this.vibePlateFocus = res.vibe_plate_focus;
        this.vibePlateFocusUpdated = res.vibe_plate_focus;
      },
      (error) => {}
    );
  }
  setVibePlateFocus() {
    this.doctorService
      .updateVibePlate(this.vibePlateFocusUpdated, this.memId)
      .subscribe(
        (res) => {
          this.toastr.success("Vibe Plate Focus Updated Successfully");
          this.vibePlateFocus = this.vibePlateFocusUpdated;
        },
        (error) => {}
      );
  }

  getCheckInReminder() {
    this.doctorService.getCheckInRemider(this.memId).subscribe((res) => {
      this.checkInReminderNotes = res;
      console.log(res);
    });
  }
  addCheckInNote() {
    this.doctorService.addCheckInNotes(this.memId).subscribe(
      (res) => {
        this.getCheckInReminder();
        if (res.session_notes_count >= this.locationDetails.baseline_reminder) {
          this.getdate();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getMember(email) {
    this.doctorService.getMember(email).subscribe((res) => {
      console.log(res);
      if (res != null) {
        this.addition_boolean = false;
        this.graphLoaded = false;
        this.cleared = true;
        this.date_type = true;
        this.member_id = "";
        this.table_user_id = null;
        this.user_error = null;
        this.updateMemberForm.reset();
        this.baseline_count = 0;
        this.balance_test_val = 0;
        this.x3_bicep_val = 0;
        this.edit_note1 = 0;
        this.edit_note2 = 0;
        this.edit_note3 = 0;
        this.user_found = true;
        this.x3_chest_val = 0;
        this.date_exist = false;
        this.appointment_data_time = {};
        this.appointment_data_url = "";
        this.leg_strength_test_val = 0;
        var memberIndex = res.id;
        this.user_found = true;
        this.user_error = null;
        this.spinner = true;
        this.UserObj = res;
        console.log(this.UserObj);
        this.memId = this.UserObj.id;
        var d = new Date();
        var n = d.getFullYear();
        if (res.note_count >= this.locationDetails.baseline_reminder) {
          this.getdate();
        }
        if (this.UserObj.days_till_birthday != null) {
          if (
            this.UserObj.days_till_birthday == 365 ||
            this.UserObj.days_till_birthday == 366
          ) {
            this.birthday =
              "Today is " + this.UserObj.name.split(" ")[0] + "'s birthday";
          } else {
            this.birthday =
              this.UserObj.days_till_birthday +
              " days until " +
              this.UserObj.name.split(" ")[0] +
              "'s birthday";
          }
        }
        this.updateMemberForm.patchValue(this.UserObj);
        this.memberName = this.UserObj.name;
        this.memberphone = this.UserObj.phone_number;
        this.memberemail = this.UserObj.get_email;
        this.memberId.setValue(this.UserObj.name);
        this.url = this.UserObj.picture;
        this.doctorService.getPositions(this.memId).subscribe(
          (res) => {
            console.log(res);
            this.getPositionNotes();
            this.getNote();
            this.additionInfo(this.UserObj.get_email);
            this.getHighlightedNotes();
            this.getHighlightedNotesBaseline();
            this.getHighlightedNotesBody();
            this.getCheckInReminder();
            this.getNextAppointment();
            this.getQuickTasks();
            this.getMemberDoctors();
            this.getVibePlateFocus();
            this.getPreWrittenText();
            this.positionForm.patchValue({
              ugt_arm: res.ugt_arm,
              ugt_seat: res.ugt_seat,
              lgt_seat: res.lgt_seat,
              lgt_pads: res.lgt_pads,
              cgt_arm: res.cgt_arm,
              cgt_seat: res.cgt_seat,
              pgt_arm: res.pgt_arm,
              pgt_pads_plate: res.pgt_pads_plate,
              coozies: res.coozies,
              yoga: res.yoga,
              ugt_pr: res.ugt_pr,
              lgt_pr: res.lgt_pr,
              cgt_pr: res.cgt_pr,
              pgt_pr: res.pgt_pr,
            });
            this.goal_1_val = Math.round(res.ugt_pr * 0.8).toString();
            this.test_push1 = Math.round(res.ugt_pr / 3).toString();
            this.goal_2_val = Math.round(res.lgt_pr * 0.8).toString();
            this.test_push2 = Math.round(res.lgt_pr / 3).toString();
            this.goal_3_val = Math.round(res.cgt_pr * 0.8).toString();
            this.test_push3 = Math.round(res.cgt_pr / 3).toString();
            this.goal_4_val = Math.round(res.pgt_pr * 0.8).toString();
            this.test_push4 = Math.round(res.pgt_pr / 3).toString();
          },
          (error) => {
            console.log("pos error", error);
          }
        );
        this.getOldValues();
        this.completedTests();
        this.getGoalsDifference();
        this.getAppointmentData();
      } else {
        this.user_error = "User doesn't exist.";
      }
    });
  }
  getMembers() {
    this.doctorService.getMembers().subscribe(
      (res) => {
        this.members = res;
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  getMemberId(id) {
    this.member_id = id;
  }

  delete_member() {
    this.doctorService.deleteMember(this.member_id).subscribe(
      (res) => {
        const i = this.members.findIndex((e) => e.id == this.member_id);
        console.log(i);
        this.members.splice(i, 1);
        this.toastr.error("Member Deleted Successfully");
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setPositionNotes() {
    this.doctorService
      .updatePositionNotes(
        this.ugtNote,
        this.lgtNote,
        this.cgtNote,
        this.pgtNote,
        this.memId
      )
      .subscribe(
        (res) => {
          this.toastr.success("Notes Updated Successfully");
          this.positionNotes.ugt_note = this.ugtNote;
          this.positionNotes.lgt_note = this.lgtNote;
          this.positionNotes.cgt_note = this.cgtNote;
          this.positionNotes.pgt_note = this.pgtNote;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getPositionNotes() {
    this.doctorService.getPositionNotes(this.memId).subscribe(
      (res) => {
        this.positionNotes = res;
        this.ugtNote = res.ugt_note;
        this.lgtNote = res.lgt_note;
        this.cgtNote = res.cgt_note;
        this.pgtNote = res.pgt_note;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addMembers() {
    if (!this.memberForm.valid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    var user = this.memberForm.value;
    user.dob = this.updatedImageFile;
    if (this.formType) {
      this.doctorService.addUser(user).subscribe(
        (res) => {
          this.updatedImageFile = null;
          this.getMembers();
          if (this.imageElement) {
            this.imageElement.value = "";
          }
          $("#exampleModal").modal("hide");
          this.memberForm.reset();
          this.url_profile_image = null
          this.toastr.success("Member Added Successfully");
          this.addMemberError = null;
        },
        (error) => {
          this.updatedImageFile = null;
          this.addMemberError = error.error.Error;
          console.log(error);
        }
      );
    } else {
      this.doctorService.addCoach(user).subscribe(
        (res) => {
          this.getMembers();
          if (this.imageElement) {
            this.imageElement.value = "";
          }
          $("#exampleModal").modal("hide");
          this.memberForm.reset();
          this.toastr.success("Coach Added Successfully");
        },
        (error) => {
          this.addMemberError = error.error.Error;
          console.log(error);
        }
      );
    }
  }
  success_count = 0;

  getNextAppointment() {
    this.doctorService.getNextAppointmentDate(this.memId).subscribe(
      (res) => {
        console.log(res);
        if (res.datetime) {
          this.appointment_data_time = res;
        } else {
          this.appointment_data_url = res.acuity_url;
        }
      },
      (error) => {
        console.log(error);
        this.spinner = false;
      }
    );
  }

  addPosture(event) {
    var img = event.target.files[0];
    const that = this;
    that.spinner = true;
    new Compressor(img, {
      quality: 0.4,
      success(result) {
        that.doctorService.addPosture(that.memId, result).subscribe(
          (res) => {
            console.log(result);
            that.spinner = false;
            that.success_count++;
          },
          (error) => {
            console.log(error);
          }
        );
      },
    });
    var timer = setInterval(function () {
      if (that.success_count > 0) {
        that.toastr.success("Posture Picture Added Successfully");
        that.success_count = 0;
        that.refreshPosturePics.emit(true);
        clearInterval(timer);
      }
    }, 200);
  }

  quickTaskValue(e) {
    if (e.target.value != "0") {
      this.doctorService.getUserActiveCampaign(this.memId).subscribe(
        (res) => {
          if (res.message == "User doesn't exist") {
            $("#activeCampaign").modal("show");
            this.modalName = "quickTask";
            this.selectQuickTaskVal = e.target.value;
          } else {
            $("#quickTask").modal("show");
            this.selectQuickTaskVal = e.target.value;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }

    const selectEl = e.target;
    this.selectQuickTaskId =
      selectEl.options[selectEl.selectedIndex].getAttribute("data-id");
  }

  addActiveCampaign() {
    const obj = {
      email: this.UserObj.get_email,
      firstName: this.UserObj.get_first_name,
      lastName: this.UserObj.get_last_name,
      phone: this.UserObj.phone_number,
    };
    this.doctorService.addActiveCampaign(obj).subscribe(
      (res) => {
        this.toastr.success("User Successfully added in Active Campaign.");
        if (this.modalName !== "") {
          $(`#${this.modalName}`).modal("show");
          this.modalName = "";
        } else {
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  messageChange(e) {
    const selectVal = e.target;
    if (
      selectVal.options[selectVal.selectedIndex].getAttribute("data-message") !=
      "0"
    ) {
      this.messageForm.patchValue({
        message:
          selectVal.options[selectVal.selectedIndex].getAttribute(
            "data-message"
          ),
      });
    }
  }

  add_message_submit() {
    if (!this.updateMessageForm.valid) {
      this.submitted = true;
      return;
    }
    this.spinner = true;
    this.submitted = false;
    this.doctorService
      .createMessage(this.updateMessageForm.value.message)
      .subscribe(
        (res) => {
          if (res[0]) {
            this.updateMessageForm.reset();
            this.toastr.success("Message Created Successfully");
            $("#addMessage").modal("hide");
            this.getPreWrittenText();
            this.spinner = false;
          }
        },
        (error) => {
          console.log(error);
          this.spinner = false;
        }
      );
  }

  update_message_form(message, id) {
    console.log(message);
    this.updateMessageForm.patchValue({
      message: message,
    });
    this.preWrittenMessageId = id;
  }
  update_message_submit() {
    if (!this.updateMessageForm.valid) {
      this.submitted = true;
      return;
    }
    this.spinner = true;
    this.submitted = false;
    this.doctorService
      .updateMessage(
        this.updateMessageForm.value.message,
        this.preWrittenMessageId
      )
      .subscribe(
        (res) => {
          if (res) {
            this.updateMessageForm.reset();
            this.toastr.success("Message Updated Successfully");
            $("#updateMessage").modal("hide");
            this.getPreWrittenText();
            this.spinner = false;
          }
        },
        (error) => {
          console.log(error);
          this.spinner = false;
        }
      );
  }
  message_submit() {
    if (!this.messageForm.valid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    this.spinner = true;
    let obj = {
      to: this.UserObj.phone_number,
      body: this.messageForm.value.message,
    };
    this.doctorService.sendPreWrittenText(obj).subscribe(
      (res) => {
        this.toastr.success("Message Sent Successfully");
        this.spinner = false;
        $("#message").modal("hide");
      },
      (error) => {
        if (error.status === 500) {
          this.toastr.error(
            `Unable to send  text to ${this.UserObj.phone_number}. Please check the phone number.`
          );
        }
        this.spinner = false;
      }
    );
  }

  addQuickTask() {
    var obj = {
      field: parseInt(this.selectQuickTaskId),
      value: this.selectQuickTaskVal,
    };
    this.doctorService.postQuickTasks(obj, this.memId).subscribe((res) => {
      res.res_status
        ? (this.toastr.success(
            `Quick Task for "${this.selectQuickTaskVal}" was successful.`
          ),
          ((<HTMLInputElement>(
            document.querySelector("#quickTaskSelect")
          )).value = "0"))
        : "";
    });
  }
  getQuickTasks() {
    this.doctorService.getQuickTasks(this.memId).subscribe(
      (res) => {
        this.quickTasks = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Pr1_value(item) {
    console.log(item.target.value);
    var num = item.target.value * 0.8;
    this.goal_1_val = Math.round(num).toString();
    this.test_push1 = Math.round(item.target.value / 3).toString();
  }

  Pr2_value(item) {
    var num = item.target.value * 0.8;
    this.goal_2_val = Math.round(num).toString();
    this.test_push2 = Math.round(item.target.value / 3).toString();
  }

  Pr3_value(item) {
    var num = item.target.value * 0.8;
    this.goal_3_val = Math.round(num).toString();
    this.test_push3 = Math.round(item.target.value / 3).toString();
  }

  Pr4_value(item) {
    var num = item.target.value * 0.8;
    this.goal_4_val = Math.round(num).toString();
    this.test_push4 = Math.round(item.target.value / 3).toString();
  }

  updateUser() {
    if (!this.updateMemberForm.valid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    let data = this.updateMemberForm.value;
    if ((<HTMLInputElement>document.querySelector("#user_role")).checked) {
      data.role = "coach";
    } else {
      data.role = "member";
    }
    data.id = this.UserObj.id;

    this.spinner = true;
    data.note_count = this.update_note_count;
    if (this.updatedImageFile) {
      console.log("testing image");
      const that = this;
      data.picture = this.updatedImageFile;
      new Compressor(data.picture, {
        quality: 0.4,
        success(result) {
          console.log("pic", result);
          data.picture = result;
          that.doctorService.updateUser(data).subscribe(
            (res) => {
              that.UserObj = res;
              that.updatedImageFile = null;
              that.spinner = false;
              data.picture = null;
              that.UserObj.picture = that.url;
              that.updateMemberForm.reset();
              that.imageElement.value = "";
              (<HTMLInputElement>(
                document.querySelector("#image_cropper_changer")
              )).value = "";
              that.getMembers();
              that.toastr.success("Member Updated Successfully");
              $("#Update").modal("hide");
            },
            (error) => {
              this.updatedImageFile = null;
              console.log(error);
              data.picture = null;
              that.spinner = false;
            }
          );
        },
      });
    } else {
      this.doctorService.updateUser(data).subscribe(
        (res) => {
          this.UserObj = res;
          this.updateMemberForm.reset();
          if (this.imageElement) {
            this.imageElement.value = "";
          }
          this.spinner = false;
          (<HTMLInputElement>(
            document.querySelector("#image_cropper_changer")
          )).value = "";
          this.getMembers();
          this.toastr.success("Member Updated Successfully");
          $("#Update").modal("hide");
        },
        (error) => {
          this.spinner = false;
          console.log(error);
        }
      );
    }
  }

  memberName = "";
  memberphone = "";
  memberemail = "";

  getPositions(event) {
    this.spinner = true;
    this.memId = event.option.value;
    var memberIndex = this.members.findIndex((x) => x.id == this.memId);
    var temp_user = this.members[memberIndex];
    this.router.navigate(["/user/" + temp_user.get_email]);
    this.getMember(temp_user.get_email);
  }
  getAppointmentData() {
    const time = moment()
      .tz(this.locationDetails.time_zone)
      .format()
      .split("T")[0];
    this.doctorService.getAppointmentData(this.memId, time).subscribe((res) => {
      this.appointment = res;
      console.log(this.appointment);
    });
  }
  updateAppointmentLabel() {
    console.log("----updating appointment label");
    this.doctorService
      .updateAppointmentLabel(this.memId, this.appointment)
      .subscribe(
        (res) => {
          console.log(res);
          this.appointment = false;
          this.toastr.success("Successfully Checked in");
          (<HTMLInputElement>document.querySelector("#pills-pain-tab")).click();
          this.addCheckInNote();
        },
        (error) => {
          console.log(error);
          this.toastr.error(error.error);
        }
      );
  }

  createNew(type) {
    (<HTMLInputElement>document.querySelector("#menuToggle>input")).checked =
      false;
    this.formType = type;
    this.updatedImageFile = null;
    this.memberForm.reset();
    if (type) {
      this.formTitle = "Register a new user";
      this.formBtn = "Add Member Now";
    } else {
      this.formTitle = "Register a new coach";
      this.formBtn = "Add Coach Now";
    }
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.file_name = event.target.files[0];
      console.log(this.file_name);
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = reader.result;
      };
    }
  }

  getNote() {
    var memberId = this.memId;
    this.doctorService.getUserNote(memberId).subscribe((res) => {
      this.user_note = res.text;
      if (this.user_note != null) {
        this.description.patchValue({
          Text: res.text,
        });
        this.showNote1Btn = res.text;
      } else {
        this.description.patchValue({
          Text: "",
        });
        this.showNote1Btn = "";
      }
    });
  }
  clear_field() {
    this.input.nativeElement.value = "";
    this.cleared = false;
  }

  chartsData(e) {
    this.refreshGraphs.emit(true);
  }
  graphsData(e) {
    this.graphLoaded = true;
  }
  update_form() {
    var form = this.description.value;
    var memberId = this.memId;
    this.doctorService.UpdateUserNote(form, memberId).subscribe((res) => {
      this.toastr.success("Updated");
      this.showNote1Btn = this.description.value.Text;
    });
  }

  getUpdatedSessionNotes(item) {
    this.getHighlightedNotes();
  }
  update_form2() {
    var form = this.description2.value;
    var memberId = this.memId;
    this.doctorService.UpdateUserNote2(form, memberId).subscribe((res) => {
      this.showNote2Btn = this.description2.value.Text2;
      this.toastr.success("Updated");
    });
  }
  completedTests() {
    var memberId = this.memId;
    this.doctorService.getLatestBaseLine(memberId).subscribe((res) => {
      this.leg_strength_test_val = res.leg_strength_test;
      this.balance_test_val = res.single_leg_balance_test;
      this.x3_chest_val = res.x3_chest_press;
      this.x3_bicep_val = res.x3_bicep_curl;
      console.log(res);
    });
  }

  getLocationDetails() {
    this.doctorService.getLocationDetails().subscribe(
      (res) => {
        this.locationDetails = res;
        this.x3_form_show = this.locationDetails.x3_chest_and_bicep_flag;
        this.btracks_form_show = this.locationDetails.b_tracks_flag;
        if (res.iframe_url) {
          this.url_iframe = this.sanitizer.bypassSecurityTrustResourceUrl(
            res.iframe_url
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updatePositions() {
    var positions = this.positionForm.value;
    var memberId = this.memId;

    this.doctorService.updatePosition(positions, memberId).subscribe(
      (res) => {
        this.getHighlightedNotes();
        this.toastr.success("Positions Updated Successfully");
      },
      (error) => {
        console.log("Positions Update Error: ", error.error.Error);
      }
    );
  }

  delete_1() {
    this.doctorService
      .deleteNote("general", this.highlighted_note_id_1)
      .subscribe((res) => {
        this.toastr.error("Note Successfully Deleted");
        this.getHighlightedNotes();
        this.getPreviousNotes();
      });
  }
  modalIframeShow() {
    $("#iframe").modal("show");
  }
  previous_delete_1() {
    this.doctorService
      .deletePreviousNote("general", this.previous_note_id_1)
      .subscribe((res) => {
        this.toastr.error("Note Successfully Deleted");
        this.getHighlightedNotes();
        this.getPreviousNotes();
      });
  }

  delete_2() {
    this.doctorService
      .deleteNote("baseline", this.highlighted_note_id_2)
      .subscribe((res) => {
        this.toastr.error("Note Successfully Deleted");
        this.getHighlightedNotesBaseline();
      });
  }

  previous_delete_2() {
    this.doctorService
      .deletePreviousNote("baseline", this.previous_note_id_2)
      .subscribe((res) => {
        this.toastr.error("Note Successfully Deleted");
        this.getPreviousNotesBaseline();
      });
  }

  delete_3() {
    this.doctorService
      .deleteNote("body", this.highlighted_note_id_3)
      .subscribe((res) => {
        this.toastr.error("Note Successfully Deleted");
        this.getHighlightedNotesBody();
      });
  }

  previous_delete_3() {
    this.doctorService
      .deletePreviousNote("body", this.previous_note_id_3)
      .subscribe((res) => {
        this.toastr.error("Note Successfully Deleted");
        this.getPreviousNotesBody();
      });
  }
  addNewNote() {
    var note = this.addNoteForm.value;
    var id = this.memId;
    this.addNoteForm.reset();
    this.doctorService.addNote(note, id).subscribe(
      (res) => {
        this.getPreviousNotes();
        // this.previousNotes.unshift(res);
        if (res.highlighted == true) {
          this.highlightedNotes.unshift(res);
        }
        // this.addNoteForm.value.highlightedNote = false,
        this.toastr.success("Note Added Successfully");

        //this.addNoteForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get appointmentFormData(): { [key: string]: AbstractControl } {
    return this.addAppointmentMemberForm.controls;
  }
  get memberFormData(): { [key: string]: AbstractControl } {
    return this.memberForm.controls;
  }

  get updateMemberFormData(): { [key: string]: AbstractControl } {
    return this.updateMemberForm.controls;
  }
  addNewBaselineNote() {
    var note = this.addBaselineNoteForm.value;
    var id = this.memId;
    this.addBaselineNoteForm.reset();
    this.doctorService.addBaselineNote(note, id).subscribe(
      (res) => {
        console.log(res);
        this.previousNotes2.unshift(res);
        if (res.highlighted == true) {
          this.highlightedNotes2.unshift(res);
        }
        // this.addNoteForm.value.highlightedNote = false,
        this.toastr.success("Note Added Successfully");

        //this.addNoteForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addNewBodyNote() {
    var note = this.addBodyNoteForm.value;
    var id = this.memId;
    this.addBodyNoteForm.reset();
    this.doctorService.addBodyNote(note, id).subscribe(
      (res) => {
        console.log(res);
        this.previousNotes3.unshift(res);
        if (res.highlighted == true) {
          this.highlightedNotes3.unshift(res);
        }
        // this.addNoteForm.value.highlightedNote = false,
        this.toastr.success("Note Added Successfully");

        //this.addNoteForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getdate() {
    var id = this.memId;
    this.doctorService.getLatestBaseLine(id).subscribe(
      (res) => {
        console.log(res);
        if (res.baseline_created) {
          this.date_type = true;
          this.olddate = res.baseline_created;
        } else {
          this.date_type = false;
          this.olddate = "never";
        }
        this.date_exist = true;
      },
      (error) => {
        this.date_exist = false;
        // console.log(error)
      }
    );
  }

  getHighlightedNotes() {
    var id = this.memId;

    this.doctorService.getHighlightedNotes(id).subscribe(
      (res) => {
        this.getPreviousNotes();
        this.highlightedNotes = res;
        console.log(res);
      },
      (error) => {
        console.log("Previous Notes Error: ", error);
      }
    );
  }

  getHighlightedNotesBaseline() {
    var id = this.memId;

    this.doctorService.getHighlightedNotesBaseline(id).subscribe(
      (res) => {
        this.getPreviousNotesBaseline();

        this.highlightedNotes2 = res;
      },
      (error) => {
        console.log("Previous Notes Error: ", error);
      }
    );
  }

  getHighlightedNotesBody() {
    var id = this.memId;

    this.doctorService.getHighlightedNotesBody(id).subscribe(
      (res) => {
        this.getPreviousNotesBody();

        this.highlightedNotes3 = res;
      },
      (error) => {
        console.log("Previous Notes Error: ", error);
      }
    );
  }
  getPreviousNotes() {
    var id = this.memId;
    this.doctorService.getPreviousNotes(id).subscribe(
      (res) => {
        this.spinner = false;
        this.previousNotes = res;
      },
      (error) => {
        console.log("highlighted Notes Error: ", error);
      }
    );
  }

  additionInfo(Email) {
    this.doctorService.getAdditionalNote(Email).subscribe((res) => {
      this.addition_info = res;
      if (res.notes_from_ac) {
        this.description2.patchValue({
          Text2: res.notes_from_ac,
        });
        this.showNote2Btn = res.notes_from_ac;
      } else {
        this.description2.patchValue({
          Text2: "",
        });
        this.showNote2Btn = "";
      }
      if (Object.keys(res).length > 0) {
        this.addition_boolean = true;
      }
    });
  }

  getPreviousNotesBaseline() {
    var id = this.memId;
    this.doctorService.getPreviousNotesBaseline(id).subscribe(
      (res) => {
        this.spinner = false;
        this.previousNotes2 = res;
      },
      (error) => {
        console.log("highlighted Notes Error: ", error);
      }
    );
  }

  getPreviousNotesBody() {
    var id = this.memId;
    this.doctorService.getPreviousNotesBody(id).subscribe(
      (res) => {
        this.spinner = false;
        this.previousNotes3 = res;
      },
      (error) => {
        console.log("highlighted Notes Error: ", error);
      }
    );
  }
  restrictNumeric(e) {
    if (e.target.value >= 0 && e.target.value <= 10) {
      return true;
    }
    e.target.value = 0;
  }
  logout(e): void {
    // if(e.which ==13||e.which ==1){
    //   return
    // }
    console.log(e.which);
    this.toastr.success("Logout Successfully");
    this.authService.logout();
  }

  // Second Tab...

  baseLineForm = new FormGroup({
    height: new FormControl("48.0"),
    weight: new FormControl(0),
    left_grip: new FormControl(0),
    right_grip: new FormControl(0),
    leg_strength_test: new FormControl(0),
    leg_strength_test_reps: new FormControl(0),
    single_leg_balance_test: new FormControl(0),
    single_leg_balance_test_left: new FormControl(0),
    single_leg_balance_test_right: new FormControl(0),
    x3_chest_press: new FormControl(0),
    x3_chest_press_reps: new FormControl(0),
    x3_bicep_curl: new FormControl(0),
    x3_bicep_curl_reps: new FormControl(0),
    hip: new FormControl(0),
    waist: new FormControl(0),
    hip_waist_ratio: new FormControl(0),
    body_fat_perc: new FormControl(0),
    lean_mass: new FormControl(0),
    fat_mass: new FormControl(0),
    b_tracks: new FormControl(0),
    date: new FormControl(""),
  });
  baseLineForm2 = new FormGroup({
    right_neck_front: new FormControl(0),
    left_neck_front: new FormControl(0),
    right_shoulder_front: new FormControl(0),
    left_shoulder_front: new FormControl(0),
    right_elbow_front: new FormControl(0),
    left_elbow_front: new FormControl(0),
    right_hand_front: new FormControl(0),
    left_hand_front: new FormControl(0),
    right_hip_front: new FormControl(0),
    left_hip_front: new FormControl(0),
    right_knee_front: new FormControl(0),
    left_knee_front: new FormControl(0),
    right_ankle_front: new FormControl(0),
    left_ankle_front: new FormControl(0),
    bottom_right_foot: new FormControl(0),
    bottom_left_foot: new FormControl(0),
    right_neck_back: new FormControl(0),
    left_neck_back: new FormControl(0),
    right_shoulder_back: new FormControl(0),
    left_shoulder_back: new FormControl(0),
    right_elbow_back: new FormControl(0),
    left_elbow_back: new FormControl(0),
    right_hand_back: new FormControl(0),
    left_hand_back: new FormControl(0),
    right_hip_back: new FormControl(0),
    left_hip_back: new FormControl(0),
    right_knee_back: new FormControl(0),
    left_knee_back: new FormControl(0),
    right_ankle_back: new FormControl(0),
    left_ankle_back: new FormControl(0),
    date: new FormControl(""),
  });

  waistCalculate() {
    let waist = this.baseLineForm.value.waist;
    let hip = this.baseLineForm.value.hip;
    let totalRatio;
    if (waist > 0 && hip > 0) {
      totalRatio = (+waist / +hip).toFixed(2);
      this.baseLineForm.patchValue({
        hip_waist_ratio: totalRatio,
      });
    }
  }

  fatCalculate() {
    if (this.locationDetails && this.locationDetails.weight_management_flag) {
      let bodyFat = this.baseLineForm.value.body_fat_perc;
      let weight = this.baseLineForm.value.weight;
      let fat;
      fat = ((bodyFat / 100) * weight).toFixed(2);
      if (bodyFat > 0 && weight > 0) {
        this.baseLineForm.patchValue({
          fat_mass: fat,
        });
        this.baseLineForm.patchValue({
          lean_mass: weight - fat,
        });
      }
    }
  }
  hipCalculate() {
    if (this.locationDetails && this.locationDetails.weight_management_flag) {
      let waist = this.baseLineForm.value.waist;
      let hip = this.baseLineForm.value.hip;
      let totalRatio;
      if (waist > 0 && hip > 0) {
        totalRatio = (+waist / +hip).toFixed(2);
        this.baseLineForm.patchValue({
          hip_waist_ratio: totalRatio,
        });
      }
    }
  }

  getOldValues() {
    var id = this.memId;
    var baseLine = this.baseLineForm.value;
    this.doctorService.getLatestBaseLine(id).subscribe((res) => {
      this.baseLineForm.patchValue({
        height:
          res.height !== 0
            ? res.height % 1 == 0
              ? res.height + ".0"
              : res.height
            : "48.0",
        weight: res.weight ? res.weight : 0,
        b_tracks:
          this.locationDetails && this.locationDetails.b_tracks_flag
            ? res.b_tracks
              ? res.b_tracks
              : 0
            : "",
        waist:
          this.locationDetails && this.locationDetails.weight_management_flag
            ? res.waist
              ? res.waist
              : 0
            : "",
        hip:
          this.locationDetails && this.locationDetails.weight_management_flag
            ? res.hip
              ? res.hip
              : 0
            : "",
        hip_waist_ratio:
          this.locationDetails && this.locationDetails.weight_management_flag
            ? res.hip_waist_ratio
              ? res.hip_waist_ratio
              : 0
            : "",
        body_fat_perc:
          this.locationDetails && this.locationDetails.weight_management_flag
            ? res.body_fat_perc
              ? res.body_fat_perc
              : 0
            : "",
        fat_mass:
          this.locationDetails && this.locationDetails.weight_management_flag
            ? res.fat_mass
              ? res.fat_mass
              : 0
            : "",
        lean_mass:
          this.locationDetails && this.locationDetails.weight_management_flag
            ? res.lean_mass
              ? res.lean_mass
              : 0
            : "",
        left_grip: res.left_grip ? res.left_grip : 0,
        right_grip: res.right_grip ? res.right_grip : 0,
        leg_strength_test: res.leg_strength_test ? res.leg_strength_test : 0,
        leg_strength_test_reps: res.leg_strength_test_reps
          ? res.leg_strength_test_reps
          : 0,
        single_leg_balance_test: res.single_leg_balance_test
          ? res.single_leg_balance_test
          : 0,
        single_leg_balance_test_left: res.single_leg_balance_test_left
          ? res.single_leg_balance_test_left
          : 0,
        single_leg_balance_test_right: res.single_leg_balance_test_right
          ? res.single_leg_balance_test_right
          : 0,
        x3_chest_press:
          this.locationDetails && this.locationDetails.x3_chest_and_bicep_flag
            ? res.x3_chest_press
              ? res.x3_chest_press
              : 0
            : "",
        x3_chest_press_reps:
          this.locationDetails && this.locationDetails.x3_chest_and_bicep_flag
            ? res.x3_chest_press_reps
              ? res.x3_chest_press_reps
              : 0
            : "",
        x3_bicep_curl:
          this.locationDetails && this.locationDetails.x3_chest_and_bicep_flag
            ? res.x3_bicep_curl
              ? res.x3_bicep_curl
              : 0
            : "",
        x3_bicep_curl_reps:
          this.locationDetails && this.locationDetails.x3_chest_and_bicep_flag
            ? res.x3_bicep_curl_reps
              ? res.x3_bicep_curl_reps
              : 0
            : "",
      });
      this.baselineFormTempValues = { ...this.baseLineForm.value };
      this.showBaselineFormButton = true;
      this.baseLineForm2.patchValue({
        right_neck_front: res.right_neck_front ? res.right_neck_front : 0,
        left_neck_front: res.left_neck_front ? res.left_neck_front : 0,
        right_shoulder_front: res.right_shoulder_front
          ? res.right_shoulder_front
          : 0,
        left_shoulder_front: res.left_shoulder_front
          ? res.left_shoulder_front
          : 0,
        right_hand_front: res.right_hand_front ? res.right_hand_front : 0,
        left_hand_front: res.left_hand_front ? res.left_hand_front : 0,
        right_hip_front: res.right_hip_front ? res.right_hip_front : 0,
        left_hip_front: res.left_hip_front ? res.left_hip_front : 0,
        right_knee_front: res.right_knee_front ? res.right_knee_front : 0,
        left_knee_front: res.left_knee_front ? res.left_knee_front : 0,
        right_ankle_front: res.right_ankle_front ? res.right_ankle_front : 0,
        left_ankle_front: res.left_ankle_front ? res.left_ankle_front : 0,
        bottom_right_foot: res.bottom_right_foot ? res.bottom_right_foot : 0,
        bottom_left_foot: res.bottom_left_foot ? res.bottom_left_foot : 0,
        right_neck_back: res.right_neck_back ? res.right_neck_back : 0,
        left_neck_back: res.left_neck_back ? res.left_neck_back : 0,
        right_shoulder_back: res.right_shoulder_back
          ? res.right_shoulder_back
          : 0,
        left_shoulder_back: res.left_shoulder_back ? res.left_shoulder_back : 0,
        right_elbow_back: res.right_elbow_back ? res.right_elbow_back : 0,
        left_elbow_back: res.left_elbow_back ? res.left_elbow_back : 0,
        right_hand_back: res.right_hand_back ? res.right_hand_back : 0,
        left_hand_back: res.left_hand_back ? res.left_hand_back : 0,
        right_knee_back: res.right_knee_back ? res.right_knee_back : 0,
        left_knee_back: res.left_knee_back ? res.left_knee_back : 0,
        right_ankle_back: res.right_ankle_back ? res.right_ankle_back : 0,
        left_ankle_back: res.left_ankle_back ? res.left_ankle_back : 0,
      });
    });
  }

  addBaseLineEntry() {
    var id = this.memId;
    var baseLine = this.baseLineForm.value;
    this.showBaselineFormButton = true;
    this.doctorService.addBaseLineEntry(baseLine, id).subscribe(
      (res) => {
        this.baselineFormTempValues = { ...baseLine };
        this.completedTests();
        this.toastr.success("Baseline Added Successfully");
        this.getVibePlateFocus();
        this.getHighlightedNotesBaseline();
        // get baseline chart data after new data add
        this.refreshGraphs.emit(true);
        (<HTMLInputElement>(
          document.querySelector("#pills-contact-tab")
        )).click();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      (error) => {
        this.showBaselineFormButton = false;
        console.log("baseline: ", error);
      }
    );
  }

  addBodyEntry() {
    var id = this.memId;
    var baseLine = this.baseLineForm2.value;
    this.doctorService.addBodyEntry(baseLine, id).subscribe(
      (res) => {
        console.log(res);
        this.completedTests();
        this.toastr.success("Body Progress Updated");
        //get body chard data
        this.refreshGraphs.emit(true);
        this.getHighlightedNotesBody();
        (<HTMLInputElement>document.querySelector("#pills-home-tab")).click();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      (error) => {
        console.log("body: ", error);
      }
    );
  }

  // thid tab
  goalForm = new FormGroup({
    height: new FormControl(""),
    height_symbol: new FormControl(""),
    b_tracks: new FormControl(""),
    b_tracks_symbol: new FormControl(""),
    hip: new FormControl(""),
    hip_symbol: new FormControl(""),
    waist: new FormControl(""),
    waist_symbol: new FormControl(""),
    hip_waist_ratio: new FormControl(""),
    hip_waist_ratio_symbol: new FormControl(""),
    body_fat_perc: new FormControl(""),
    body_fat_perc_symbol: new FormControl(""),
    fat_mass: new FormControl(""),
    fat_mass_symbol: new FormControl(""),
    lean_mass: new FormControl(""),
    lean_mass_symbol: new FormControl(""),
    weight: new FormControl(""),
    weight_symbol: new FormControl(""),
    left_grip: new FormControl(""),
    left_grip_symbol: new FormControl(""),
    right_grip: new FormControl(""),
    right_grip_symbol: new FormControl(""),
    leg_strength_test: new FormControl(0),
    leg_strength_test_reps: new FormControl(""),
    leg_strength_test_reps_symbol: new FormControl(""),
    single_leg_balance_test: new FormControl(0),
    single_leg_balance_test_left: new FormControl(""),
    single_leg_balance_test_left_symbol: new FormControl(""),
    single_leg_balance_test_right: new FormControl(0),
    single_leg_balance_test_right_symbol: new FormControl(""),
    x3_chest_press: new FormControl(0),
    x3_chest_press_reps: new FormControl(""),
    x3_chest_press_reps_symbol: new FormControl(""),
    x3_bicep_curl: new FormControl(0),
    x3_bicep_curl_reps: new FormControl(""),
    x3_bicep_curl_reps_symbol: new FormControl(""),
    chest_press_band: new FormControl(0),
    chest_press_band_symbol: new FormControl(""),
    chest_press_reps: new FormControl(0),
    chest_press_reps_symbol: new FormControl(""),
    chest_press_partials: new FormControl(0),
    chest_press_partials_symbol: new FormControl(""),
    squat_band: new FormControl(0),
    squat_band_symbol: new FormControl(""),
    squat_reps: new FormControl(0),
    squat_reps_symbol: new FormControl(""),
    squat_partials: new FormControl(0),
    squat_partials_symbol: new FormControl(""),
    overhead_press_band: new FormControl(0),
    overhead_press_band_symbol: new FormControl(""),
    overhead_press_reps: new FormControl(0),
    overhead_press_reps_symbol: new FormControl(""),
    overhead_press_partials: new FormControl(0),
    overhead_press_partials_symbol: new FormControl(""),
    tricep_push_band: new FormControl(0),
    tricep_push_band_symbol: new FormControl(""),
    tricep_push_reps: new FormControl(0),
    tricep_push_reps_symbol: new FormControl(""),
    tricep_push_partials: new FormControl(0),
    tricep_push_partials_symbol: new FormControl(""),
    chest_flys_band: new FormControl(0),
    chest_flys_band_symbol: new FormControl(""),
    chest_flys_reps: new FormControl(0),
    chest_flys_reps_symbol: new FormControl(""),
    chest_flys_partials: new FormControl(0),
    chest_flys_partials_symbol: new FormControl(""),
    dead_lift_band: new FormControl(0),
    dead_lift_band_symbol: new FormControl(""),
    dead_lift_reps: new FormControl(0),
    dead_lift_reps_symbol: new FormControl(""),
    dead_lift_partials: new FormControl(0),
    dead_lift_partials_symbol: new FormControl(""),
    bent_row_band: new FormControl(0),
    bent_row_band_symbol: new FormControl(""),
    bent_row_reps: new FormControl(0),
    bent_row_reps_symbol: new FormControl(""),
    bent_row_partials: new FormControl(0),
    bent_row_partials_symbol: new FormControl(""),
    bicep_curl_band: new FormControl(0),
    bicep_curl_band_symbol: new FormControl(""),
    bicep_curl_reps: new FormControl(0),
    bicep_curl_reps_symbol: new FormControl(""),
    bicep_curl_partials: new FormControl(0),
    bicep_curl_partials_symbol: new FormControl(""),
    calf_raise_band: new FormControl(0),
    calf_raise_band_symbol: new FormControl(""),
    calf_raise_reps: new FormControl(0),
    calf_raise_reps_symbol: new FormControl(""),
    calf_raise_partials: new FormControl(0),
    calf_raise_partials_symbol: new FormControl(""),
    right_neck_front: new FormControl(0),
    right_neck_front_symbol: new FormControl(0),
    left_neck_front: new FormControl(0),
    left_neck_front_symbol: new FormControl(0),
    right_shoulder_front: new FormControl(0),
    right_shoulder_front_symbol: new FormControl(0),
    left_shoulder_front: new FormControl(0),
    left_shoulder_front_symbol: new FormControl(0),
    right_elbow_front: new FormControl(0),
    right_elbow_front_symbol: new FormControl(0),
    left_elbow_front: new FormControl(0),
    left_elbow_front_symbol: new FormControl(0),
    right_hand_front: new FormControl(0),
    right_hand_front_symbol: new FormControl(0),
    left_hand_front: new FormControl(0),
    left_hand_front_symbol: new FormControl(0),
    right_hip_front: new FormControl(0),
    right_hip_front_symbol: new FormControl(0),
    left_hip_front: new FormControl(0),
    left_hip_front_symbol: new FormControl(0),
    right_knee_front: new FormControl(0),
    right_knee_front_symbol: new FormControl(0),
    left_knee_front: new FormControl(0),
    left_knee_front_symbol: new FormControl(0),
    right_ankle_front: new FormControl(0),
    right_ankle_front_symbol: new FormControl(0),
    left_ankle_front: new FormControl(0),
    left_ankle_front_symbol: new FormControl(0),
    bottom_right_foot: new FormControl(0),
    bottom_right_foot_symbol: new FormControl(0),
    bottom_left_foot: new FormControl(0),
    bottom_left_foot_symbol: new FormControl(0),
    right_neck_back: new FormControl(0),
    right_neck_back_symbol: new FormControl(0),
    left_neck_back: new FormControl(0),
    left_neck_back_symbol: new FormControl(0),
    right_shoulder_back: new FormControl(0),
    right_shoulder_back_symbol: new FormControl(0),
    left_shoulder_back: new FormControl(0),
    left_shoulder_back_symbol: new FormControl(0),
    right_elbow_back: new FormControl(0),
    right_elbow_back_symbol: new FormControl(0),
    left_elbow_back: new FormControl(0),
    left_elbow_back_symbol: new FormControl(0),
    right_hand_back: new FormControl(0),
    right_hand_back_symbol: new FormControl(0),
    left_hand_back: new FormControl(0),
    right_hip_back: new FormControl(0),
    right_hip_back_symbol: new FormControl(0),
    left_hip_back: new FormControl(0),
    left_hip_back_symbol: new FormControl(0),
    right_knee_back: new FormControl(0),
    right_knee_back_symbol: new FormControl(0),
    left_knee_back: new FormControl(0),
    left_knee_back_symbol: new FormControl(0),
    right_ankle_back: new FormControl(0),
    right_ankle_back_symbol: new FormControl(0),
    left_ankle_back: new FormControl(0),
    left_ankle_back_symbol: new FormControl(0),
  });
  latestTraining = {
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
  latestBaseLine = {
    height: null,
    weight: null,
    b_tracks: null,
    fat_mass: null,
    lean_mass: null,
    body_fat_perc: null,
    hip: null,
    waist: null,
    hip_waist_ratio: null,
    left_grip: null,
    right_grip: null,
    leg_strength_test: null,
    leg_strength_test_reps: null,
    single_leg_balance_test: null,
    single_leg_balance_test_left: null,
    single_leg_balance_test_right: null,
    x3_chest_press: null,
    x3_chest_press_reps: null,
    x3_bicep_curl: null,
    x3_bicep_curl_reps: null,
    right_neck_front: null,
    left_neck_front: null,
    right_shoulder_front: null,
    left_shoulder_front: null,
    right_elbow_front: null,
    left_elbow_front: null,
    right_hand_front: null,
    left_hand_front: null,
    right_hip_front: null,
    left_hip_front: null,
    right_knee_front: null,
    left_knee_front: null,
    right_ankle_front: null,
    left_ankle_front: null,
    bottom_right_foot: null,
    bottom_left_foot: null,
    right_neck_back: null,
    left_neck_back: null,
    right_shoulder_back: null,
    left_shoulder_back: null,
    right_elbow_back: null,
    left_elbow_back: null,
    right_hand_back: null,
    left_hand_back: null,
    right_hip_back: null,
    left_hip_back: null,
    right_knee_back: null,
    left_knee_back: null,
    right_ankle_back: null,
    left_ankle_back: null,
  };
  oldTraining = this.latestTraining;
  oldBaseLine = this.latestBaseLine;
  goalsDifference = this.latestBaseLine;
  reportingValues = this.latestBaseLine;
  arrowsValues = {
    height_symbol: "undefined",
    weight_symbol: "undefined",
    b_tracks_symbol: "undefined",
    body_fat_perc_symbol: "undefined",
    lean_mass_symbol: "undefined",
    fat_mass_symbol: "undefined",
    hip_symbol: "undefined",
    waist_symbol: "undefined",
    hip_waist_ratio_symbol: "undefined",
    left_grip_symbol: "undefined",
    right_grip_symbol: "undefined",
    leg_strength_test_reps_symbol: "undefined",
    single_leg_balance_test_left_symbol: "undefined",
    single_leg_balance_test_right_symbol: "undefined",
    x3_chest_press_reps_symbol: "undefined",
    x3_bicep_curl_reps_symbol: "undefined",
    chest_press_band_symbol: "undefined",
    chest_press_reps_symbol: "undefined",
    chest_press_partials_symbol: "undefined",
    squat_band_symbol: "undefined",
    squat_reps_symbol: "undefined",
    squat_partials_symbol: "undefined",
    overhead_press_band_symbol: "undefined",
    overhead_press_reps_symbol: "undefined",
    overhead_press_partials_symbol: "undefined",
    tricep_push_band_symbol: "undefined",
    tricep_push_reps_symbol: "undefined",
    tricep_push_partials_symbol: "undefined",
    chest_flys_band_symbol: "undefined",
    chest_flys_reps_symbol: "undefined",
    chest_flys_partials_symbol: "undefined",
    dead_lift_band_symbol: "undefined",
    dead_lift_reps_symbol: "undefined",
    dead_lift_partials_symbol: "undefined",
    bent_row_band_symbol: "undefined",
    bent_row_reps_symbol: "undefined",
    bent_row_partials_symbol: "undefined",
    bicep_curl_band_symbol: "undefined",
    bicep_curl_reps_symbol: "undefined",
    bicep_curl_partials_symbol: "undefined",
    calf_raise_band_symbol: "undefined",
    calf_raise_reps_symbol: "undefined",
    calf_raise_partials_symbol: "undefined",
  };
  setGoals() {
    var id = this.memId;
    console.log(this.oldBaseLine, this.latestBaseLine);
    var goalForm = this.goalForm.value;
    var lat_height = goalForm.height - this.latestBaseLine.height;
    var old_height = goalForm.height - this.oldBaseLine.height;
    if (goalForm.height > 0) {
      if (lat_height > old_height) {
        this.arrowsValues.height_symbol = "false";
        this.goalForm.patchValue({
          height_symbol: "false",
        });
      } else if (lat_height < old_height) {
        this.arrowsValues.height_symbol = "true";
        this.goalForm.patchValue({
          height_symbol: "true",
        });
      } else {
        this.arrowsValues.height_symbol = "undefined";
        this.goalForm.patchValue({
          height_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.height_symbol = "undefined";
      this.goalForm.patchValue({
        height_symbol: "undefined",
      });
    }
    var lat_weight = goalForm.weight - this.latestBaseLine.weight;
    var old_weight = goalForm.weight - this.oldBaseLine.weight;
    if (goalForm.weight > 0) {
      if (lat_weight > old_weight) {
        this.arrowsValues.weight_symbol = "false";
        this.goalForm.patchValue({
          weight_symbol: "false",
        });
      } else if (lat_weight < old_weight) {
        this.arrowsValues.weight_symbol = "true";
        this.goalForm.patchValue({
          weight_symbol: "true",
        });
      } else {
        this.arrowsValues.weight_symbol = "undefined";
        this.goalForm.patchValue({
          weight_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.weight_symbol = "undefined";
      this.goalForm.patchValue({
        weight_symbol: "undefined",
      });
    }
    var lat_b_tracks = goalForm.b_tracks - this.latestBaseLine.b_tracks;
    var old_b_tracks = goalForm.b_tracks - this.oldBaseLine.b_tracks;
    if (goalForm.b_tracks > 0) {
      if (lat_b_tracks > old_b_tracks) {
        this.arrowsValues.b_tracks_symbol = "false";
        this.goalForm.patchValue({
          b_tracks_symbol: "false",
        });
      } else if (lat_b_tracks < old_b_tracks) {
        this.arrowsValues.b_tracks_symbol = "true";
        this.goalForm.patchValue({
          b_tracks_symbol: "true",
        });
      } else {
        this.arrowsValues.b_tracks_symbol = "undefined";
        this.goalForm.patchValue({
          b_tracks_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.b_tracks_symbol = "undefined";
      this.goalForm.patchValue({
        b_tracks_symbol: "undefined",
      });
    }

    var lat_hip_test = goalForm.hip - this.latestBaseLine.hip;
    var old_hip_test = goalForm.hip - this.oldBaseLine.hip;
    if (goalForm.hip > 0) {
      if (lat_hip_test > old_hip_test) {
        this.arrowsValues.hip_symbol = "false";
        this.goalForm.patchValue({
          hip_symbol: "false",
        });
      } else if (lat_hip_test < old_hip_test) {
        this.arrowsValues.hip_symbol = "true";
        this.goalForm.patchValue({
          hip_symbol: "true",
        });
      } else {
        this.arrowsValues.hip_symbol = "undefined";
        this.goalForm.patchValue({
          hip_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.hip_symbol = "undefined";
      this.goalForm.patchValue({
        hip_symbol: "undefined",
      });
    }

    var lat_waist_test = goalForm.waist - this.latestBaseLine.waist;
    var old_waist_test = goalForm.waist - this.oldBaseLine.waist;
    if (goalForm.waist > 0) {
      if (lat_waist_test > old_waist_test) {
        this.arrowsValues.waist_symbol = "false";
        this.goalForm.patchValue({
          waist_symbol: "false",
        });
      } else if (lat_waist_test < old_waist_test) {
        this.arrowsValues.waist_symbol = "true";
        this.goalForm.patchValue({
          waist_symbol: "true",
        });
      } else {
        this.arrowsValues.waist_symbol = "undefined";
        this.goalForm.patchValue({
          waist_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.waist_symbol = "undefined";
      this.goalForm.patchValue({
        waist_symbol: "undefined",
      });
    }

    var lat_totalRatio_test =
      goalForm.hip_waist_ratio - this.latestBaseLine.hip_waist_ratio;
    var old_totalRatio_test =
      goalForm.hip_waist_ratio - this.oldBaseLine.hip_waist_ratio;
    if (goalForm.hip_waist_ratio > 0) {
      if (lat_totalRatio_test > old_totalRatio_test) {
        this.arrowsValues.hip_waist_ratio_symbol = "false";
        this.goalForm.patchValue({
          hip_waist_ratio_symbol: "false",
        });
      } else if (lat_totalRatio_test < old_totalRatio_test) {
        this.arrowsValues.hip_waist_ratio_symbol = "true";
        this.goalForm.patchValue({
          hip_waist_ratio_symbol: "true",
        });
      } else {
        this.arrowsValues.hip_waist_ratio_symbol = "undefined";
        this.goalForm.patchValue({
          hip_waist_ratio_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.hip_waist_ratio_symbol = "undefined";
      this.goalForm.patchValue({
        hip_waist_ratio_symbol: "undefined",
      });
    }

    var lat_body_fat =
      goalForm.body_fat_perc - this.latestBaseLine.body_fat_perc;
    var old_body_fat = goalForm.body_fat_perc - this.oldBaseLine.body_fat_perc;
    if (goalForm.body_fat_perc > 0) {
      if (lat_body_fat > old_body_fat) {
        this.arrowsValues.body_fat_perc_symbol = "false";
        this.goalForm.patchValue({
          body_fat_perc_symbol: "false",
        });
      } else if (lat_body_fat < old_body_fat) {
        this.arrowsValues.body_fat_perc_symbol = "true";
        this.goalForm.patchValue({
          body_fat_perc_symbol: "true",
        });
      } else {
        this.arrowsValues.body_fat_perc_symbol = "undefined";
        this.goalForm.patchValue({
          body_fat_perc_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.body_fat_perc_symbol = "undefined";
      this.goalForm.patchValue({
        body_fat_perc_symbol: "undefined",
      });
    }

    var lat_fat_mass = goalForm.fat_mass - this.latestBaseLine.fat_mass;
    var old_fat_mass = goalForm.fat_mass - this.oldBaseLine.fat_mass;
    if (goalForm.fat_mass > 0) {
      if (lat_fat_mass > old_fat_mass) {
        this.arrowsValues.fat_mass_symbol = "false";
        this.goalForm.patchValue({
          fat_mass_symbol: "false",
        });
      } else if (lat_fat_mass < old_fat_mass) {
        this.arrowsValues.fat_mass_symbol = "true";
        this.goalForm.patchValue({
          fat_mass_symbol: "true",
        });
      } else {
        this.arrowsValues.fat_mass_symbol = "undefined";
        this.goalForm.patchValue({
          fat_mass_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.fat_mass_symbol = "undefined";
      this.goalForm.patchValue({
        fat_mass_symbol: "undefined",
      });
    }

    var lat_lean_mass = goalForm.lean_mass - this.latestBaseLine.lean_mass;
    var old_lean_mass = goalForm.lean_mass - this.oldBaseLine.lean_mass;
    if (goalForm.lean_mass > 0) {
      if (lat_lean_mass > old_lean_mass) {
        this.arrowsValues.lean_mass_symbol = "false";
        this.goalForm.patchValue({
          lean_mass_symbol: "false",
        });
      } else if (lat_lean_mass < old_lean_mass) {
        this.arrowsValues.lean_mass_symbol = "true";
        this.goalForm.patchValue({
          lean_mass_symbol: "true",
        });
      } else {
        this.arrowsValues.lean_mass_symbol = "undefined";
        this.goalForm.patchValue({
          lean_mass_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.lean_mass_symbol = "undefined";
      this.goalForm.patchValue({
        lean_mass_symbol: "undefined",
      });
    }

    var lat_left_grip = goalForm.left_grip - this.latestBaseLine.left_grip;
    var old_left_grip = goalForm.left_grip - this.oldBaseLine.left_grip;
    if (goalForm.left_grip > 0) {
      if (lat_left_grip > old_left_grip) {
        this.arrowsValues.left_grip_symbol = "false";
        this.goalForm.patchValue({
          left_grip_symbol: "false",
        });
      } else if (lat_left_grip < old_left_grip) {
        this.arrowsValues.left_grip_symbol = "true";
        this.goalForm.patchValue({
          left_grip_symbol: "true",
        });
      } else {
        this.arrowsValues.left_grip_symbol = "undefined";
        this.goalForm.patchValue({
          left_grip_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.left_grip_symbol = "undefined";
      this.goalForm.patchValue({
        left_grip_symbol: "undefined",
      });
    }
    var lat_right_grip = goalForm.right_grip - this.latestBaseLine.right_grip;
    var old_right_grip = goalForm.right_grip - this.oldBaseLine.right_grip;
    if (goalForm.right_grip > 0) {
      if (lat_right_grip > old_right_grip) {
        this.arrowsValues.right_grip_symbol = "false";
        this.goalForm.patchValue({
          right_grip_symbol: "false",
        });
      } else if (lat_right_grip < old_right_grip) {
        this.arrowsValues.right_grip_symbol = "true";
        this.goalForm.patchValue({
          right_grip_symbol: "true",
        });
      } else {
        this.arrowsValues.right_grip_symbol = "undefined";
        this.goalForm.patchValue({
          right_grip_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.right_grip_symbol = "undefined";
      this.goalForm.patchValue({
        right_grip_symbol: "undefined",
      });
    }

    var lat_leg_strength_test_reps =
      goalForm.leg_strength_test_reps -
      this.latestBaseLine.leg_strength_test_reps;
    var old_leg_strength_test_reps =
      goalForm.leg_strength_test_reps - this.oldBaseLine.leg_strength_test_reps;
    if (goalForm.leg_strength_test_reps > 0) {
      if (lat_leg_strength_test_reps > old_leg_strength_test_reps) {
        this.arrowsValues.leg_strength_test_reps_symbol = "false";
        this.goalForm.patchValue({
          leg_strength_test_reps_symbol: "false",
        });
      } else if (lat_leg_strength_test_reps < old_leg_strength_test_reps) {
        this.arrowsValues.leg_strength_test_reps_symbol = "true";
        this.goalForm.patchValue({
          leg_strength_test_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.leg_strength_test_reps_symbol = "undefined";
        this.goalForm.patchValue({
          leg_strength_test_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.leg_strength_test_reps_symbol = "undefined";
      this.goalForm.patchValue({
        leg_strength_test_reps_symbol: "undefined",
      });
    }
    var lat_single_leg_balance_test_left =
      goalForm.single_leg_balance_test_left -
      this.latestBaseLine.single_leg_balance_test_left;
    var old_single_leg_balance_test_left =
      goalForm.single_leg_balance_test_left -
      this.oldBaseLine.single_leg_balance_test_left;
    if (goalForm.single_leg_balance_test_left > 0) {
      if (lat_single_leg_balance_test_left > old_single_leg_balance_test_left) {
        this.arrowsValues.single_leg_balance_test_left_symbol = "false";
        this.goalForm.patchValue({
          single_leg_balance_test_left_symbol: "false",
        });
      } else if (
        lat_single_leg_balance_test_left < old_single_leg_balance_test_left
      ) {
        this.arrowsValues.single_leg_balance_test_left_symbol = "true";
        this.goalForm.patchValue({
          single_leg_balance_test_left_symbol: "true",
        });
      } else {
        this.arrowsValues.single_leg_balance_test_left_symbol = "undefined";
        this.goalForm.patchValue({
          single_leg_balance_test_left_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.single_leg_balance_test_left_symbol = "undefined";
      this.goalForm.patchValue({
        single_leg_balance_test_left_symbol: "undefined",
      });
    }
    var lat_single_leg_balance_test_right =
      goalForm.single_leg_balance_test_left -
      this.latestBaseLine.single_leg_balance_test_right;
    var old_single_leg_balance_test_right =
      goalForm.single_leg_balance_test_left -
      this.oldBaseLine.single_leg_balance_test_right;
    if (goalForm.single_leg_balance_test_left > 0) {
      if (
        lat_single_leg_balance_test_right > old_single_leg_balance_test_right
      ) {
        this.arrowsValues.single_leg_balance_test_right_symbol = "false";
        this.goalForm.patchValue({
          single_leg_balance_test_right_symbol: "false",
        });
      } else if (
        lat_single_leg_balance_test_right < old_single_leg_balance_test_right
      ) {
        this.arrowsValues.single_leg_balance_test_right_symbol = "true";
        this.goalForm.patchValue({
          single_leg_balance_test_right_symbol: "true",
        });
      } else {
        this.arrowsValues.single_leg_balance_test_right_symbol = "undefined";
        this.goalForm.patchValue({
          single_leg_balance_test_right_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.single_leg_balance_test_right_symbol = "undefined";
      this.goalForm.patchValue({
        single_leg_balance_test_right_symbol: "undefined",
      });
    }
    var lat_x3_chest_press_reps =
      goalForm.x3_chest_press_reps - this.latestBaseLine.x3_chest_press_reps;
    var old_x3_chest_press_reps =
      goalForm.x3_chest_press_reps - this.oldBaseLine.x3_chest_press_reps;
    if (goalForm.x3_chest_press_reps > 0) {
      if (lat_x3_chest_press_reps > old_x3_chest_press_reps) {
        this.arrowsValues.x3_chest_press_reps_symbol = "false";
        this.goalForm.patchValue({
          x3_chest_press_reps_symbol: "false",
        });
      } else if (lat_x3_chest_press_reps < old_x3_chest_press_reps) {
        this.arrowsValues.x3_chest_press_reps_symbol = "true";
        this.goalForm.patchValue({
          x3_chest_press_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.x3_chest_press_reps_symbol = "undefined";
        this.goalForm.patchValue({
          x3_chest_press_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.x3_chest_press_reps_symbol = "undefined";
      this.goalForm.patchValue({
        x3_chest_press_reps_symbol: "undefined",
      });
    }
    var lat_x3_bicep_curl_reps =
      goalForm.x3_bicep_curl_reps - this.latestBaseLine.x3_bicep_curl_reps;
    var old_x3_bicep_curl_reps =
      goalForm.x3_bicep_curl_reps - this.oldBaseLine.x3_bicep_curl_reps;
    if (goalForm.x3_bicep_curl_reps > 0) {
      if (lat_x3_bicep_curl_reps > old_x3_bicep_curl_reps) {
        this.arrowsValues.x3_bicep_curl_reps_symbol = "false";
        this.goalForm.patchValue({
          x3_bicep_curl_reps_symbol: "false",
        });
      } else if (lat_x3_bicep_curl_reps < old_x3_bicep_curl_reps) {
        this.arrowsValues.x3_bicep_curl_reps_symbol = "true";
        this.goalForm.patchValue({
          x3_bicep_curl_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.x3_bicep_curl_reps_symbol = "undefined";
        this.goalForm.patchValue({
          x3_bicep_curl_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.x3_bicep_curl_reps_symbol = "undefined";
      this.goalForm.patchValue({
        x3_bicep_curl_reps_symbol: "undefined",
      });
    }

    var lat_chest_press_band =
      goalForm.chest_press_band - this.latestTraining.chest_press_band;
    var old_chest_press_band =
      goalForm.chest_press_band - this.oldTraining.chest_press_band;
    if (goalForm.chest_press_band > 0) {
      if (lat_chest_press_band > old_chest_press_band) {
        this.arrowsValues.chest_press_band_symbol = "false";
        this.goalForm.patchValue({
          chest_press_band_symbol: "false",
        });
      } else if (lat_chest_press_band < old_chest_press_band) {
        this.arrowsValues.chest_press_band_symbol = "true";
        this.goalForm.patchValue({
          chest_press_band_symbol: "true",
        });
      } else {
        this.arrowsValues.chest_press_band_symbol = "undefined";
        this.goalForm.patchValue({
          chest_press_band_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.chest_press_band_symbol = "undefined";
      this.goalForm.patchValue({
        chest_press_band_symbol: "undefined",
      });
    }

    var lat_chest_press_reps =
      goalForm.chest_press_reps - this.latestTraining.chest_press_reps;
    var old_chest_press_reps =
      goalForm.chest_press_reps - this.oldTraining.chest_press_reps;
    if (goalForm.chest_press_reps > 0) {
      if (lat_chest_press_reps > old_chest_press_reps) {
        this.arrowsValues.chest_press_reps_symbol = "false";
        this.goalForm.patchValue({
          chest_press_reps_symbol: "false",
        });
      } else if (lat_chest_press_reps < old_chest_press_reps) {
        this.arrowsValues.chest_press_reps_symbol = "true";
        this.goalForm.patchValue({
          chest_press_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.chest_press_reps_symbol = "undefined";
        this.goalForm.patchValue({
          chest_press_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.chest_press_reps_symbol = "undefined";
      this.goalForm.patchValue({
        chest_press_reps_symbol: "undefined",
      });
    }

    var lat_chest_press_partials =
      goalForm.chest_press_partials - this.latestTraining.chest_press_partials;
    var old_chest_press_partials =
      goalForm.chest_press_partials - this.oldTraining.chest_press_partials;
    if (goalForm.chest_press_partials > 0) {
      if (lat_chest_press_partials > old_chest_press_partials) {
        this.arrowsValues.chest_press_partials_symbol = "false";
        this.goalForm.patchValue({
          chest_press_partials_symbol: "false",
        });
      } else if (lat_chest_press_partials < old_chest_press_partials) {
        this.arrowsValues.chest_press_partials_symbol = "true";
        this.goalForm.patchValue({
          chest_press_partials_symbol: "true",
        });
      } else {
        this.arrowsValues.chest_press_partials_symbol = "undefined";
        this.goalForm.patchValue({
          chest_press_partials_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.chest_press_partials_symbol = "undefined";
      this.goalForm.patchValue({
        chest_press_partials_symbol: "undefined",
      });
    }

    var lat_squat_band = goalForm.squat_band - this.latestTraining.squat_band;
    var old_squat_band = goalForm.squat_band - this.oldTraining.squat_band;
    if (goalForm.squat_band > 0) {
      if (lat_squat_band > old_squat_band) {
        this.arrowsValues.squat_band_symbol = "false";
        this.goalForm.patchValue({
          squat_band_symbol: "false",
        });
      } else if (lat_squat_band < old_squat_band) {
        this.arrowsValues.squat_band_symbol = "true";
        this.goalForm.patchValue({
          squat_band_symbol: "true",
        });
      } else {
        this.arrowsValues.squat_band_symbol = "undefined";
        this.goalForm.patchValue({
          squat_band_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.squat_band_symbol = "undefined";
      this.goalForm.patchValue({
        squat_band_symbol: "undefined",
      });
    }

    var lat_squat_reps = goalForm.squat_reps - this.latestTraining.squat_reps;
    var old_squat_reps = goalForm.squat_reps - this.oldTraining.squat_reps;
    if (goalForm.squat_reps > 0) {
      if (lat_squat_reps > old_squat_reps) {
        this.arrowsValues.squat_reps_symbol = "false";
        this.goalForm.patchValue({
          chest_squat_reps_symbol: "false",
        });
      } else if (lat_squat_reps < old_squat_reps) {
        this.arrowsValues.squat_reps_symbol = "true";
        this.goalForm.patchValue({
          squat_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.squat_reps_symbol = "undefined";
        this.goalForm.patchValue({
          squat_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.squat_reps_symbol = "undefined";
      this.goalForm.patchValue({
        squat_reps_symbol: "undefined",
      });
    }

    var lat_squat_partials =
      goalForm.squat_partials - this.latestTraining.squat_partials;
    var old_squat_partials =
      goalForm.squat_partials - this.oldTraining.squat_partials;
    if (goalForm.squat_partials > 0) {
      if (lat_squat_partials > old_squat_partials) {
        this.arrowsValues.squat_partials_symbol = "false";
        this.goalForm.patchValue({
          squat_partials_symbol: "false",
        });
      } else if (lat_squat_partials < old_squat_partials) {
        this.arrowsValues.squat_partials_symbol = "true";
        this.goalForm.patchValue({
          squat_partials_symbol: "true",
        });
      } else {
        this.arrowsValues.squat_partials_symbol = "undefined";
        this.goalForm.patchValue({
          squat_partials_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.squat_partials_symbol = "undefined";
      this.goalForm.patchValue({
        squat_partials_symbol: "undefined",
      });
    }

    var lat_overhead_press_band =
      goalForm.overhead_press_band - this.latestTraining.overhead_press_band;
    var old_overhead_press_band =
      goalForm.overhead_press_band - this.oldTraining.overhead_press_band;
    if (goalForm.overhead_press_band > 0) {
      if (lat_overhead_press_band > old_overhead_press_band) {
        this.arrowsValues.overhead_press_band_symbol = "false";
        this.goalForm.patchValue({
          overhead_press_band_symbol: "false",
        });
      } else if (lat_overhead_press_band < old_overhead_press_band) {
        this.arrowsValues.overhead_press_band_symbol = "true";
        this.goalForm.patchValue({
          overhead_press_band_symbol: "true",
        });
      } else {
        this.arrowsValues.overhead_press_band_symbol = "undefined";
        this.goalForm.patchValue({
          overhead_press_band_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.overhead_press_band_symbol = "undefined";
      this.goalForm.patchValue({
        overhead_press_band_symbol: "undefined",
      });
    }

    var lat_overhead_press_reps =
      goalForm.overhead_press_reps - this.latestTraining.overhead_press_reps;
    var old_overhead_press_reps =
      goalForm.overhead_press_reps - this.oldTraining.overhead_press_reps;
    if (goalForm.overhead_press_reps > 0) {
      if (lat_overhead_press_reps > old_overhead_press_reps) {
        this.arrowsValues.overhead_press_reps_symbol = "false";
        this.goalForm.patchValue({
          overhead_press_reps_symbol: "false",
        });
      } else if (lat_overhead_press_reps < old_overhead_press_reps) {
        this.arrowsValues.overhead_press_reps_symbol = "true";
        this.goalForm.patchValue({
          overhead_press_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.overhead_press_reps_symbol = "undefined";
        this.goalForm.patchValue({
          overhead_press_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.overhead_press_reps_symbol = "undefined";
      this.goalForm.patchValue({
        overhead_press_reps_symbol: "undefined",
      });
    }

    var lat_overhead_press_partials =
      goalForm.overhead_press_partials -
      this.latestTraining.overhead_press_partials;
    var old_overhead_press_partials =
      goalForm.squat_partials - this.oldTraining.overhead_press_partials;
    if (goalForm.overhead_press_partials > 0) {
      if (lat_overhead_press_partials > old_overhead_press_partials) {
        this.arrowsValues.overhead_press_partials_symbol = "false";
        this.goalForm.patchValue({
          overhead_press_partials_symbol: "false",
        });
      } else if (lat_overhead_press_partials < old_overhead_press_partials) {
        this.arrowsValues.overhead_press_partials_symbol = "true";
        this.goalForm.patchValue({
          overhead_press_partials_symbol: "true",
        });
      } else {
        this.arrowsValues.overhead_press_partials_symbol = "undefined";
        this.goalForm.patchValue({
          overhead_press_partials_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.overhead_press_partials_symbol = "undefined";
      this.goalForm.patchValue({
        overhead_press_partials_symbol: "undefined",
      });
    }

    var lat_tricep_push_band =
      goalForm.tricep_push_band - this.latestTraining.tricep_push_band;
    var old_tricep_push_band =
      goalForm.tricep_push_band - this.oldTraining.tricep_push_band;
    if (goalForm.tricep_push_band > 0) {
      if (lat_tricep_push_band > old_tricep_push_band) {
        this.arrowsValues.tricep_push_band_symbol = "false";
        this.goalForm.patchValue({
          tricep_push_band_symbol: "false",
        });
      } else if (lat_tricep_push_band < old_tricep_push_band) {
        this.arrowsValues.tricep_push_band_symbol = "true";
        this.goalForm.patchValue({
          tricep_push_band_symbol: "true",
        });
      } else {
        this.arrowsValues.tricep_push_band_symbol = "undefined";
        this.goalForm.patchValue({
          tricep_push_band_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.tricep_push_band_symbol = "undefined";
      this.goalForm.patchValue({
        tricep_push_band_symbol: "undefined",
      });
    }

    var lat_tricep_push_reps =
      goalForm.tricep_push_reps - this.latestTraining.tricep_push_reps;
    var old_tricep_push_reps =
      goalForm.tricep_push_reps - this.oldTraining.tricep_push_reps;
    if (goalForm.tricep_push_reps > 0) {
      if (lat_tricep_push_reps > old_tricep_push_reps) {
        this.arrowsValues.tricep_push_reps_symbol = "false";
        this.goalForm.patchValue({
          tricep_push_reps_symbol: "false",
        });
      } else if (lat_tricep_push_reps < old_tricep_push_reps) {
        this.arrowsValues.tricep_push_reps_symbol = "true";
        this.goalForm.patchValue({
          tricep_push_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.tricep_push_reps_symbol = "undefined";
        this.goalForm.patchValue({
          tricep_push_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.tricep_push_reps_symbol = "undefined";
      this.goalForm.patchValue({
        tricep_push_reps_symbol: "undefined",
      });
    }

    var lat_tricep_push_partials =
      goalForm.tricep_push_partials - this.latestTraining.tricep_push_partials;
    var old_tricep_push_partials =
      goalForm.tricep_push_partials - this.oldTraining.tricep_push_partials;
    if (goalForm.tricep_push_partials > 0) {
      if (lat_tricep_push_partials > old_tricep_push_partials) {
        this.arrowsValues.tricep_push_partials_symbol = "false";
        this.goalForm.patchValue({
          tricep_push_partials_symbol: "false",
        });
      } else if (lat_tricep_push_partials < old_tricep_push_partials) {
        this.arrowsValues.tricep_push_partials_symbol = "true";
        this.goalForm.patchValue({
          tricep_push_partials_symbol: "true",
        });
      } else {
        this.arrowsValues.tricep_push_partials_symbol = "undefined";
        this.goalForm.patchValue({
          tricep_push_partials_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.tricep_push_partials_symbol = "undefined";
      this.goalForm.patchValue({
        tricep_push_partials_symbol: "undefined",
      });
    }

    var lat_chest_flys_band =
      goalForm.chest_flys_band - this.latestTraining.chest_flys_band;
    var old_chest_flys_band =
      goalForm.chest_flys_band - this.oldTraining.chest_flys_band;
    if (goalForm.chest_flys_band > 0) {
      if (lat_chest_flys_band > old_chest_flys_band) {
        this.arrowsValues.chest_flys_band_symbol = "false";
        this.goalForm.patchValue({
          chest_flys_band_symbol: "false",
        });
      } else if (lat_chest_flys_band < old_chest_flys_band) {
        this.arrowsValues.chest_flys_band_symbol = "true";
        this.goalForm.patchValue({
          chest_flys_band_symbol: "true",
        });
      } else {
        this.arrowsValues.chest_flys_band_symbol = "undefined";
        this.goalForm.patchValue({
          chest_flys_band_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.chest_flys_band_symbol = "undefined";
      this.goalForm.patchValue({
        chest_flys_band_symbol: "undefined",
      });
    }

    var lat_chest_flys_reps =
      goalForm.chest_flys_reps - this.latestTraining.chest_flys_reps;
    var old_chest_flys_reps =
      goalForm.chest_flys_reps - this.oldTraining.chest_flys_reps;
    if (goalForm.chest_flys_reps > 0) {
      if (lat_chest_flys_reps > old_chest_flys_reps) {
        this.arrowsValues.chest_flys_reps_symbol = "false";
        this.goalForm.patchValue({
          chest_flys_reps_symbol: "false",
        });
      } else if (lat_chest_flys_reps < old_chest_flys_reps) {
        this.arrowsValues.chest_flys_reps_symbol = "true";
        this.goalForm.patchValue({
          chest_flys_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.chest_flys_reps_symbol = "undefined";
        this.goalForm.patchValue({
          chest_flys_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.chest_flys_reps_symbol = "undefined";
      this.goalForm.patchValue({
        chest_flys_reps_symbol: "undefined",
      });
    }

    var lat_chest_flys_partials =
      goalForm.chest_flys_partials - this.latestTraining.chest_flys_partials;
    var old_chest_flys_partials =
      goalForm.chest_flys_partials - this.oldTraining.chest_flys_partials;
    if (goalForm.chest_flys_partials > 0) {
      if (lat_chest_flys_partials > old_chest_flys_partials) {
        this.arrowsValues.chest_flys_partials_symbol = "false";
        this.goalForm.patchValue({
          chest_flys_partials_symbol: "false",
        });
      } else if (lat_chest_flys_partials < old_chest_flys_partials) {
        this.arrowsValues.chest_flys_partials_symbol = "true";
        this.goalForm.patchValue({
          chest_flys_partials_symbol: "true",
        });
      } else {
        this.arrowsValues.chest_flys_partials_symbol = "undefined";
        this.goalForm.patchValue({
          chest_flys_partials_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.chest_flys_partials_symbol = "undefined";
      this.goalForm.patchValue({
        chest_flys_partials_symbol: "undefined",
      });
    }

    var lat_dead_lift_band =
      goalForm.dead_lift_band - this.latestTraining.dead_lift_band;
    var old_dead_lift_band =
      goalForm.dead_lift_band - this.oldTraining.dead_lift_band;
    if (goalForm.dead_lift_band > 0) {
      if (lat_dead_lift_band > old_dead_lift_band) {
        this.arrowsValues.dead_lift_band_symbol = "false";
        this.goalForm.patchValue({
          dead_lift_band_symbol: "false",
        });
      } else if (lat_dead_lift_band < old_dead_lift_band) {
        this.arrowsValues.dead_lift_band_symbol = "true";
        this.goalForm.patchValue({
          dead_lift_band_symbol: "true",
        });
      } else {
        this.arrowsValues.dead_lift_band_symbol = "undefined";
        this.goalForm.patchValue({
          dead_lift_band_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.dead_lift_band_symbol = "undefined";
      this.goalForm.patchValue({
        dead_lift_band_symbol: "undefined",
      });
    }

    var lat_dead_lift_reps =
      goalForm.dead_lift_reps - this.latestTraining.dead_lift_reps;
    var old_dead_lift_reps =
      goalForm.dead_lift_reps - this.oldTraining.dead_lift_reps;
    if (goalForm.dead_lift_reps > 0) {
      if (lat_dead_lift_reps > old_dead_lift_reps) {
        this.arrowsValues.dead_lift_reps_symbol = "false";
        this.goalForm.patchValue({
          dead_lift_reps_symbol: "false",
        });
      } else if (lat_dead_lift_reps < old_dead_lift_reps) {
        this.arrowsValues.dead_lift_reps_symbol = "true";
        this.goalForm.patchValue({
          dead_lift_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.dead_lift_reps_symbol = "undefined";
        this.goalForm.patchValue({
          dead_lift_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.dead_lift_reps_symbol = "undefined";
      this.goalForm.patchValue({
        dead_lift_reps_symbol: "undefined",
      });
    }

    var lat_dead_lift_partials =
      goalForm.dead_lift_partials - this.latestTraining.dead_lift_partials;
    var old_dead_lift_partials =
      goalForm.dead_lift_partials - this.oldTraining.dead_lift_partials;
    if (goalForm.dead_lift_partials > 0) {
      if (lat_dead_lift_partials > old_dead_lift_partials) {
        this.arrowsValues.dead_lift_partials_symbol = "false";
        this.goalForm.patchValue({
          dead_lift_partials_symbol: "false",
        });
      } else if (lat_dead_lift_partials < old_dead_lift_partials) {
        this.arrowsValues.dead_lift_partials_symbol = "true";
        this.goalForm.patchValue({
          dead_lift_partials_symbol: "true",
        });
      } else {
        this.arrowsValues.dead_lift_partials_symbol = "undefined";
        this.goalForm.patchValue({
          dead_lift_partials_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.dead_lift_partials_symbol = "undefined";
      this.goalForm.patchValue({
        dead_lift_partials_symbol: "undefined",
      });
    }

    var lat_bent_row_band =
      goalForm.bent_row_band - this.latestTraining.bent_row_band;
    var old_bent_row_band =
      goalForm.bent_row_band - this.oldTraining.bent_row_band;
    if (goalForm.bent_row_band > 0) {
      if (lat_bent_row_band > old_bent_row_band) {
        this.arrowsValues.bent_row_band_symbol = "false";
        this.goalForm.patchValue({
          bent_row_band_symbol: "false",
        });
      } else if (lat_bent_row_band < old_bent_row_band) {
        this.arrowsValues.bent_row_band_symbol = "true";
        this.goalForm.patchValue({
          bent_row_band_symbol: "true",
        });
      } else {
        this.arrowsValues.bent_row_band_symbol = "undefined";
        this.goalForm.patchValue({
          bent_row_band_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.bent_row_band_symbol = "undefined";
      this.goalForm.patchValue({
        bent_row_band_symbol: "undefined",
      });
    }

    var lat_bent_row_reps =
      goalForm.bent_row_reps - this.latestTraining.bent_row_reps;
    var old_bent_row_reps =
      goalForm.bent_row_reps - this.oldTraining.bent_row_reps;
    if (goalForm.bent_row_reps > 0) {
      if (lat_bent_row_reps > old_bent_row_reps) {
        this.arrowsValues.bent_row_reps_symbol = "false";
        this.goalForm.patchValue({
          bent_row_reps_symbol: "false",
        });
      } else if (lat_bent_row_reps < old_bent_row_reps) {
        this.arrowsValues.bent_row_reps_symbol = "true";
        this.goalForm.patchValue({
          bent_row_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.bent_row_reps_symbol = "undefined";
        this.goalForm.patchValue({
          bent_row_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.bent_row_reps_symbol = "undefined";
      this.goalForm.patchValue({
        bent_row_reps_symbol: "undefined",
      });
    }

    var lat_bent_row_partials =
      goalForm.bent_row_partials - this.latestTraining.bent_row_partials;
    var old_bent_row_partials =
      goalForm.bent_row_partials - this.oldTraining.bent_row_partials;
    if (goalForm.bent_row_partials > 0) {
      if (lat_bent_row_partials > old_bent_row_partials) {
        this.arrowsValues.bent_row_partials_symbol = "false";
        this.goalForm.patchValue({
          bent_row_partials_symbol: "false",
        });
      } else if (lat_bent_row_partials < old_bent_row_partials) {
        this.arrowsValues.bent_row_partials_symbol = "true";
        this.goalForm.patchValue({
          bent_row_partials_symbol: "true",
        });
      } else {
        this.arrowsValues.bent_row_partials_symbol = "undefined";
        this.goalForm.patchValue({
          bent_row_partials_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.bent_row_partials_symbol = "undefined";
      this.goalForm.patchValue({
        bent_row_partials_symbol: "undefined",
      });
    }

    var lat_bicep_curl_band =
      goalForm.bicep_curl_band - this.latestTraining.bicep_curl_band;
    var old_bicep_curl_band =
      goalForm.bicep_curl_band - this.oldTraining.bicep_curl_band;
    if (goalForm.bicep_curl_band > 0) {
      if (lat_bicep_curl_band > old_bicep_curl_band) {
        this.arrowsValues.bicep_curl_band_symbol = "false";
        this.goalForm.patchValue({
          bent_row_band_symbol: "false",
        });
      } else if (lat_bicep_curl_band < old_bicep_curl_band) {
        this.arrowsValues.bicep_curl_band_symbol = "true";
        this.goalForm.patchValue({
          bicep_curl_band_symbol: "true",
        });
      } else {
        this.arrowsValues.bicep_curl_band_symbol = "undefined";
        this.goalForm.patchValue({
          bicep_curl_band_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.bicep_curl_band_symbol = "undefined";
      this.goalForm.patchValue({
        bicep_curl_band_symbol: "undefined",
      });
    }

    var lat_bicep_curl_reps =
      goalForm.bicep_curl_reps - this.latestTraining.bicep_curl_reps;
    var old_bicep_curl_reps =
      goalForm.bicep_curl_reps - this.oldTraining.bicep_curl_reps;
    if (goalForm.bicep_curl_reps > 0) {
      if (lat_bicep_curl_reps > old_bicep_curl_reps) {
        this.arrowsValues.bicep_curl_reps_symbol = "false";
        this.goalForm.patchValue({
          bicep_curl_reps_symbol: "false",
        });
      } else if (lat_bicep_curl_reps < old_bicep_curl_reps) {
        this.arrowsValues.bicep_curl_reps_symbol = "true";
        this.goalForm.patchValue({
          bicep_curl_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.bicep_curl_reps_symbol = "undefined";
        this.goalForm.patchValue({
          bicep_curl_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.bicep_curl_reps_symbol = "undefined";
      this.goalForm.patchValue({
        bicep_curl_reps_symbol: "undefined",
      });
    }

    var lat_bicep_curl_partials =
      goalForm.bicep_curl_partials - this.latestTraining.bicep_curl_partials;
    var old_bicep_curl_partials =
      goalForm.bicep_curl_partials - this.oldTraining.bicep_curl_partials;
    if (goalForm.bicep_curl_partials > 0) {
      if (lat_bicep_curl_partials > old_bicep_curl_partials) {
        this.arrowsValues.bicep_curl_partials_symbol = "false";
        this.goalForm.patchValue({
          bicep_curl_partials_symbol: "false",
        });
      } else if (lat_bicep_curl_partials < old_bicep_curl_partials) {
        this.arrowsValues.bicep_curl_partials_symbol = "true";
        this.goalForm.patchValue({
          bicep_curl_partials_symbol: "true",
        });
      } else {
        this.arrowsValues.bicep_curl_partials_symbol = "undefined";
        this.goalForm.patchValue({
          bicep_curl_partials_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.bicep_curl_partials_symbol = "undefined";
      this.goalForm.patchValue({
        bicep_curl_partials_symbol: "undefined",
      });
    }

    var lat_calf_raise_band =
      goalForm.calf_raise_band - this.latestTraining.calf_raise_band;
    var old_calf_raise_band =
      goalForm.calf_raise_band - this.oldTraining.calf_raise_band;
    if (goalForm.calf_raise_band > 0) {
      if (lat_calf_raise_band > old_calf_raise_band) {
        this.arrowsValues.calf_raise_band_symbol = "false";
        this.goalForm.patchValue({
          calf_raise_band_symbol: "false",
        });
      } else if (lat_calf_raise_band < old_calf_raise_band) {
        this.arrowsValues.calf_raise_band_symbol = "true";
        this.goalForm.patchValue({
          calf_raise_band_symbol: "true",
        });
      } else {
        this.arrowsValues.calf_raise_band_symbol = "undefined";
        this.goalForm.patchValue({
          calf_raise_band_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.calf_raise_band_symbol = "undefined";
      this.goalForm.patchValue({
        calf_raise_band_symbol: "undefined",
      });
    }

    var lat_calf_raise_reps =
      goalForm.calf_raise_reps - this.latestTraining.calf_raise_reps;
    var old_calf_raise_reps =
      goalForm.calf_raise_reps - this.oldTraining.calf_raise_reps;
    if (goalForm.calf_raise_reps > 0) {
      if (lat_calf_raise_reps > old_calf_raise_reps) {
        this.arrowsValues.calf_raise_reps_symbol = "false";
        this.goalForm.patchValue({
          calf_raise_reps_symbol: "false",
        });
      } else if (lat_calf_raise_reps < old_calf_raise_reps) {
        this.arrowsValues.calf_raise_reps_symbol = "true";
        this.goalForm.patchValue({
          calf_raise_reps_symbol: "true",
        });
      } else {
        this.arrowsValues.calf_raise_reps_symbol = "undefined";
        this.goalForm.patchValue({
          calf_raise_reps_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.calf_raise_reps_symbol = "undefined";
      this.goalForm.patchValue({
        calf_raise_reps_symbol: "undefined",
      });
    }

    var lat_calf_raise_partials =
      goalForm.calf_raise_partials - this.latestTraining.calf_raise_partials;
    var old_calf_raise_partials =
      goalForm.calf_raise_partials - this.oldTraining.calf_raise_partials;
    if (goalForm.calf_raise_partials > 0) {
      if (lat_calf_raise_partials > old_calf_raise_partials) {
        this.arrowsValues.calf_raise_partials_symbol = "false";
        this.goalForm.patchValue({
          calf_raise_partials_symbol: "false",
        });
      } else if (lat_calf_raise_partials < old_calf_raise_partials) {
        this.arrowsValues.calf_raise_partials_symbol = "true";
        this.goalForm.patchValue({
          calf_raise_partials_symbol: "true",
        });
      } else {
        this.arrowsValues.calf_raise_partials_symbol = "undefined";
        this.goalForm.patchValue({
          calf_raise_partials_symbol: "undefined",
        });
      }
    } else {
      this.arrowsValues.calf_raise_partials_symbol = "undefined";
      this.goalForm.patchValue({
        calf_raise_partials_symbol: "undefined",
      });
    }

    this.arrows = true;
    this.doctorService.setGoals(this.goalForm.value, id).subscribe(
      (res) => {
        console.log(res);
        // this.toastr.success("Goals Updated Successfully")
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getGoalsDifference() {
    var id = this.memId;
    this.doctorService.getGoalsDifference(id).subscribe(
      (goalres) => {
        this.goalsDifference = goalres;
        this.getLatestBaseLine();
        console.log(this.goalsDifference);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLatestBaseLine() {
    var id = this.memId;
    this.doctorService.getLatestBaseLine(id).subscribe(
      (baseres) => {
        this.doctorService.getLatestTraining(id).subscribe((res) => {
          this.latestTraining = baseres;
        });
        this.latestBaseLine = baseres;
        this.baseline_count = baseres.baseline_count;
        console.log(this.latestBaseLine);
        if (
          this.latestBaseLine.height != undefined &&
          this.goalsDifference.height != undefined
        ) {
          this.reportingValues.height =
            this.height_temp_values[this.latestBaseLine.height] +
            " (" +
            (this.goalsDifference.height > 0
              ? "+" + this.goalsDifference.height
              : this.goalsDifference.height) +
            ")";
        } else {
          this.reportingValues.height = "";
        }
        if (
          this.latestBaseLine.weight != undefined &&
          this.goalsDifference.weight != undefined
        ) {
          this.reportingValues.weight =
            this.latestBaseLine.weight +
            " lbs (" +
            (this.goalsDifference.weight > 0
              ? "+" + this.goalsDifference.weight
              : this.goalsDifference.weight) +
            ")";
        } else {
          this.reportingValues.weight = "";
        }

        if (
          this.latestBaseLine.b_tracks != undefined &&
          this.goalsDifference.b_tracks != undefined
        ) {
          this.reportingValues.b_tracks =
            this.latestBaseLine.b_tracks +
            "(" +
            (this.goalsDifference.b_tracks > 0
              ? "+" + this.goalsDifference.b_tracks
              : this.goalsDifference.b_tracks) +
            ")";
        } else {
          this.reportingValues.b_tracks = "";
        }

        if (
          this.latestBaseLine.hip != undefined &&
          this.goalsDifference.hip != undefined
        ) {
          this.reportingValues.hip =
            this.latestBaseLine.hip +
            "(" +
            (this.goalsDifference.hip > 0
              ? "+" + this.goalsDifference.hip
              : this.goalsDifference.hip) +
            ")";
        } else {
          this.reportingValues.hip = "";
        }

        if (
          this.latestBaseLine.waist != undefined &&
          this.goalsDifference.waist != undefined
        ) {
          this.reportingValues.waist =
            this.latestBaseLine.waist +
            "(" +
            (this.goalsDifference.waist > 0
              ? "+" + this.goalsDifference.waist
              : this.goalsDifference.waist) +
            ")";
        } else {
          this.reportingValues.waist = "";
        }

        if (
          this.latestBaseLine.hip_waist_ratio != undefined &&
          this.goalsDifference.hip_waist_ratio != undefined
        ) {
          this.reportingValues.hip_waist_ratio =
            this.latestBaseLine.hip_waist_ratio +
            "(" +
            (this.goalsDifference.hip_waist_ratio > 0
              ? "+" + this.goalsDifference.hip_waist_ratio
              : this.goalsDifference.hip_waist_ratio) +
            ")";
        } else {
          this.reportingValues.hip_waist_ratio = "";
        }

        if (
          this.latestBaseLine.body_fat_perc != undefined &&
          this.goalsDifference.body_fat_perc != undefined
        ) {
          this.reportingValues.body_fat_perc =
            this.latestBaseLine.body_fat_perc +
            "(" +
            (this.goalsDifference.body_fat_perc > 0
              ? "+" + this.goalsDifference.body_fat_perc
              : this.goalsDifference.body_fat_perc) +
            ")";
        } else {
          this.reportingValues.body_fat_perc = "";
        }

        if (
          this.latestBaseLine.lean_mass != undefined &&
          this.goalsDifference.lean_mass != undefined
        ) {
          this.reportingValues.lean_mass =
            this.latestBaseLine.lean_mass +
            "(" +
            (this.goalsDifference.lean_mass > 0
              ? "+" + this.goalsDifference.lean_mass
              : this.goalsDifference.lean_mass) +
            ")";
        } else {
          this.reportingValues.lean_mass = "";
        }

        if (
          this.latestBaseLine.fat_mass != undefined &&
          this.goalsDifference.fat_mass != undefined
        ) {
          this.reportingValues.fat_mass =
            this.latestBaseLine.fat_mass +
            "(" +
            (this.goalsDifference.fat_mass > 0
              ? "+" + this.goalsDifference.fat_mass
              : this.goalsDifference.fat_mass) +
            ")";
        } else {
          this.reportingValues.fat_mass = "";
        }
        if (
          this.latestBaseLine.left_grip != undefined &&
          this.goalsDifference.left_grip != undefined
        ) {
          this.reportingValues.left_grip =
            this.latestBaseLine.left_grip +
            " lbs (" +
            (this.goalsDifference.left_grip > 0
              ? "+" + this.goalsDifference.left_grip
              : this.goalsDifference.left_grip) +
            ")";
        } else {
          this.reportingValues.left_grip = "";
        }

        if (
          this.latestBaseLine.right_grip != undefined &&
          this.goalsDifference.right_grip != undefined
        ) {
          this.reportingValues.right_grip =
            this.latestBaseLine.right_grip +
            " lbs (" +
            (this.goalsDifference.right_grip > 0
              ? "+" + this.goalsDifference.right_grip
              : this.goalsDifference.right_grip) +
            ")";
        } else {
          this.reportingValues.right_grip = "";
        }
        if (
          this.latestBaseLine.leg_strength_test != undefined ||
          this.goalsDifference.leg_strength_test != undefined
        ) {
          this.reportingValues.leg_strength_test =
            this.latestBaseLine.leg_strength_test;
        } else {
          this.reportingValues.leg_strength_test = "";
        }
        if (
          this.latestBaseLine.leg_strength_test_reps != undefined &&
          this.goalsDifference.leg_strength_test_reps != undefined
        ) {
          this.reportingValues.leg_strength_test_reps =
            this.latestBaseLine.leg_strength_test_reps +
            " (" +
            (this.goalsDifference.leg_strength_test_reps > 0
              ? "+" + this.goalsDifference.leg_strength_test_reps
              : this.goalsDifference.leg_strength_test_reps) +
            ")";
        } else {
          this.reportingValues.leg_strength_test_reps = "";
        }

        if (
          this.latestBaseLine.single_leg_balance_test != undefined ||
          this.goalsDifference.single_leg_balance_test != undefined
        ) {
          this.reportingValues.single_leg_balance_test =
            this.latestBaseLine.single_leg_balance_test;
        } else {
          this.reportingValues.single_leg_balance_test = "";
        }
        if (
          this.latestBaseLine.single_leg_balance_test_left != undefined &&
          this.goalsDifference.single_leg_balance_test_left != undefined
        ) {
          this.reportingValues.single_leg_balance_test_left =
            this.latestBaseLine.single_leg_balance_test_left +
            " (" +
            (this.goalsDifference.single_leg_balance_test_left > 0
              ? "+" + this.goalsDifference.single_leg_balance_test_left
              : this.goalsDifference.single_leg_balance_test_left) +
            ")";
        } else {
          this.reportingValues.single_leg_balance_test_left = "";
        }
        if (
          this.latestBaseLine.single_leg_balance_test_right != undefined &&
          this.goalsDifference.single_leg_balance_test_right != undefined
        ) {
          this.reportingValues.single_leg_balance_test_right =
            this.latestBaseLine.single_leg_balance_test_right +
            " (" +
            (this.goalsDifference.single_leg_balance_test_right > 0
              ? "+" + this.goalsDifference.single_leg_balance_test_right
              : this.goalsDifference.single_leg_balance_test_right) +
            ")";
        } else {
          this.reportingValues.single_leg_balance_test_right = "";
        }

        if (
          this.latestBaseLine.x3_chest_press != undefined ||
          this.goalsDifference.x3_chest_press != undefined
        ) {
          this.reportingValues.x3_chest_press =
            this.latestBaseLine.x3_chest_press;
        } else {
          this.reportingValues.x3_chest_press = "";
        }
        if (
          this.latestBaseLine.x3_chest_press_reps != undefined &&
          this.goalsDifference.x3_chest_press_reps != undefined
        ) {
          this.reportingValues.x3_chest_press_reps =
            this.latestBaseLine.x3_chest_press_reps +
            " (" +
            (this.goalsDifference.x3_chest_press_reps > 0
              ? "+" + this.goalsDifference.x3_chest_press_reps
              : this.goalsDifference.x3_chest_press_reps) +
            ")";
        } else {
          this.reportingValues.x3_chest_press_reps = "";
        }

        if (
          this.latestBaseLine.x3_bicep_curl != undefined ||
          this.goalsDifference.x3_bicep_curl != undefined
        ) {
          this.reportingValues.x3_bicep_curl =
            this.latestBaseLine.x3_bicep_curl;
        } else {
          this.reportingValues.x3_bicep_curl = "";
        }
        if (
          this.latestBaseLine.x3_bicep_curl_reps != undefined &&
          this.goalsDifference.x3_bicep_curl_reps != undefined
        ) {
          this.reportingValues.x3_bicep_curl_reps =
            this.latestBaseLine.x3_bicep_curl_reps +
            " (" +
            (this.goalsDifference.x3_bicep_curl_reps > 0
              ? "+" + this.goalsDifference.x3_bicep_curl_reps
              : this.goalsDifference.x3_bicep_curl_reps) +
            ")";
        } else {
          this.reportingValues.x3_bicep_curl_reps = "";
        }

        if (
          this.latestBaseLine.right_neck_front != undefined &&
          this.goalsDifference.right_neck_front != undefined &&
          (this.latestBaseLine.right_neck_front != 0 ||
            this.goalsDifference.right_neck_front != 0)
        ) {
          this.reportingValues.right_neck_front =
            this.latestBaseLine.right_neck_front +
            " (" +
            (this.goalsDifference.right_neck_front > 0
              ? "+" + this.goalsDifference.right_neck_front
              : this.goalsDifference.right_neck_front) +
            ")";
        } else {
          this.reportingValues.right_neck_front = "";
        }
        if (
          this.latestBaseLine.left_neck_front != undefined &&
          this.goalsDifference.left_neck_front != undefined &&
          (this.latestBaseLine.left_neck_front != 0 ||
            this.goalsDifference.left_neck_front != 0)
        ) {
          this.reportingValues.left_neck_front =
            this.latestBaseLine.left_neck_front +
            " (" +
            (this.goalsDifference.left_neck_front > 0
              ? "+" + this.goalsDifference.left_neck_front
              : this.goalsDifference.left_neck_front) +
            ")";
        } else {
          this.reportingValues.left_neck_front = "";
        }
        if (
          this.latestBaseLine.right_shoulder_front != undefined &&
          this.goalsDifference.right_shoulder_front != undefined &&
          (this.latestBaseLine.right_shoulder_front != 0 ||
            this.goalsDifference.right_shoulder_front != 0)
        ) {
          this.reportingValues.right_shoulder_front =
            this.latestBaseLine.right_shoulder_front +
            " (" +
            (this.goalsDifference.right_shoulder_front > 0
              ? "+" + this.goalsDifference.right_shoulder_front
              : this.goalsDifference.right_shoulder_front) +
            ")";
        } else {
          this.reportingValues.right_shoulder_front = "";
        }
        if (
          this.latestBaseLine.left_shoulder_front != undefined &&
          this.goalsDifference.left_shoulder_front != undefined &&
          (this.latestBaseLine.left_shoulder_front != 0 ||
            this.goalsDifference.left_shoulder_front != 0)
        ) {
          this.reportingValues.left_shoulder_front =
            this.latestBaseLine.left_shoulder_front +
            " (" +
            (this.goalsDifference.left_shoulder_front > 0
              ? "+" + this.goalsDifference.left_shoulder_front
              : this.goalsDifference.left_shoulder_front) +
            ")";
        } else {
          this.reportingValues.left_shoulder_front = "";
        }

        if (
          this.latestBaseLine.right_hand_front != undefined &&
          this.goalsDifference.right_hand_front != undefined &&
          (this.latestBaseLine.right_hand_front != 0 ||
            this.goalsDifference.right_hand_front != 0)
        ) {
          this.reportingValues.right_hand_front =
            this.latestBaseLine.right_hand_front +
            " (" +
            (this.goalsDifference.right_hand_front > 0
              ? "+" + this.goalsDifference.right_hand_front
              : this.goalsDifference.right_hand_front) +
            ")";
        } else {
          this.reportingValues.right_hand_front = "";
        }
        if (
          this.latestBaseLine.left_hand_front != undefined &&
          this.goalsDifference.left_hand_front != undefined &&
          (this.latestBaseLine.left_hand_front != 0 ||
            this.goalsDifference.left_hand_front != 0)
        ) {
          this.reportingValues.left_hand_front =
            this.latestBaseLine.left_hand_front +
            " (" +
            (this.goalsDifference.left_hand_front > 0
              ? "+" + this.goalsDifference.left_hand_front
              : this.goalsDifference.left_hand_front) +
            ")";
        } else {
          this.reportingValues.left_hand_front = "";
        }
        if (
          this.latestBaseLine.right_hip_front != undefined &&
          this.goalsDifference.right_hip_front != undefined &&
          (this.latestBaseLine.right_hip_front != 0 ||
            this.goalsDifference.right_hip_front != 0)
        ) {
          this.reportingValues.right_hip_front =
            this.latestBaseLine.right_hip_front +
            " (" +
            (this.goalsDifference.right_hip_front > 0
              ? "+" + this.goalsDifference.right_hip_front
              : this.goalsDifference.right_hip_front) +
            ")";
        } else {
          this.reportingValues.right_hip_front = "";
        }
        if (
          this.latestBaseLine.left_hip_front != undefined &&
          this.goalsDifference.left_hip_front != undefined &&
          (this.latestBaseLine.left_hip_front != 0 ||
            this.goalsDifference.left_hip_front != 0)
        ) {
          this.reportingValues.left_hip_front =
            this.latestBaseLine.left_hip_front +
            " (" +
            (this.goalsDifference.left_hip_front > 0
              ? "+" + this.goalsDifference.left_hip_front
              : this.goalsDifference.left_hip_front) +
            ")";
        } else {
          this.reportingValues.left_hip_front = "";
        }
        if (
          this.latestBaseLine.right_knee_front != undefined &&
          this.goalsDifference.right_knee_front != undefined &&
          (this.latestBaseLine.right_knee_front != 0 ||
            this.goalsDifference.right_knee_front != 0)
        ) {
          this.reportingValues.right_knee_front =
            this.latestBaseLine.right_knee_front +
            " (" +
            (this.goalsDifference.right_knee_front > 0
              ? "+" + this.goalsDifference.right_knee_front
              : this.goalsDifference.right_knee_front) +
            ")";
        } else {
          this.reportingValues.right_knee_front = "";
        }
        if (
          this.latestBaseLine.left_knee_front != undefined &&
          this.goalsDifference.left_knee_front != undefined &&
          (this.latestBaseLine.left_knee_front != 0 ||
            this.goalsDifference.left_knee_front != 0)
        ) {
          this.reportingValues.left_knee_front =
            this.latestBaseLine.left_knee_front +
            " (" +
            (this.goalsDifference.left_knee_front > 0
              ? "+" + this.goalsDifference.left_knee_front
              : this.goalsDifference.left_knee_front) +
            ")";
        } else {
          this.reportingValues.left_knee_front = "";
        }
        if (
          this.latestBaseLine.right_ankle_front != undefined &&
          this.goalsDifference.right_ankle_front != undefined &&
          (this.latestBaseLine.right_ankle_front != 0 ||
            this.goalsDifference.right_ankle_front != 0)
        ) {
          this.reportingValues.right_ankle_front =
            this.latestBaseLine.right_ankle_front +
            " (" +
            (this.goalsDifference.right_ankle_front > 0
              ? "+" + this.goalsDifference.right_ankle_front
              : this.goalsDifference.right_ankle_front) +
            ")";
        } else {
          this.reportingValues.right_ankle_front = "";
        }
        if (
          this.latestBaseLine.left_ankle_front != undefined &&
          this.goalsDifference.left_ankle_front != undefined &&
          (this.latestBaseLine.left_ankle_front != 0 ||
            this.goalsDifference.left_ankle_front != 0)
        ) {
          this.reportingValues.left_ankle_front =
            this.latestBaseLine.left_ankle_front +
            " (" +
            (this.goalsDifference.left_ankle_front > 0
              ? "+" + this.goalsDifference.left_ankle_front
              : this.goalsDifference.left_ankle_front) +
            ")";
        } else {
          this.reportingValues.left_ankle_front = "";
        }
        if (
          this.latestBaseLine.bottom_right_foot != undefined &&
          this.goalsDifference.bottom_right_foot != undefined &&
          (this.latestBaseLine.bottom_right_foot != 0 ||
            this.goalsDifference.bottom_right_foot != 0)
        ) {
          this.reportingValues.bottom_right_foot =
            this.latestBaseLine.bottom_right_foot +
            " (" +
            (this.goalsDifference.bottom_right_foot > 0
              ? "+" + this.goalsDifference.bottom_right_foot
              : this.goalsDifference.bottom_right_foot) +
            ")";
        } else {
          this.reportingValues.bottom_right_foot = "";
        }
        if (
          this.latestBaseLine.bottom_left_foot != undefined &&
          this.goalsDifference.bottom_left_foot != undefined &&
          (this.latestBaseLine.bottom_left_foot != 0 ||
            this.goalsDifference.bottom_left_foot != 0)
        ) {
          this.reportingValues.bottom_left_foot =
            this.latestBaseLine.bottom_left_foot +
            " (" +
            (this.goalsDifference.bottom_left_foot > 0
              ? "+" + this.goalsDifference.bottom_left_foot
              : this.goalsDifference.bottom_left_foot) +
            ")";
        } else {
          this.reportingValues.bottom_left_foot = "";
        }
        if (
          this.latestBaseLine.right_neck_back != undefined &&
          this.goalsDifference.right_neck_back != undefined &&
          (this.latestBaseLine.right_neck_back != 0 ||
            this.goalsDifference.right_neck_back != 0)
        ) {
          this.reportingValues.right_neck_back =
            this.latestBaseLine.right_neck_back +
            " (" +
            (this.goalsDifference.right_neck_back > 0
              ? "+" + this.goalsDifference.right_neck_back
              : this.goalsDifference.right_neck_back) +
            ")";
        } else {
          this.reportingValues.right_neck_back = "";
        }
        if (
          this.latestBaseLine.left_neck_back != undefined &&
          this.goalsDifference.left_neck_back != undefined &&
          (this.latestBaseLine.left_neck_back != 0 ||
            this.goalsDifference.left_neck_back != 0)
        ) {
          this.reportingValues.left_neck_back =
            this.latestBaseLine.left_neck_back +
            " (" +
            (this.goalsDifference.left_neck_back > 0
              ? "+" + this.goalsDifference.left_neck_back
              : this.goalsDifference.left_neck_back) +
            ")";
        } else {
          this.reportingValues.left_neck_back = "";
        }
        if (
          this.latestBaseLine.right_shoulder_back != undefined &&
          this.goalsDifference.right_shoulder_back != undefined &&
          (this.latestBaseLine.right_shoulder_back != 0 ||
            this.goalsDifference.right_shoulder_back != 0)
        ) {
          this.reportingValues.right_shoulder_back =
            this.latestBaseLine.right_shoulder_back +
            " (" +
            (this.goalsDifference.right_shoulder_back > 0
              ? "+" + this.goalsDifference.right_shoulder_back
              : this.goalsDifference.right_shoulder_back) +
            ")";
        } else {
          this.reportingValues.right_shoulder_back = "";
        }
        if (
          this.latestBaseLine.left_shoulder_back != undefined &&
          this.goalsDifference.left_shoulder_back != undefined &&
          (this.latestBaseLine.left_shoulder_back != 0 ||
            this.goalsDifference.left_shoulder_back != 0)
        ) {
          this.reportingValues.left_shoulder_back =
            this.latestBaseLine.left_shoulder_back +
            " (" +
            (this.goalsDifference.left_shoulder_back > 0
              ? "+" + this.goalsDifference.left_shoulder_back
              : this.goalsDifference.left_shoulder_back) +
            ")";
        } else {
          this.reportingValues.left_shoulder_back = "";
        }

        if (
          this.latestBaseLine.right_elbow_back != undefined &&
          this.goalsDifference.right_elbow_back != undefined &&
          (this.latestBaseLine.right_elbow_back != 0 ||
            this.goalsDifference.right_elbow_back != 0)
        ) {
          this.reportingValues.right_elbow_back =
            this.latestBaseLine.right_elbow_back +
            " (" +
            (this.goalsDifference.right_elbow_back > 0
              ? "+" + this.goalsDifference.right_elbow_back
              : this.goalsDifference.right_elbow_back) +
            ")";
        } else {
          this.reportingValues.right_elbow_back = "";
        }
        if (
          this.latestBaseLine.left_elbow_back != undefined &&
          this.goalsDifference.left_elbow_back != undefined &&
          (this.latestBaseLine.left_elbow_back != 0 ||
            this.goalsDifference.left_elbow_back != 0)
        ) {
          this.reportingValues.left_elbow_back =
            this.latestBaseLine.left_elbow_back +
            " (" +
            (this.goalsDifference.left_elbow_back > 0
              ? "+" + this.goalsDifference.left_elbow_back
              : this.goalsDifference.left_elbow_back) +
            ")";
        } else {
          this.reportingValues.left_elbow_back = "";
        }
        if (
          this.latestBaseLine.right_hand_back != undefined &&
          this.goalsDifference.right_hand_back != undefined &&
          (this.latestBaseLine.right_hand_back != 0 ||
            this.goalsDifference.right_hand_back != 0)
        ) {
          this.reportingValues.right_hand_back =
            this.latestBaseLine.right_hand_back +
            " (" +
            (this.goalsDifference.right_hand_back > 0
              ? "+" + this.goalsDifference.right_hand_back
              : this.goalsDifference.right_hand_back) +
            ")";
        } else {
          this.reportingValues.right_hand_back = "";
        }
        if (
          this.latestBaseLine.left_hand_back != undefined &&
          this.goalsDifference.left_hand_back != undefined &&
          (this.latestBaseLine.left_hand_back != 0 ||
            this.goalsDifference.left_hand_back != 0)
        ) {
          this.reportingValues.left_hand_back =
            this.latestBaseLine.left_hand_back +
            " (" +
            (this.goalsDifference.left_hand_back > 0
              ? "+" + this.goalsDifference.left_hand_back
              : this.goalsDifference.left_hand_back) +
            ")";
        } else {
          this.reportingValues.left_hand_back = "";
        }

        if (
          this.latestBaseLine.right_knee_back != undefined &&
          this.goalsDifference.right_knee_back != undefined &&
          (this.latestBaseLine.right_knee_back != 0 ||
            this.goalsDifference.right_knee_back != 0)
        ) {
          this.reportingValues.right_knee_back =
            this.latestBaseLine.right_knee_back +
            " (" +
            (this.goalsDifference.right_knee_back > 0
              ? "+" + this.goalsDifference.right_knee_back
              : this.goalsDifference.right_knee_back) +
            ")";
        } else {
          this.reportingValues.right_knee_back = "";
        }
        if (
          this.latestBaseLine.left_knee_back != undefined &&
          this.goalsDifference.left_knee_back != undefined &&
          (this.latestBaseLine.left_knee_back != 0 ||
            this.goalsDifference.left_knee_back != 0)
        ) {
          this.reportingValues.left_knee_back =
            this.latestBaseLine.left_knee_back +
            " (" +
            (this.goalsDifference.left_knee_back > 0
              ? "+" + this.goalsDifference.left_knee_back
              : this.goalsDifference.left_knee_back) +
            ")";
        } else {
          this.reportingValues.left_knee_back = "";
        }
        if (
          this.latestBaseLine.right_ankle_back != undefined &&
          this.goalsDifference.right_ankle_back != undefined &&
          (this.latestBaseLine.right_ankle_back != 0 ||
            this.goalsDifference.right_ankle_back != 0)
        ) {
          this.reportingValues.right_ankle_back =
            this.latestBaseLine.right_ankle_back +
            " (" +
            (this.goalsDifference.right_ankle_back > 0
              ? "+" + this.goalsDifference.right_ankle_back
              : this.goalsDifference.right_ankle_back) +
            ")";
        } else {
          this.reportingValues.right_ankle_back = "";
        }
        if (
          this.latestBaseLine.left_ankle_back != undefined &&
          this.goalsDifference.left_ankle_back != undefined &&
          (this.latestBaseLine.left_ankle_back != 0 ||
            this.goalsDifference.left_ankle_back != 0)
        ) {
          this.reportingValues.left_ankle_back =
            this.latestBaseLine.left_ankle_back +
            " (" +
            (this.goalsDifference.left_ankle_back > 0
              ? "+" + this.goalsDifference.left_ankle_back
              : this.goalsDifference.left_ankle_back) +
            ")";
        } else {
          this.reportingValues.left_ankle_back = "";
        }
        this.getOldBaseLine();
        this.reportingValues = {
          ...this.reportingValues,
          ...this.reportTrainingValues,
        };
        console.log(this.reportingValues);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getOldBaseLine() {
    var id = this.memId;
    this.doctorService.getOldBaseLine(id).subscribe(
      (baseres) => {
        this.oldBaseLine = baseres;
        this.doctorService.getOldTraining(id).subscribe(
          (res) => {
            this.oldTraining = res;
            this.getGoals();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  oldGoals;
  getGoals() {
    var id = this.memId;
    this.doctorService.getGoals(id).subscribe(
      (res) => {
        console.log(res);
        this.oldGoals = res;
        this.goalForm.patchValue({
          height: this.oldGoals.height,
          height_symbol: this.oldGoals.height_symbol,
          weight_symbol: this.oldGoals.weight_symbol,
          b_tracks: this.oldGoals.b_tracks,
          b_tracks_symbol: this.oldGoals.b_tracks_symbol,
          hip: this.oldGoals.hip,
          hip_symbol: this.oldGoals.hip_symbol,
          waist: this.oldGoals.waist,
          waist_symbol: this.oldGoals.waist_symbol,
          hip_waist_ratio: this.oldGoals.hip_waist_ratio,
          hip_waist_ratio_symbol: this.oldGoals.hip_waist_ratio_symbol,
          body_fat_perc: this.oldGoals.body_fat_perc,
          body_fat_perc_symbol: this.oldGoals.body_fat_perc_symbol,
          fat_mass: this.oldGoals.fat_mass,
          fat_mass_symbol: this.oldGoals.fat_mass_symbol,
          lean_mass: this.oldGoals.lean_mass,
          lean_mass_symbol: this.oldGoals.lean_mass_symbol,
          weight: this.oldGoals.weight,
          left_grip: this.oldGoals.left_grip,
          left_grip_symbol: this.oldGoals.left_grip_symbol,
          right_grip: this.oldGoals.right_grip,
          right_grip_symbol: this.oldGoals.right_grip_symbol,
          leg_strength_test_reps: this.oldGoals.leg_strength_test_reps,
          leg_strength_test_reps_symbol:
            this.oldGoals.leg_strength_test_reps_symbol,
          single_leg_balance_test_left:
            this.oldGoals.single_leg_balance_test_left,
          single_leg_balance_test_left_symbol:
            this.oldGoals.single_leg_balance_test_left_symbol,
          single_leg_balance_test_right_symbol:
            this.oldGoals.single_leg_balance_test_right_symbol,
          x3_chest_press_reps: this.oldGoals.x3_chest_press_reps,
          x3_chest_press_reps_symbol: this.oldGoals.x3_chest_press_reps_symbol,
          x3_bicep_curl_reps: this.oldGoals.x3_bicep_curl_reps,
          x3_bicep_curl_reps_symbol: this.oldGoals.x3_bicep_curl_reps_symbol,
          chest_press_band: this.oldGoals.chest_press_band,
          chest_press_band_symbol: this.oldGoals.chest_press_band_symbol,
          chest_press_reps: this.oldGoals.chest_press_reps,
          chest_press_reps_symbol: this.oldGoals.chest_press_reps_symbol,
          chest_press_partials: this.oldGoals.chest_press_partials,
          chest_press_partials_symbol:
            this.oldGoals.chest_press_partials_symbol,
          squat_band: this.oldGoals.squat_band,
          squat_band_symbol: this.oldGoals.squat_band_symbol,
          squat_reps: this.oldGoals.squat_reps,
          squat_reps_symbol: this.oldGoals.squat_reps_symbol,
          squat_partials: this.oldGoals.squat_partials,
          squat_partials_symbol: this.oldGoals.squat_partials_symbol,
          overhead_press_band: this.oldGoals.overhead_press_band,
          overhead_press_band_symbol: this.oldGoals.overhead_press_band_symbol,
          overhead_press_reps: this.oldGoals.overhead_press_reps,
          overhead_press_reps_symbol: this.oldGoals.overhead_press_reps_symbol,
          overhead_press_partials: this.oldGoals.overhead_press_partials,
          overhead_press_partials_symbol:
            this.oldGoals.overhead_press_partials_symbol,
          tricep_push_band: this.oldGoals.tricep_push_band,
          tricep_push_band_symbol: this.oldGoals.tricep_push_band_symbol,
          tricep_push_reps: this.oldGoals.tricep_push_reps,
          tricep_push_reps_symbol: this.oldGoals.tricep_push_reps_symbol,
          tricep_push_partials: this.oldGoals.tricep_push_partials,
          tricep_push_partials_symbol:
            this.oldGoals.tricep_push_partials_symbol,
          chest_flys_band: this.oldGoals.chest_flys_band,
          chest_flys_band_symbol: this.oldGoals.chest_flys_band_symbol,
          chest_flys_reps: this.oldGoals.chest_flys_reps,
          chest_flys_reps_symbol: this.oldGoals.chest_flys_reps_symbol,
          chest_flys_partials: this.oldGoals.chest_flys_partials,
          chest_flys_partials_symbol: this.oldGoals.chest_flys_partials_symbol,
          dead_lift_band: this.oldGoals.dead_lift_band,
          dead_lift_band_symbol: this.oldGoals.dead_lift_band_symbol,
          dead_lift_reps: this.oldGoals.dead_lift_reps,
          dead_lift_reps_symbol: this.oldGoals.dead_lift_reps_symbol,
          dead_lift_partials: this.oldGoals.dead_lift_partials,
          dead_lift_partials_symbol: this.oldGoals.dead_lift_partials_symbol,
          bent_row_band: this.oldGoals.bent_row_band,
          bent_row_band_symbol: this.oldGoals.bent_row_band_symbol,
          bent_row_reps: this.oldGoals.bent_row_reps,
          bent_row_reps_symbol: this.oldGoals.bent_row_reps_symbol,
          bent_row_partials: this.oldGoals.bent_row_partials,
          bent_row_partials_symbol: this.oldGoals.bent_row_partials_symbol,
          bicep_curl_band: this.oldGoals.bicep_curl_band,
          bicep_curl_band_symbol: this.oldGoals.bicep_curl_band_symbol,
          bicep_curl_reps: this.oldGoals.bicep_curl_reps,
          bicep_curl_reps_symbol: this.oldGoals.bicep_curl_reps_symbol,
          bicep_curl_partials: this.oldGoals.bicep_curl_partials,
          bicep_curl_partials_symbol: this.oldGoals.bicep_curl_partials_symbol,
          calf_raise_band: this.oldGoals.calf_raise_band,
          calf_raise_band_symbol: this.oldGoals.calf_raise_band_symbol,
          calf_raise_reps: this.oldGoals.calf_raise_reps,
          calf_raise_reps_symbol: this.oldGoals.calf_raise_reps_symbol,
          calf_raise_partials: this.oldGoals.calf_raise_partials,
          calf_raise_partials_symbol: this.oldGoals.calf_raise_partials_symbol,
        });
        if (this.oldGoals.height_symbol == undefined) {
          this.arrowsValues.height_symbol = "undefined";
        } else {
          this.arrowsValues.height_symbol = this.oldGoals.height_symbol;
        }
        if (this.oldGoals.weight_symbol == undefined) {
          this.arrowsValues.weight_symbol = "undefined";
        } else {
          this.arrowsValues.weight_symbol = this.oldGoals.weight_symbol;
        }
        if (this.oldGoals.b_tracks_symbol == undefined) {
          this.arrowsValues.b_tracks_symbol = "undefined";
        } else {
          this.arrowsValues.b_tracks_symbol = this.oldGoals.b_tracks_symbol;
        }
        if (this.oldGoals.hip_symbol == undefined) {
          this.arrowsValues.hip_symbol = "undefined";
        } else {
          this.arrowsValues.hip_symbol = this.oldGoals.hip_symbol;
        }
        if (this.oldGoals.waist_symbol == undefined) {
          this.arrowsValues.waist_symbol = "undefined";
        } else {
          this.arrowsValues.waist_symbol = this.oldGoals.waist_symbol;
        }
        if (this.oldGoals.hip_waist_ratio_symbol == undefined) {
          this.arrowsValues.hip_waist_ratio_symbol = "undefined";
        } else {
          this.arrowsValues.hip_waist_ratio_symbol =
            this.oldGoals.hip_waist_ratio_symbol;
        }
        if (this.oldGoals.body_fat_perc_symbol == undefined) {
          this.arrowsValues.body_fat_perc_symbol = "undefined";
        } else {
          this.arrowsValues.body_fat_perc_symbol =
            this.oldGoals.body_fat_perc_symbol;
        }
        if (this.oldGoals.fat_mass_symbol == undefined) {
          this.arrowsValues.fat_mass_symbol = "undefined";
        } else {
          this.arrowsValues.fat_mass_symbol = this.oldGoals.fat_mass_symbol;
        }
        if (this.oldGoals.lean_mass_symbol == undefined) {
          this.arrowsValues.lean_mass_symbol = "undefined";
        } else {
          this.arrowsValues.lean_mass_symbol = this.oldGoals.lean_mass_symbol;
        }
        if (this.oldGoals.left_grip_symbol == undefined) {
          this.arrowsValues.left_grip_symbol = "undefined";
        } else {
          this.arrowsValues.left_grip_symbol = this.oldGoals.left_grip_symbol;
        }
        if (this.oldGoals.right_grip_symbol == undefined) {
          this.arrowsValues.right_grip_symbol = "undefined";
        } else {
          this.arrowsValues.right_grip_symbol = this.oldGoals.right_grip_symbol;
        }
        if (this.oldGoals.leg_strength_test_reps_symbol == undefined) {
          this.arrowsValues.leg_strength_test_reps_symbol = "undefined";
        } else {
          this.arrowsValues.leg_strength_test_reps_symbol =
            this.oldGoals.leg_strength_test_reps_symbol;
        }
        if (this.oldGoals.single_leg_balance_test_left_symbol == undefined) {
          this.arrowsValues.single_leg_balance_test_left_symbol = "undefined";
        } else {
          this.arrowsValues.single_leg_balance_test_left_symbol =
            this.oldGoals.single_leg_balance_test_left_symbol;
        }
        if (this.oldGoals.single_leg_balance_test_right_symbol == undefined) {
          this.arrowsValues.single_leg_balance_test_right_symbol = "undefined";
        } else {
          this.arrowsValues.single_leg_balance_test_right_symbol =
            this.oldGoals.single_leg_balance_test_right_symbol;
        }
        if (this.oldGoals.x3_chest_press_reps_symbol == undefined) {
          this.arrowsValues.x3_chest_press_reps_symbol = "undefined";
        } else {
          this.arrowsValues.x3_chest_press_reps_symbol =
            this.oldGoals.x3_chest_press_reps_symbol;
        }
        if (this.oldGoals.x3_bicep_curl_reps_symbol == undefined) {
          this.arrowsValues.x3_bicep_curl_reps_symbol = "undefined";
        } else {
          this.arrowsValues.x3_bicep_curl_reps_symbol =
            this.oldGoals.x3_bicep_curl_reps_symbol;
        }
        if (this.oldGoals.chest_press_band_symbol == undefined) {
          this.arrowsValues.chest_press_band_symbol = "undefined";
        } else {
          this.arrowsValues.chest_press_band_symbol =
            this.oldGoals.chest_press_band_symbol;
        }
        if (this.oldGoals.chest_press_reps_symbol == undefined) {
          this.arrowsValues.chest_press_reps_symbol = "undefined";
        } else {
          this.arrowsValues.chest_press_reps_symbol =
            this.oldGoals.chest_press_reps_symbol;
        }
        if (this.oldGoals.chest_press_partials_symbol == undefined) {
          this.arrowsValues.chest_press_partials_symbol = "undefined";
        } else {
          this.arrowsValues.chest_press_partials_symbol =
            this.oldGoals.chest_press_partials_symbol;
        }

        if (this.oldGoals.squat_band_symbol == undefined) {
          this.arrowsValues.squat_band_symbol = "undefined";
        } else {
          this.arrowsValues.squat_band_symbol = this.oldGoals.squat_band_symbol;
        }
        if (this.oldGoals.squat_reps_symbol == undefined) {
          this.arrowsValues.squat_reps_symbol = "undefined";
        } else {
          this.arrowsValues.squat_reps_symbol = this.oldGoals.squat_reps_symbol;
        }
        if (this.oldGoals.squat_partials_symbol == undefined) {
          this.arrowsValues.squat_partials_symbol = "undefined";
        } else {
          this.arrowsValues.squat_partials_symbol =
            this.oldGoals.squat_partials_symbol;
        }

        if (this.oldGoals.overhead_press_band_symbol == undefined) {
          this.arrowsValues.overhead_press_band_symbol = "undefined";
        } else {
          this.arrowsValues.overhead_press_band_symbol =
            this.oldGoals.overhead_press_band_symbol;
        }
        if (this.oldGoals.overhead_press_reps_symbol == undefined) {
          this.arrowsValues.overhead_press_reps_symbol = "undefined";
        } else {
          this.arrowsValues.overhead_press_reps_symbol =
            this.oldGoals.overhead_press_reps_symbol;
        }
        if (this.oldGoals.overhead_press_partials_symbol == undefined) {
          this.arrowsValues.overhead_press_partials_symbol = "undefined";
        } else {
          this.arrowsValues.overhead_press_partials_symbol =
            this.oldGoals.overhead_press_partials_symbol;
        }

        if (this.oldGoals.tricep_push_band_symbol == undefined) {
          this.arrowsValues.tricep_push_band_symbol = "undefined";
        } else {
          this.arrowsValues.tricep_push_band_symbol =
            this.oldGoals.tricep_push_band_symbol;
        }
        if (this.oldGoals.tricep_push_reps_symbol == undefined) {
          this.arrowsValues.tricep_push_reps_symbol = "undefined";
        } else {
          this.arrowsValues.tricep_push_reps_symbol =
            this.oldGoals.tricep_push_reps_symbol;
        }
        if (this.oldGoals.tricep_push_partials_symbol == undefined) {
          this.arrowsValues.tricep_push_partials_symbol = "undefined";
        } else {
          this.arrowsValues.tricep_push_partials_symbol =
            this.oldGoals.tricep_push_partials_symbol;
        }

        if (this.oldGoals.chest_flys_band_symbol == undefined) {
          this.arrowsValues.chest_flys_band_symbol = "undefined";
        } else {
          this.arrowsValues.chest_flys_band_symbol =
            this.oldGoals.chest_flys_band_symbol;
        }
        if (this.oldGoals.chest_flys_reps_symbol == undefined) {
          this.arrowsValues.chest_flys_reps_symbol = "undefined";
        } else {
          this.arrowsValues.chest_flys_reps_symbol =
            this.oldGoals.chest_flys_reps_symbol;
        }
        if (this.oldGoals.chest_flys_partials_symbol == undefined) {
          this.arrowsValues.chest_flys_partials_symbol = "undefined";
        } else {
          this.arrowsValues.chest_flys_partials_symbol =
            this.oldGoals.chest_flys_partials_symbol;
        }

        if (this.oldGoals.dead_lift_band_symbol == undefined) {
          this.arrowsValues.dead_lift_band_symbol = "undefined";
        } else {
          this.arrowsValues.dead_lift_band_symbol =
            this.oldGoals.dead_lift_band_symbol;
        }
        if (this.oldGoals.dead_lift_reps_symbol == undefined) {
          this.arrowsValues.dead_lift_reps_symbol = "undefined";
        } else {
          this.arrowsValues.dead_lift_reps_symbol =
            this.oldGoals.dead_lift_reps_symbol;
        }
        if (this.oldGoals.dead_lift_partials_symbol == undefined) {
          this.arrowsValues.dead_lift_partials_symbol = "undefined";
        } else {
          this.arrowsValues.dead_lift_partials_symbol =
            this.oldGoals.dead_lift_partials_symbol;
        }

        if (this.oldGoals.bent_row_band_symbol == undefined) {
          this.arrowsValues.bent_row_band_symbol = "undefined";
        } else {
          this.arrowsValues.bent_row_band_symbol =
            this.oldGoals.bent_row_band_symbol;
        }
        if (this.oldGoals.bent_row_reps_symbol == undefined) {
          this.arrowsValues.bent_row_reps_symbol = "undefined";
        } else {
          this.arrowsValues.bent_row_reps_symbol =
            this.oldGoals.bent_row_reps_symbol;
        }
        if (this.oldGoals.bent_row_partials_symbol == undefined) {
          this.arrowsValues.bent_row_partials_symbol = "undefined";
        } else {
          this.arrowsValues.bent_row_partials_symbol =
            this.oldGoals.bent_row_partials_symbol;
        }

        if (this.oldGoals.bicep_curl_band_symbol == undefined) {
          this.arrowsValues.bicep_curl_band_symbol = "undefined";
        } else {
          this.arrowsValues.bicep_curl_band_symbol =
            this.oldGoals.bicep_curl_band_symbol;
        }
        if (this.oldGoals.bicep_curl_reps_symbol == undefined) {
          this.arrowsValues.bicep_curl_reps_symbol = "undefined";
        } else {
          this.arrowsValues.bicep_curl_reps_symbol =
            this.oldGoals.bicep_curl_reps_symbol;
        }
        if (this.oldGoals.bicep_curl_partials_symbol == undefined) {
          this.arrowsValues.bicep_curl_partials_symbol = "undefined";
        } else {
          this.arrowsValues.bicep_curl_partials_symbol =
            this.oldGoals.bicep_curl_partials_symbol;
        }
        if (this.oldGoals.calf_raise_band_symbol == undefined) {
          this.arrowsValues.calf_raise_band_symbol = "undefined";
        } else {
          this.arrowsValues.calf_raise_band_symbol =
            this.oldGoals.calf_raise_band_symbol;
        }
        if (this.oldGoals.calf_raise_reps_symbol == undefined) {
          this.arrowsValues.calf_raise_reps_symbol = "undefined";
        } else {
          this.arrowsValues.calf_raise_reps_symbol =
            this.oldGoals.calf_raise_reps_symbol;
        }
        if (this.oldGoals.calf_raise_partials_symbol == undefined) {
          this.arrowsValues.calf_raise_partials_symbol = "undefined";
        } else {
          this.arrowsValues.calf_raise_partials_symbol =
            this.oldGoals.calf_raise_partials_symbol;
        }
        this.arrows = true;

        this.setGoals();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  user = null;
  goalInput = true;

  getHighlightedNoteId(id) {
    this.highlighted_note_id_1 = id;
  }
  getHighlightedNoteId2(id) {
    this.highlighted_note_id_2 = id;
  }
  getHighlightedNoteId3(id) {
    this.highlighted_note_id_3 = id;
  }

  getPreviousNoteId(id) {
    this.previous_note_id_1 = id;
  }
  getPreviousNoteId2(id) {
    this.previous_note_id_2 = id;
  }
  getPreviousNoteId3(id) {
    this.previous_note_id_3 = id;
  }
  table = null;
  ngOnInit() {
    this.getLocationDetails();
    if (this.router.url.includes("user")) {
      this.count_member_list = 1;
      this.spinner = true;
      this.user_required_email = this.route.snapshot.paramMap.get("id");
      this.getMember(this.user_required_email.toLowerCase());
    }

    this.getMembers();
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.role == "member") {
      this.goalInput = false;
      this.memberName = this.user.username;
      this.UserObj["name"] = this.user.username;
      this.memId = this.user.id;
      this.getGoalsDifference();
    }
    this.coachName = this.user.username;
    if (this.user.role !== "member") {
      this.getUserCalendarId(this.user.email);
      this.dtOptions = {
        destroy: true,
        pagingType: "full_numbers",
        retrieve: true,
      };
    }
    this.today = new Date().toISOString().split("T")[0];
    this.memberId.valueChanges.subscribe((newValue) => {
      this.filteredValues = this.filterValues(newValue);
    });
    this.baseLineForm.valueChanges.subscribe((newValue) => {
      this.showBaselineFormButton = Object.keys(newValue).every(
        (key) => newValue[key] == this.baselineFormTempValues[key]
      );
      console.log(this.showBaselineFormButton);
    });
    $("#changeProfilePic").on("hide.bs.modal", (e) => {
      this.url = this.UserObj.picture;
      this.updateImage  = false
      if(this.imageElement){
      this.imageElement.value = "";
      }
    });
    $("#Update").on("hide.bs.modal", (e) => {
      this.url = this.UserObj.picture;
      this.updateImage  = false
      if(this.imageElement){
        this.imageElement.value = "";
        }
    });
    $("#exampleModal").on("hide.bs.modal", (e) => {
      this.url_profile_image = null;
      this.updateImage  = false;
      if(this.imageElement){
        this.imageElement.value = "";
        }    
      });
  }
  

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getUserCalendarId(email) {
    this.doctorService.getMember(email).subscribe(
      (res) => {
        this.userCalendarId = res.calendar_id;
        this.getFutureAppointments();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  tableSet() {
    this.dtTrigger.next();
  }

  checkZero(data) {
    var sum = data.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum == 0 ? false : true;
  }

  RemoveLeadingZeros(arr, dates_arr) {
    for (var i = 0; i < arr.length; i++) {
      var count = 0;
      for (var q = 0; q < arr[i].data.length; q++) {
        if ((arr[i].data[q] == 0 || arr[i].data[q] === null) && count == 0) {
          const index = arr[i].data.indexOf(arr[i].data[q]);
          arr[i].data.splice(index, 1);
          dates_arr.splice(index, 1);
          q--;
        } else {
          count++;
        }
      }
    }
    return arr;
  }

  set_default_user() {
    this.spinner = true;
    console.log(this.UserObj);
    this.doctorService.getMember(this.UserObj.get_email).subscribe(
      (res) => {
        this.UserObj = res;
        this.updateMemberForm.patchValue(this.UserObj);
        if (this.UserObj.role == "member") {
          (<HTMLInputElement>document.querySelector("#user_role")).checked =
            false;
        }
        console.log(this.UserObj.picture);
        this.url = this.UserObj.picture;
        this.spinner = false;
        this.update_note_count = res.note_count;
      },
      (error) => {
        this.spinner = false;
        console.log(error);
      }
    );
  }

  user_table_obj = null;

  getMemberObj(obj) {
    this.user_table_obj = obj;
    this.spinner = true;
    this.doctorService.getMember(obj.get_email).subscribe(
      (res) => {
        this.updateMemberForm.patchValue(res[0]);
        if (res[0].role == "member") {
          (<HTMLInputElement>document.querySelector("#user_role")).checked =
            false;
        }
        this.table_user_id = res[0].id;
        this.url2 = res[0].picture;
        this.spinner = false;
      },
      (error) => {
        this.spinner = false;
        console.log(error);
      }
    );
  }
  getNote1(id, date, text, coach) {
    this.edit_note1 = id;

    this.updateNotesForm.patchValue({
      notes: text,
      coach: coach,
      date: date.split(".")[0].split("Z")[0],
    });
  }
  getNote2(id, date, text, coach) {
    this.edit_note2 = id;
    this.updateNotesForm.patchValue({
      notes: text,
      coach: coach,
      date: date.split(".")[0].split("Z")[0],
    });
  }
  getNote3(id, date, text, coach) {
    this.edit_note3 = id;
    this.updateNotesForm.patchValue({
      notes: text,
      coach: coach,
      date: date.split(".")[0].split("Z")[0],
    });
  }

  getTrainingReportValues(e) {
    this.reportTrainingValues = e;
  }

  filterValues(search: string) {
    return this.members.filter((value) =>
      value.name.toLowerCase().includes(search.toString().toLowerCase())
    );
  }

  // image crop
  imageChangedEvent: any = "";
  croppedImage: any = "";

  fileChangeEvent(event: any, type: any, elem: any): void {
    this.spinner = true;
    this.updateImage = true;
    this.ImageName = event.target.files[0].name;
    this.imageChangedEvent = event;
    this.imageElement = elem;
  }
  imageCropped(event: ImageCroppedEvent,type:any) {
    if(type === 'create'){
      this.url_profile_image = event.base64
    }
    else{
      this.url = event.base64;
    }
    let file = this.base64ToFile(event.base64, this.ImageName);
  }
  imageLoaded() {
    // show cropper
    console.log("image loaded");
    this.imageEditing = true;
  }
  cropperReady() {
    console.log("image croped");
    this.spinner = false;
    // cropper ready
  }
  CropImage() {
    this.updateImage = false;
  }
  loadImageFailed() {
    // show message
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
    console.log(user.date);
    this.doctorService
      .updateHighlighteddNote1(this.edit_note1, user)
      .subscribe((res) => {
        this.toastr.success("Note Updated Successfully");
        this.getPreviousNotes();
        this.getHighlightedNotes();
        $("#demo-edit1").modal("hide");
      });
  }

  UpdateNotes2() {
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
      .updateHighlighteddNote2(this.edit_note2, user)
      .subscribe((res) => {
        this.toastr.success("Note Updated Successfully");
        this.getPreviousNotesBaseline();
        this.getHighlightedNotesBaseline();
        $("#demo-edit2").modal("hide");
      });
  }
  UpdateNotes3() {
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
      .updateHighlighteddNote3(this.edit_note3, user)
      .subscribe((res) => {
        this.toastr.success("Note Updated Successfully");
        this.getPreviousNotesBody();
        this.getHighlightedNotesBody();
        $("#demo-edit3").modal("hide");
      });
  }
  base64ToFile(data, filename) {
    const arr = data.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    this.updatedImageFile = new File([u8arr], filename, { type: mime });
  }
  SendReview() {
    if (!this.reviewForm.valid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    $("#sendRequest").modal("show");
  }
  confirmReview() {
    $("#review").modal("hide");
    const text = this.reviewForm.get("review_area").value;
    this.doctorService.sendReviewRequest(this.memId, text).subscribe((res) => {
      console.log(res);
    });
    this.toastr.success("Review Request Sent");
  }
  image_resize(id) {
    let width = (<HTMLInputElement>document.querySelector("#img_post_" + id))
      .width;
    let height = (<HTMLInputElement>document.querySelector("#img_post_" + id))
      .height;
    let ratio = width / height;
    (<HTMLInputElement>document.querySelector("#img_post_" + id)).width =
      300 * ratio;
    (<HTMLInputElement>document.querySelector("#img_post_" + id)).height = 300;
  }
  hideMenu() {
    (<HTMLInputElement>document.querySelector("#menuToggle>input")).checked =
      false;
    this.doctorService.getUserActiveCampaign(this.memId).subscribe(
      (res) => {
        if (res.message == "User doesn't exist") {
          $("#activeCampaign").modal("show");
          this.modalName = "review";
        } else {
          $("#review").modal("show");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addMemberList() {
    (<HTMLInputElement>document.querySelector("#menuToggle>input")).checked =
      false;
    if (this.count_member_list == 0 && this.members.length > 0) {
      this.count_member_list++;
      let user = JSON.parse(localStorage.getItem("user"));
      let found_user = this.members.filter((x) => x.id == user.id);
      console.log(found_user);
      this.getMember(found_user[0].get_email);
    }
    var timer = setInterval(function () {
      if (<HTMLInputElement>document.querySelector("#members-tab")) {
        (<HTMLInputElement>document.querySelector("#members-tab")).click();
        clearInterval(timer);
      }
    }, 1);
  }

  getPreWrittenText() {
    this.doctorService.getPreWrittenText().subscribe(
      (res) => {
        this.preWrittenText = res.messages;
      },
      (error) => {
        console.log(error.error);
        this.preWrittenText = error.error.messages;
      }
    );
  }
  getMessageId(id, id2) {
    this.messageId = { messageId: id, id: id2 };
  }
  deleteMessage() {
    this.doctorService.deleteMessage(this.messageId.messageId).subscribe(
      (res) => {
        if (res[0]) {
          this.toastr.error("Message Deleted Successfully");
          this.preWrittenText.splice(this.messageId.id, 1);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getFutureAppointments() {
    let _that = this;
    this.spinner = true;
    this.doctorService.getFutureAppointmentsList().subscribe(
      (res) => {
        let appointments = Object.keys(res).reverse();
        appointments.forEach(function (key) {
          if (key != "false") {
            _that.futureAppointsCompleteData[key] = res[key].appointments;
            var obj = {
              id: key,
              name: res[key].name,
            };
            _that.futureAppointments.push(obj);
          }
        });
        this.userCalendarId && res[this.userCalendarId]
          ? (this.appointment_id = this.userCalendarId)
          : (this.appointment_id =
              this.futureAppointments[0] && this.futureAppointments[0].id
                ? this.futureAppointments[0].id
                : "");
        if (this.appointment_id != "") {
          this.futureAppointmentsData = res[this.appointment_id].appointments;
        }

        this.spinner = false;
      },
      (error) => {
        this.spinner = false;
        console.log(error);
      }
    );
  }
  addAppointmentUser() {
    if (!this.addAppointmentMemberForm.valid) {
      this.submitted = true;
      return;
    }

    this.submitted = false;
    var user = this.addAppointmentMemberForm.value;
    user.dob = this.updatedImageFile;
    this.doctorService.addUser(user).subscribe(
      (res) => {
        this.updatedImageFile = null;
        $("#FutureAppointmentUser").modal("hide");
        this.addAppointmentMemberForm.reset();
        if (this.imageElement) {
          this.imageElement.value = "";
        }
        this.toastr.success("Member Added Successfully");
        this.router.navigate(["/user/" + res.get_email]);
        this.addMemberError = null;
      },
      (error) => {
        this.updatedImageFile = null;
        this.addMemberError = error.error.Error;
        console.log(error);
      }
    );
  }
  createAppointmentUser(user) {
    console.log(user);
    $("#FutureAppointmentUser").modal("show");
    this.addAppointmentMemberForm.patchValue({
      firstName: user.name.split(" ")[0],
      lastName: user.name.split(" ")[1],
      get_email: user.email,
      phoneNumber: user.phonenum,
      password: user.phonenum,
    });
  }

  getAppointmentValue(e) {
    this.futureAppointmentsData =
      this.futureAppointsCompleteData[e.target.value];
    this.doctorService.updateCalendarId(this.user.id, e.target.value).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadIframe(url) {
    this.spinner = true;
    this.url_iframe = "";
    this.url_iframe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    $("#iframe").modal("show");
    const that = this;
    setTimeout(function () {
      that.spinner = false;
    }, 2500);
  }
  hideModal(e) {
    this.showPopup = false;
  }
  getMemberDoctors() {
    this.spinner = true;
    this.doctorService.getMemberDoctors(this.memId).subscribe(
      (res) => {
        this.memDoctors = res;
        this.spinner = false;
      },
      (error) => {
        console.log(error);
        this.spinner = false;
      }
    );
  }
  changeProfileImage() {
    $("#changeProfilePic").modal("show");
  }
  updateProfilePic() {
    let data = { ...this.UserObj };
    let that = this;
    new Compressor(this.updatedImageFile, {
      quality: 0.4,
      success(result) {
        data.picture = result;
        that.UserObj.picture = that.url;
        that.doctorService.updateUser(data).subscribe(
          (res) => {
            that.toastr.success("Profile Picture Updated Successfully");
            $("#changeProfilePic").modal("hide");
            that.updatedImageFile = null;
          },
          (error) => {
            console.log(error);
          }
        );
      },
    });
  }
}
