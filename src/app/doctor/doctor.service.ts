import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { not } from "@angular/compiler/src/output/output_ast";
import { environment } from "../../environments/environment.staging";
import { format } from "url";

@Injectable({
  providedIn: "root",
})
export class DoctorService {
  user = null;
  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  sendReviewRequest(memID, text): Observable<any> {
    console.log("send review request");
    const form = new FormData();
    form.append("memID", memID);
    form.append("text", text);

    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/review_request/",
      form,
      header
    );
  }

  updateCalendarId(member, id): Observable<any> {
    var form = new FormData();
    form.append("calendar_id", id);
    form.append("member", member);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/update_user_calendar_id/`,
      form,
      header
    );
  }
  getAppointmentData(id,time): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_appointment_data/?member=${id}&date=${time}`,
      header
    );
  }

  getNextAppointmentDate(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_next_appointment_date/?member=${id}`,
      header
    );
  }

  deletePosture(id): Observable<any> {
    const form = new FormData();
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    return this.http.post<any>(
      environment.baseUrl + `/delete_user_posture/?posture_id=${id}`,
      form,
      header
    );
  }

  deleteMember(id): Observable<any> {
    const form = new FormData();
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    return this.http.post<any>(
      environment.baseUrl + `/delete_member/?member=${id}`,
      form,
      header
    );
  }
  updateAppointmentLabel(memID, appointmentID): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl +
        `/update_appointment_label/?member=${memID}&appointment=${appointmentID}`,
      header
    );
  }

  checkAutomation(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/check_automation/`,
      header
    );
  }
  getMembers(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(environment.baseUrl + "/get_members/", header);
  }

  getDoctors(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(environment.baseUrl + "/doctors/", header);
  }
  getMemberDoctors(memId): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/members_doctor/?member=${memId}`,
      header
    );
  }
  getMember(email): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + "/get_member/?email=" + email,
      header
    );
  }

  getVibePlate(member): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + "/vibe_plate/?id=" + member,
      header
    );
  }

  updateVibePlate(note, member): Observable<any> {
    const form = new FormData();
    form.append("vibe_plate_focus", note);
    form.append("member", member);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/vibe_plate/",
      form,
      header
    );
  }

  addDoctor(doctor): Observable<any> {
    const form = new FormData();
    form.append("firstname", doctor.firstName);
    form.append("lastname", doctor.lastName);
    form.append("clinical_location", doctor.clinicLocation);
    form.append("doctor_type", doctor.type);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/add_doctor/",
      form,
      header
    );
  }

  updateDoctor(id, doctor): Observable<any> {
    const form = new FormData();
    form.append("doctor", id);
    form.append("firstname", doctor.firstName);
    form.append("lastname", doctor.lastName);
    form.append("clinical_location", doctor.clinicLocation);
    form.append("doctor_type", doctor.type);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.put<any>(
      environment.baseUrl + "/update_doctor/",
      form,
      header
    );
  }

  bindDoctor(member, doctor): Observable<any> {
    const form = new FormData();
    form.append("member", member);
    form.append("doctor", doctor);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/tie_doctor_to_member/",
      form,
      header
    );
  }

  unBindDoctor(member, doctor): Observable<any> {
    const form = new FormData();
    form.append("member", member);
    form.append("doctor", doctor);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/untie_doctor_to_member/",
      form,
      header
    );
  }
  addCheckInNotes(member): Observable<any> {
    const form = new FormData();
    form.append("member", member);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/add_session_notes_count/",
      form,
      header
    );
  }

  getPosturePhoto(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_user_postures/?member=${id}`,
      header
    );
  }
  addUser(user): Observable<any> {
    const form = new FormData();
    form.append("firstname", user.firstName);
    form.append("lastname", user.lastName);
    if (user.userName) {
      form.append("email", user.userName.toLowerCase());
    } else {
      form.append("email", user.get_email.toLowerCase());
    }
    if (user.dob) {
      form.append("picture", user.dob, user.dob.name);
    }
    if (user.dob2 == null) {
      form.append("dob", "");
    } else {
      form.append("dob", user.dob2);
    }
    form.append("phone", user.phoneNumber);
    form.append("password", user.password);

    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/add_newuser/",
      form,
      header
    );
  }

  addCoach(user): Observable<any> {
    const form = new FormData();

    form.append("firstname", user.firstName);
    form.append("lastname", user.lastName);
    form.append("email", user.userName.toLowerCase());
    if (user.dob) {
      form.append("picture", user.dob, user.dob.name);
    }
    if (user.dob2 == null) {
      form.append("dob", "");
    } else {
      form.append("dob", user.dob2);
    }
    console.log(user.dob2);
    form.append("phone", user.phoneNumber);
    form.append("password", user.password);

    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/add_coach/",
      form,
      header
    );
  }

  updateUser(user): Observable<any> {
    const form = new FormData();
    form.append("member", user.id);
    form.append("firstname", user.get_first_name);
    form.append("lastname", user.get_last_name);
    form.append("email", user.get_email.toLowerCase());
    form.append("phone", user.phone_number);
    form.append("password", user.password);
    if (user.dob == null) {
      form.append("dob", "");
    } else {
      form.append("dob", user.dob);
    }
    if (user.picture) {
      console.log("testing_picture");
      form.append("picture", user.picture, user.picture.name);
    }
    form.append("role", user.role);
    form.append("note_count",user.note_count)
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post(environment.baseUrl + "/update_user/", form, header);
  }

  addPosture(id, img): Observable<any> {
    const form = new FormData();
    form.append("member", id);
    form.append("coach", JSON.parse(localStorage.getItem("user")).id);
    form.append("picture", img, img.name);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/add_user_posture/`,
      form,
      header
    );
  }

  editPosture(date, img, id): Observable<any> {
    const form = new FormData();
    form.append("picture", img, img.name);
    form.append("created_at", date);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/edit_user_posture/?posture_id=${id}`,
      form,
      header
    );
  }

  getPositions(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_positions/?member=${id}`,
      header
    );
  }

  updatePosition(positions, memberId): Observable<any> {
    const form = new FormData();
    if (
      (document.querySelector("#coozies") as HTMLInputElement).checked === true
    ) {
      positions.coozies = "True";
    } else {
      positions.coozies = "False";
    }
    if (
      (document.querySelector("#yoga") as HTMLInputElement).checked === true
    ) {
      positions.yoga = "True";
    } else {
      positions.yoga = "False";
    }
    form.append("ugt_arm", positions.ugt_arm);
    form.append("ugt_seat", positions.ugt_seat);
    form.append("lgt_seat", positions.lgt_seat);
    form.append("lgt_pads", positions.lgt_pads);
    form.append("cgt_arm", positions.cgt_arm);
    form.append("cgt_seat", positions.cgt_seat);
    form.append("pgt_arm", positions.pgt_arm);
    form.append("pgt_pads_plate", positions.pgt_pads_plate);
    form.append("coozies", positions.coozies);
    form.append("yoga", positions.yoga);
    form.append("ugt_pr", positions.ugt_pr);
    form.append("lgt_pr", positions.lgt_pr);
    form.append("cgt_pr", positions.cgt_pr);
    form.append("pgt_pr", positions.pgt_pr);

    form.append("member", memberId);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/update_positions/",
      form,
      header
    );
  }

  updatePositionNotes(
    ugt_note,
    lgt_note,
    cgt_note,
    pgt_note,
    memberId
  ): Observable<any> {
    const form = new FormData();
    form.append("ugt_note", ugt_note ? ugt_note : "");
    form.append("lgt_note", lgt_note ? lgt_note : "");
    form.append("cgt_note", cgt_note ? cgt_note : "");
    form.append("pgt_note", pgt_note ? pgt_note : "");
    form.append("member", memberId);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/update_positions_notes/",
      form,
      header
    );
  }
  getPositionNotes(memberId): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_positions_notes/?member=${memberId}`,
      header
    );
  }
  deleteNote(type, noteId): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl +
        `/delete_highlighted_note/?type=${type}&note=${noteId}`,
      header
    );
  }
  deletePreviousNote(type, noteId): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/delete_note/?type=${type}&note=${noteId}`,
      header
    );
  }
  addNote(note, memberId): Observable<any> {
    // console.log(note.highlightedNote)
    const form = new FormData();
    form.append("text", note.noteText);
    form.append("member", memberId);
    if (note.highlightedNote == null) {
      note.highlightedNote = false;
    }
    form.append("highlighted", note.highlightedNote);

    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    return this.http.post<any>(
      environment.baseUrl + "/add_note/",
      form,
      header
    );
  }

  updateHighlighteddNote1(id, note) {
    const form = new FormData();
    form.append("note", id);
    form.append("text", note.notes);
    form.append("coach_name", note.coach);
    form.append("created", note.date);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    console.log(header);
    return this.http.post<any>(
      environment.baseUrl + "/update_note/",
      form,
      header
    );
  }

  updateHighlighteddNote2(id, note) {
    const form = new FormData();
    form.append("note", id);
    form.append("text", note.notes);
    form.append("coach_name", note.coach);
    form.append("created", note.date);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    console.log(header);
    return this.http.post<any>(
      environment.baseUrl + "/update_baseline_note/",
      form,
      header
    );
  }

  updateHighlighteddNote3(id, note) {
    const form = new FormData();
    form.append("note", id);
    form.append("text", note.notes);
    form.append("coach_name", note.coach);
    form.append("created", note.date);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    console.log(header);
    return this.http.post<any>(
      environment.baseUrl + "/update_body_note/",
      form,
      header
    );
  }

  getCheckInRemider(member): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + "/check_in_reminder/?member=" + member,
      header
    );
  }
  updateTrainingNote(id, note): Observable<any> {
    const form = new FormData();
    form.append("note", id);
    form.append("text", note.notes);
    form.append("coach_name", note.coach);
    form.append("created", note.date);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    return this.http.post<any>(
      environment.baseUrl + "/update_training_note/",
      form,
      header
    );
  }

  dismissSnoozeCheckInReminder(dismiss,member): Observable<any> {
    const form = new FormData();
    form.append("dismiss",dismiss);
    form.append("member", member);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/snooze_dismiss_check_in/`,
      form,
      header
    );
  }
  
  addBaselineNote(note, memberId): Observable<any> {
    // console.log(note.highlightedNote)
    const form = new FormData();
    form.append("text", note.noteText);
    form.append("member", memberId);
    if (note.highlightedNote == null) {
      note.highlightedNote = false;
    }
    form.append("highlighted", note.highlightedNote);

    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/add_baseline_note/",
      form,
      header
    );
  }

  addTrainingNote(note, memberId): Observable<any> {
    // console.log(note.highlightedNote)
    const form = new FormData();
    form.append("text", note.note_for_patient);
    form.append("member", memberId);
    if (note.highlightedNote == null) {
      note.highlightedNote = false;
    }
    form.append("highlighted", note.highlightedNote);

    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/add_training_note/",
      form,
      header
    );
  }

  addBodyNote(note, memberId): Observable<any> {
    // console.log(note.highlightedNote)
    const form = new FormData();
    form.append("text", note.noteText);
    form.append("member", memberId);
    if (note.highlightedNote == null) {
      note.highlightedNote = false;
    }
    form.append("highlighted", note.highlightedNote);

    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/add_body_note/",
      form,
      header
    );
  }
  getUserNote(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_user_note/?member=${id}`,
      header
    );
  }

  getAdditionalNote(email): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_extra/?email=${email}`,
      header
    );
  }

  UpdateUserNote(note, id): Observable<any> {
    const form = new FormData();
    form.append("text", note.Text);
    form.append("member", id);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/update_user_note/",
      form,
      header
    );
  }
  UpdateUserNote2(note, id): Observable<any> {
    const form = new FormData();

    form.append("notes", note.Text2);
    form.append("member", id);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/edit_user_acc_notes/",
      form,
      header
    );
  }
  getHighlightedNotes(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_highlighted_notes/?member=${id}`,
      header
    );
  }
  getTrainingHighlightedNotes(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_highlighted_training_notes/?member=${id}`,
      header
    );
  }

  getHighlightedNotesBaseline(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_highlighted_baseline_notes/?member=${id}`,
      header
    );
  }

  getHighlightedNotesBody(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_highlighted_body_notes/?member=${id}`,
      header
    );
  }
  getPreviousNotes(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_all_notes/?member=${id}`,
      header
    );
  }
  getTrainingAllNotes(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_all_training_notes/?member=${id}`,
      header
    );
  }

  getPreviousNotesBaseline(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_all_baseline_notes/?member=${id}`,
      header
    );
  }

  getPreviousNotesBody(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_all_body_notes/?member=${id}`,
      header
    );
  }

  getPreviousDate(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_old_baseline/?member=${id}`,
      header
    );
  }

  addBaseLineEntry(baseline, memberId): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    const form = new FormData();
    form.append("height", baseline.height);
    form.append("weight", baseline.weight);
    form.append("left_grip", baseline.left_grip);
    form.append("right_grip", baseline.right_grip);
    form.append("leg_strength_test", baseline.leg_strength_test);
    form.append("leg_strength_test_reps", baseline.leg_strength_test_reps);
    form.append("single_leg_balance_test", baseline.single_leg_balance_test);
    form.append(
      "single_leg_balance_test_left",
      baseline.single_leg_balance_test_left
    );
    form.append(
      "single_leg_balance_test_right",
      baseline.single_leg_balance_test_right
    );
    form.append("x3_chest_press", baseline.x3_chest_press);
    form.append("x3_chest_press_reps", baseline.x3_chest_press_reps);
    form.append("x3_bicep_curl", baseline.x3_bicep_curl);
    form.append("x3_bicep_curl_reps", baseline.x3_bicep_curl_reps);
    form.append("b_tracks", baseline.b_tracks);
    form.append("hip", baseline.hip);
    form.append("waist", baseline.waist);
    form.append("hip_waist_ratio", baseline.hip_waist_ratio);
    form.append("body_fat_perc", baseline.body_fat_perc);
    form.append("lean_mass", baseline.lean_mass);
    form.append("fat_mass", baseline.fat_mass);
    if (!baseline.date) {
      baseline.date = "";
    } else {
      var today = new Date(baseline.date);
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
      baseline.date = time;
    }
    form.append("baseline_created", baseline.date);

    form.append("member", memberId);

    return this.http.post<any>(
      environment.baseUrl + "/add_baseline_form/",
      form,
      header
    );
  }

  //----START------ SEND/POST PROGRESS FORM DATA----------//

  addTrainingEntry(progress, memberId): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    const form = new FormData();
    form.append("chest_press_band", progress.chest_press_band);
    form.append("chest_press_reps", progress.chest_press_reps);
    form.append("chest_press_partials", progress.chest_press_partials);
    form.append("squat_band", progress.squat_band);
    form.append("squat_reps", progress.squat_reps);
    form.append("squat_partials", progress.squat_partials);
    form.append("overhead_press_band", progress.overhead_press_band);
    form.append("overhead_press_reps", progress.overhead_press_reps);
    form.append("overhead_press_partials", progress.overhead_press_partials);
    form.append("tricep_push_band", progress.tricep_push_band);
    form.append("tricep_push_reps", progress.tricep_push_reps);
    form.append("tricep_push_partials", progress.tricep_push_partials);
    form.append("chest_flys_band", progress.chest_flys_band);
    form.append("chest_flys_reps", progress.chest_flys_reps);
    form.append("chest_flys_partials", progress.chest_flys_partials);
    // form.append("dead_lift_band", progress.dead_lift_band);
    // form.append("dead_lift_reps", progress.dead_lift_reps);
    // form.append("dead_lift_partials", progress.dead_lift_partials);
    // form.append("bent_row_band", progress.bent_row_band);
    // form.append("bent_row_reps", progress.bent_row_reps);
    // form.append("bent_row_partials", progress.bent_row_partials);
    // form.append("bicep_curl_band", progress.bicep_curl_band);
    // form.append("bicep_curl_reps", progress.bicep_curl_reps);
    // form.append("bicep_curl_partials", progress.bicep_curl_partials);
    // form.append("calf_raise_band", progress.calf_raise_band);
    // form.append("calf_raise_reps", progress.calf_raise_reps);
    // form.append("calf_raise_partials", progress.calf_raise_partials);
    form.append("Training Created", "");
    form.append("member", memberId);

    return this.http.post<any>(
      environment.baseUrl + "/add_training_push_form/",
      form,
      header
    );
  }

  addTrainingPullEntry(progress, memberId): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    const form = new FormData();
    // form.append("chest_press_band", progress.chest_press_band);
    // form.append("chest_press_reps", progress.chest_press_reps);
    // form.append("chest_press_partials", progress.chest_press_partials);
    // form.append("squat_band", progress.squat_band);
    // form.append("squat_reps", progress.squat_reps);
    // form.append("squat_partials", progress.squat_partials);
    // form.append("overhead_press_band", progress.overhead_press_band);
    // form.append("overhead_press_reps", progress.overhead_press_reps);
    // form.append("overhead_press_partials", progress.overhead_press_partials);
    // form.append("tricep_push_band", progress.tricep_push_band);
    // form.append("tricep_push_reps", progress.tricep_push_reps);
    // form.append("tricep_push_partials", progress.tricep_push_partials);
    // form.append("chest_flys_band", progress.chest_flys_band);
    // form.append("chest_flys_reps", progress.chest_flys_reps);
    // form.append("chest_flys_partials", progress.chest_flys_partials);
    form.append("dead_lift_band", progress.dead_lift_band);
    form.append("dead_lift_reps", progress.dead_lift_reps);
    form.append("dead_lift_partials", progress.dead_lift_partials);
    form.append("bent_row_band", progress.bent_row_band);
    form.append("bent_row_reps", progress.bent_row_reps);
    form.append("bent_row_partials", progress.bent_row_partials);
    form.append("bicep_curl_band", progress.bicep_curl_band);
    form.append("bicep_curl_reps", progress.bicep_curl_reps);
    form.append("bicep_curl_partials", progress.bicep_curl_partials);
    form.append("calf_raise_band", progress.calf_raise_band);
    form.append("calf_raise_reps", progress.calf_raise_reps);
    form.append("calf_raise_partials", progress.calf_raise_partials);
    form.append("Training Created", "");
    form.append("member", memberId);

    return this.http.post<any>(
      environment.baseUrl + "/add_training_pull_form/",
      form,
      header
    );
  }

  //----END------ SEND/POST PROGRESS FORM DATA----------//

  getLatestTraining(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_latest_training/?member=${id}`,
      header
    );
  }

  addBodyEntry(baseline, memberId): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    const form = new FormData();
    form.append("right_neck_front", baseline.right_neck_front);
    form.append("left_neck_front", baseline.left_neck_front);
    form.append("right_shoulder_front", baseline.right_shoulder_front);
    form.append("left_shoulder_front", baseline.left_shoulder_front);
    form.append("right_elbow_front", "0");
    form.append("left_elbow_front", "0");
    form.append("right_hand_front", baseline.right_hand_front);
    form.append("left_hand_front", baseline.left_hand_front);
    form.append("right_hip_front", baseline.right_hip_front);
    form.append("left_hip_front", baseline.left_hip_front);
    form.append("right_knee_front", baseline.right_knee_front);
    form.append("left_knee_front", baseline.left_knee_front);
    form.append("right_ankle_front", baseline.right_ankle_front);
    form.append("left_ankle_front", baseline.left_ankle_front);
    form.append("bottom_right_foot", baseline.bottom_right_foot);
    form.append("bottom_left_foot", baseline.bottom_left_foot);
    form.append("right_neck_back", baseline.right_neck_back);
    form.append("left_neck_back", baseline.left_neck_back);
    form.append("right_shoulder_back", baseline.right_shoulder_back);
    form.append("left_shoulder_back", baseline.left_shoulder_back);
    form.append("right_elbow_back", baseline.right_elbow_back);
    form.append("left_elbow_back", baseline.left_elbow_back);
    form.append("right_hand_back", baseline.right_hand_back);
    form.append("left_hand_back", baseline.left_hand_back);
    form.append("right_hip_back", "0");
    form.append("left_hip_back", "0");
    form.append("right_knee_back", baseline.right_knee_back);
    form.append("left_knee_back", baseline.left_knee_back);
    form.append("right_ankle_back", baseline.right_ankle_back);
    form.append("left_ankle_back", baseline.left_ankle_back);

    if (!baseline.date) {
      baseline.date = "";
    } else {
      var today = new Date(baseline.date);
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
      baseline.date = time;
    }
    form.append("body_created", baseline.date);
    form.append("member", memberId);

    return this.http.post<any>(
      environment.baseUrl + "/add_body_form/",
      form,
      header
    );
  }

  setGoals(goals, id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    const form = new FormData();
    form.append("height", goals.height ? goals.height : 0),
      form.append("height_symbol", goals.height_symbol),
      form.append("weight", goals.weight ? goals.weight : 0),
      form.append("weight_symbol", goals.weight_symbol),
      form.append("b_tracks", goals.b_tracks ? goals.b_tracks : 0),
      form.append("b_tracks_symbol", goals.b_tracks_symbol),
      form.append("hip", goals.hip ? goals.hip : 0),
      form.append("hip_symbol", goals.hip_symbol),
      form.append("waist", goals.waist ? goals.waist : 0),
      form.append("waist_symbol", goals.waist_symbol),
      form.append(
        "hip_waist_ratio",
        goals.hip_waist_ratio ? goals.hip_waist_ratio : 0
      ),
      form.append("hip_waist_ratio_symbol", goals.hip_waist_ratio_symbol),
      form.append(
        "body_fat_perc",
        goals.body_fat_perc ? goals.body_fat_perc : 0
      ),
      form.append("body_fat_perc_symbol", goals.body_fat_perc_symbol),
      form.append("fat_mass", goals.fat_mass ? goals.fat_mass : 0),
      form.append("fat_mass_symbol", goals.fat_mass_symbol),
      form.append("lean_mass", goals.lean_mass ? goals.lean_mass : 0),
      form.append("lean_mass_symbol", goals.lean_mass_symbol),
      form.append("left_grip", goals.left_grip ? goals.left_grip : 0),
      form.append("left_grip_symbol", goals.right_grip_symbol),
      form.append("right_grip", goals.right_grip ? goals.right_grip : 0),
      form.append("right_grip_symbol", goals.right_grip_symbol),
      form.append("leg_strength_test", goals.leg_strength_test),
      form.append(
        "leg_strength_test_reps",
        goals.leg_strength_test_reps ? goals.leg_strength_test_reps : 0
      ),
      form.append(
        "leg_strength_test_reps_symbol",
        goals.leg_strength_test_reps_symbol
      ),
      form.append("single_leg_balance_test", goals.single_leg_balance_test),
      form.append(
        "single_leg_balance_test_left",
        goals.single_leg_balance_test_left
          ? goals.single_leg_balance_test_left
          : 0
      ),
      form.append(
        "single_leg_balance_test_left_symbol",
        goals.single_leg_balance_test_left_symbol
      ),
      form.append(
        "single_leg_balance_test_right",
        goals.single_leg_balance_test_right
          ? goals.single_leg_balance_test_right
          : 0
      ),
      form.append(
        "single_leg_balance_test_right_symbol",
        goals.single_leg_balance_test_right_symbol
      ),
      form.append("x3_chest_press", goals.x3_chest_press),
      form.append(
        "x3_chest_press_reps",
        goals.x3_chest_press_reps ? goals.x3_chest_press_reps : 0
      ),
      form.append(
        "x3_chest_press_reps_symbol",
        goals.x3_chest_press_reps_symbol
      ),
      form.append("x3_bicep_curl", goals.x3_bicep_curl),
      form.append(
        "x3_bicep_curl_reps",
        goals.x3_bicep_curl_reps ? goals.x3_bicep_curl_reps : 0
      ),
      form.append("x3_bicep_curl_reps_symbol", goals.x3_bicep_curl_reps_symbol),
      form.append(
        "chest_press_band",
        goals.chest_press_band ? goals.chest_press_band : 0
      ),
      form.append("chest_press_band_symbol", goals.chest_press_band_symbol),
      form.append(
        "chest_press_partials",
        goals.chest_press_partials ? goals.chest_press_partials : 0
      ),
      form.append(
        "chest_press_partials_symbol",
        goals.chest_press_partials_symbol
      ),
      form.append(
        "chest_press_reps",
        goals.chest_press_reps ? goals.chest_press_reps : 0
      ),
      form.append("chest_press_reps_symbol", goals.chest_press_reps_symbol),
      form.append("squat_band", goals.squat_band ? goals.squat_band : 0),
      form.append("squat_band_symbol", goals.squat_band_symbol),
      form.append(
        "squat_partials",
        goals.squat_partials ? goals.squat_partials : 0
      ),
      form.append("squat_partials_symbol", goals.squat_partials_symbol),
      form.append("squat_reps", goals.squat_reps ? goals.squat_reps : 0),
      form.append("squat_reps_symbol", goals.squat_reps_symbol),
      form.append(
        "overhead_press_band",
        goals.overhead_press_band ? goals.overhead_press_band : 0
      ),
      form.append(
        "overhead_press_band_symbol",
        goals.overhead_press_band_symbol
      ),
      form.append(
        "overhead_press_partials",
        goals.overhead_press_partials ? goals.overhead_press_partials : 0
      ),
      form.append(
        "overhead_press_partials_symbol",
        goals.overhead_press_partials_symbol
      ),
      form.append(
        "overhead_press_reps",
        goals.overhead_press_reps ? goals.overhead_press_reps : 0
      ),
      form.append(
        "overhead_press_reps_symbol",
        goals.overhead_press_reps_symbol
      ),
      form.append(
        "tricep_push_band",
        goals.tricep_push_band ? goals.tricep_push_band : 0
      ),
      form.append("tricep_push_band_symbol", goals.tricep_push_band_symbol),
      form.append(
        "tricep_push_partials",
        goals.tricep_push_partials ? goals.tricep_push_partials : 0
      ),
      form.append(
        "tricep_push_partials_symbol",
        goals.tricep_push_partials_symbol
      ),
      form.append(
        "tricep_push_reps",
        goals.tricep_push_reps ? goals.tricep_push_reps : 0
      ),
      form.append("tricep_push_reps_symbol", goals.tricep_push_reps_symbol),
      form.append(
        "chest_flys_band",
        goals.chest_flys_band ? goals.chest_flys_band : 0
      ),
      form.append("chest_flys_band_symbol", goals.chest_flys_band_symbol),
      form.append(
        "chest_flys_partials",
        goals.chest_flys_partials ? goals.chest_flys_partials : 0
      ),
      form.append(
        "chest_flys_partials_symbol",
        goals.chest_flys_partials_symbol
      ),
      form.append(
        "chest_flys_reps",
        goals.chest_flys_reps ? goals.chest_flys_reps : 0
      ),
      form.append("chest_flys_reps_symbol", goals.chest_flys_reps_symbol),
      form.append(
        "dead_lift_band",
        goals.dead_lift_band ? goals.dead_lift_band : 0
      ),
      form.append("dead_lift_band_symbol", goals.dead_lift_band_symbol),
      form.append(
        "dead_lift_partials",
        goals.dead_lift_partials ? goals.dead_lift_partials : 0
      ),
      form.append("dead_lift_partials_symbol", goals.dead_lift_partials_symbol),
      form.append(
        "dead_lift_reps",
        goals.dead_lift_reps ? goals.dead_lift_reps : 0
      ),
      form.append("dead_lift_reps_symbol", goals.dead_lift_reps_symbol),
      form.append(
        "bent_row_band",
        goals.bent_row_band ? goals.bent_row_band : 0
      ),
      form.append("bent_row_band_symbol", goals.bent_row_band_symbol),
      form.append(
        "bent_row_partials",
        goals.bent_row_partials ? goals.bent_row_partials : 0
      ),
      form.append("bent_row_partials_symbol", goals.bent_row_partials_symbol),
      form.append(
        "bent_row_reps",
        goals.bent_row_reps ? goals.bent_row_reps : 0
      ),
      form.append("bent_row_reps_symbol", goals.bent_row_reps_symbol),
      form.append(
        "bicep_curl_band",
        goals.bicep_curl_band ? goals.bicep_curl_band : 0
      ),
      form.append("bicep_curl_band_symbol", goals.bicep_curl_band_symbol),
      form.append(
        "bicep_curl_partials",
        goals.bicep_curl_partials ? goals.bicep_curl_partials : 0
      ),
      form.append(
        "bicep_curl_partials_symbol",
        goals.bicep_curl_partials_symbol
      ),
      form.append(
        "bicep_curl_reps",
        goals.bicep_curl_reps ? goals.bicep_curl_reps : 0
      ),
      form.append("bicep_curl_reps_symbol", goals.bicep_curl_reps_symbol),
      form.append(
        "calf_raise_band",
        goals.calf_raise_band ? goals.calf_raise_band : 0
      ),
      form.append("calf_raise_band_symbol", goals.calf_raise_band_symbol),
      form.append(
        "calf_raise_partials",
        goals.calf_raise_partials ? goals.calf_raise_partials : 0
      ),
      form.append(
        "calf_raise_partials_symbol",
        goals.calf_raise_partials_symbol
      ),
      form.append(
        "calf_raise_reps",
        goals.bicep_calf_raise_reps ? goals.calf_raise_reps : 0
      ),
      form.append("calf_raise_reps_symbol", goals.calf_raise_reps_symbol),
      form.append("right_neck_front", goals.right_neck_front),
      form.append("right_neck_front_symbol", goals.right_neck_front_symbol),
      form.append("left_neck_front", goals.left_neck_front),
      form.append("left_neck_front_symbol", goals.left_neck_front_symbol),
      form.append("right_shoulder_front", goals.right_shoulder_front),
      form.append(
        "right_shoulder_front_symbol",
        goals.right_shoulder_front_symbol
      ),
      form.append("left_shoulder_front", goals.left_shoulder_front),
      form.append(
        "left_shoulder_front_symbol",
        goals.left_shoulder_front_symbol
      ),
      form.append("right_elbow_front", goals.right_elbow_front),
      form.append("right_elbow_front_symbol", goals.right_elbow_front_symbol),
      form.append("left_elbow_front", goals.left_elbow_front),
      form.append("left_elbow_front_symbol", goals.left_elbow_front_symbol),
      form.append("right_hand_front", goals.right_hand_front),
      form.append("right_hand_front_symbol", goals.right_hand_front_symbol),
      form.append("left_hand_front", goals.left_hand_front),
      form.append("left_hand_front_symbol", goals.left_hand_front_symbol),
      form.append("right_hip_front", goals.right_hip_front),
      form.append("right_hip_front_symbol", goals.right_hip_front_symbol),
      form.append("left_hip_front", goals.left_hip_front),
      form.append("left_hip_front_symbol", goals.left_hip_front_symbol),
      form.append("right_knee_front", goals.right_knee_front),
      form.append("right_knee_front_symbol", goals.right_knee_front_symbol),
      form.append("left_knee_front", goals.left_knee_front),
      form.append("left_knee_front_symbol", goals.left_knee_front_symbol),
      form.append("right_ankle_front", goals.right_ankle_front),
      form.append("right_ankle_front_symbol", goals.right_ankle_front_symbol),
      form.append("left_ankle_front", goals.left_ankle_front),
      form.append("left_ankle_front_symbol", goals.left_ankle_front_symbol),
      form.append("bottom_right_foot", goals.bottom_right_foot),
      form.append("bottom_right_foot_symbol", goals.bottom_right_foot_symbol),
      form.append("bottom_left_foot", goals.bottom_left_foot),
      form.append("bottom_left_foot_symbol", goals.bottom_left_foot_symbol),
      form.append("right_neck_back", goals.right_neck_back),
      form.append("right_neck_back_symbol", goals.right_neck_back_symbol),
      form.append("left_neck_back", goals.left_neck_back),
      form.append("left_neck_back_symbol", goals.left_neck_back_symbol),
      form.append("right_shoulder_back", goals.right_shoulder_back),
      form.append(
        "right_shoulder_back_symbol",
        goals.right_shoulder_back_symbol
      ),
      form.append("left_shoulder_back", goals.left_shoulder_back),
      form.append("left_shoulder_back_symbol", goals.left_shoulder_back_symbol),
      form.append("right_elbow_back", goals.right_elbow_back),
      form.append("right_elbow_back_symbol", goals.right_elbow_back_symbol),
      form.append("left_elbow_back", goals.left_elbow_back),
      form.append("left_elbow_back_symbol", goals.left_elbow_back_symbol),
      form.append("right_hand_back", goals.right_hand_back),
      form.append("right_hand_back_symbol", goals.right_hand_back_symbol),
      form.append("left_hand_back", goals.left_hand_back),
      form.append("left_hand_back_symbol", goals.left_hand_back_symbol),
      form.append("right_hip_back", goals.right_hip_back),
      form.append("right_hip_back_symbol", goals.right_hip_back_symbol),
      form.append("left_hip_back", goals.left_hip_back),
      form.append("left_hip_back_symbol", goals.left_hip_back_symbol),
      form.append("right_knee_back", goals.right_knee_back),
      form.append("right_knee_back_symbol", goals.right_knee_back_symbol),
      form.append("left_knee_back", goals.left_knee_back),
      form.append("left_knee_back_symbol", goals.right_knee_back_symbol),
      form.append("right_ankle_back", goals.right_ankle_back),
      form.append("right_ankle_back_symbol", goals.right_ankle_back_symbol),
      form.append("left_ankle_back", goals.left_ankle_back),
      form.append("left_ankle_back_symbol", goals.left_ankle_back_symbol),
      form.append("member", id);

    return this.http.post<any>(
      environment.baseUrl + `/set_goals/?member=${id}`,
      form,
      header
    );
  }

  getGoals(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_goals/?member=${id}`,
      header
    );
  }

  getGoalsDifference(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_goals_difference/?member=${id}`,
      header
    );
  }
  getTrainingGoalsDifference(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_training_goals_difference/?member=${id}`,
      header
    );
  }

  getLatestBaseLine(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_latest_baseline/?member=${id}`,
      header
    );
  }

  getLocationDetails(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_location_details/`,
      header
    );
  }

  getOldBaseLine(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_old_baseline/?member=${id}`,
      header
    );
  }

  getOldTraining(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_old_training/?member=${id}`,
      header
    );
  }

  getBaseLineChart(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_history/?category=baseline&member=${id}`,
      header
    );
  }

  getTrainingChart(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_history/?category=training&member=${id}`,
      header
    );
  }

  getQuickTasks(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_quicktasks/?member=${id}`,
      header
    );
  }

  postQuickTasks(task, id): Observable<any> {
    const form = new FormData();
    form.append("field", task.field), form.append("value", task.value);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/post_quicktasks/?member=${id}`,
      form,
      header
    );
  }
  getBodyChart(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_history/?category=body&member=${id}`,
      header
    );
  }
  getPreWrittenText(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_prewritten_text/`,
      header
    );
  }
  sendPreWrittenText(body): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/send_msg/`,
      body,
      header
    );
  }
  deleteMessage(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    return this.http.delete<any>(
      environment.baseUrl + `/delete_prewritten_text/?id=${id}`,
      header
    );
  }
  createMessage(message): Observable<any> {
    const form = new FormData();
    form.append("message", message);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    return this.http.post<any>(
      environment.baseUrl + `/create_prewritten_text/`,
      form,
      header
    );
  }
  updateMessage(message, id): Observable<any> {
    const form = new FormData();
    form.append("message", message);
    form.append("id", id);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    return this.http.post<any>(
      environment.baseUrl + `/update_prewritten_text/`,
      form,
      header
    );
  }


  getX3PushNotes(member): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_training_push_notes/?member=${member}`,
      header
    );
  }
  getX3PullNotes(member): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_training_pull_notes/?member=${member}`,
      header
    );
  }
  updateX3PushNotes(data,member): Observable<any> {
    const form = new FormData();
    form.append("member",member)
    form.append("chest_press_note",data.chest_press_note)
    form.append("squat_note",data.squat_note)
    form.append("overhead_press_note",data.overhead_press_note)
    form.append("tricep_push_note",data.tricep_push_note)
    form.append("chest_flys_note",data.chest_flys_note)
    
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/update_training_push_notes/?member=${member}`,
      form,
      header
    );
  }

  updateX3PullNotes(data,member): Observable<any> {
    const form = new FormData();
    form.append("member",member)
    form.append("dead_lift_note",data.dead_lift_note)
    form.append("bent_row_note",data.bent_row_note)
    form.append("bicep_curl_note",data.bicep_curl_note)
    form.append("calf_raise_note",data.calf_raise_note)
    
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/update_training_pull_notes/?member=${member}`,
      form,
      header
    );
  }

  // sticky apis
  getPreSticyText(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/prewritten_sticky_note/`,
      header
    );
  }


  sendPreSticyText(body): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/prewritten_sticky_note/`,
      body,
      header
    );
  }

  updatePreSticyText(body): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.put<any>(
      environment.baseUrl + `/prewritten_sticky_note/`,
      body,
      header
    );
  }

  deletePreSticyText(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.delete<any>(
      environment.baseUrl + `/prewritten_sticky_note/?id=${id}`,
      header
    );
  }

  sendSticky(body): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/sticky_note/`,
      body,
      header
    );
  }

  getStickyNotes(member): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/sticky_note/?member=${member}`,
      header
    );
  }

  deleteStickyNotes(id,dismiss): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.delete<any>(
      environment.baseUrl + `/sticky_note/?id=${id}&dismiss=${dismiss}`,
      header
    );
  }

  getFutureAppointmentsList(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_future_appointment_list/`,
      header
    );
  }

  getUserActiveCampaign(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/get_contact_active_campaign/?member=${id}`,
      header
    );
  }

  addActiveCampaign(user): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };

    return this.http.post<any>(
      environment.baseUrl + `/add_contact_active_campaign/`,
      user,
      header
    );
  }
}
