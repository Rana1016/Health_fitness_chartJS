import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.staging";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  user = null;
  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("user"));
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

  getCalendarId(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/validate_acuity_calendar_id/`,
      header
    );
  }

  getLocationCalendarIds(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/update_acuity_menu/`,
      header
    );
  }

  updateCalendarIds(calendarId): Observable<any> {
    const form = new FormData();
    form.append("calendar_dict", JSON.stringify(calendarId));
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/update_acuity_menu/`,
      form,
      header
    );
  }
  addLocation(locationData): Observable<any> {
    const form = new FormData();
    form.append("location_name",locationData.locationName),
    form.append("time_zone",locationData.timeZone),
    form.append("coach_first_name",locationData.firstName),
    form.append("coach_last_name",locationData.lastName),
    form.append("coach_email",locationData.emailAddress),
    form.append("coach_password",locationData.password),
    form.append("coach_phone",locationData.phoneNumber),
    form.append("coach_dob",locationData.dob),
    form.append("activecampaign_key",locationData.api_key),
    form.append("active_campaign_base_url",locationData.base_url)
    form.append("activecampaign_url",locationData.api_url),
    form.append("acuity_key",locationData.acuity_key),
    form.append("acuity_userid",locationData.acuity_user_id)

    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + `/add_location_and_coach/`,
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

  getBaseline(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(environment.baseUrl + `/update_baseline_menu/`, header);
  }

  updateBaseline(obj): Observable<any> {
    const form = new FormData();
    form.append("baseline_reminder",obj.baseline_reminder)
    form.append("x3_chest_and_bicep_flag",obj.x3_chest_and_bicep_flag)
    form.append("b_tracks_flag",obj.b_tracks_flag)
    form.append("weight_management_flag",obj.weight_management_flag)
    form.append("training_tab_flag",obj.training_tab_flag)
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(environment.baseUrl + `/update_baseline_menu/`,form, header);
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
    form.append("note_count", user.note_count);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post(environment.baseUrl + "/update_user/", form, header);
  }

  viewReport(report): Observable<any>{
    console.log(report);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(environment.baseUrl + report,header);
  }

  generateReport(report): Observable<any>{
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(environment.baseUrl + report,header);
  }

  getReports(): Observable<any>{
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(environment.baseUrl + '/reports',header);
  }

  getReport(id): Observable<any>{
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(environment.baseUrl + '/reports/' + id ,header);
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

  getAllReminders(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/check_in_reminder/`,
      header
    );
  }

  addReminder(data): Observable<any> {
    const form = new FormData();
    form.append("check_in_number", data.checkInNumber);
    form.append("action", data.selectModule);
    form.append("message", data.message);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.post<any>(
      environment.baseUrl + "/check_in_reminder/",
      form,
      header
    );
  }
  updateReminder(data,reminderobj): Observable<any> {
    const form = new FormData();
    form.append("check_in_number", data.checkInNumber);
    form.append("action", data.selectModule);
    form.append("message", data.message);
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.patch<any>(
      environment.baseUrl + `/check_in_reminder/${reminderobj.id}/`,
      form,
      header
    );
  }
  deleteReminder(id): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.delete<any>(
      environment.baseUrl + `/check_in_reminder/${id}/`,
      header
    );
  }
  checkAutomation(automation_name): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.get<any>(
      environment.baseUrl + `/check_automation/?automation_name=${automation_name}`,
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

  updateCheckAutomation(automation_name): Observable<any> {
    const form = new FormData();
    form.append("automation_name",automation_name)
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.put<any>(
      environment.baseUrl + `/update_delete_automation_name/`,
      form,
      header
    );
  }
  deleteCheckAutomation(): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${JSON.parse(localStorage.getItem("user")).token_key}`
      ),
    };
    return this.http.delete<any>(
      environment.baseUrl + `/update_delete_automation_name/`,
      header
    );
  }
}
