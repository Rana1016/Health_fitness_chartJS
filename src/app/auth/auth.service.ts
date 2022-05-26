import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment.staging";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = null;
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem("token")) {
      this.user = JSON.parse(localStorage.getItem("token"));
    }
  }
  isLoggedIn = false;

  signIn(form): Observable<any> {
    var forms = new FormData();
    forms.append("email", form.userName);
    forms.append("password", form.password);
    forms.append("rememberMe", form.rememberMe);
    return this.http.post<any>(environment.baseUrl + "/sign_in/", forms);
  }
  sentemail(form, host_web): Observable<any> {
    return this.http.get<any>(
      environment.baseUrl +
        "/forgot_password/?email=" +
        form.email +
        "&domain=" +
        host_web
    );
  }
  changepass(form): Observable<any> {
    var forms = new FormData();
    forms.append("password", form.password1);
    forms.append("confirm_password", form.password2);
    forms.append("uid", this.user.uid);
    forms.append("token", this.user.token);
    return this.http.post<any>(
      environment.baseUrl + "/set_new_password/",
      forms
    );
  }

  logout(): void {
    var user = JSON.parse(localStorage.getItem("user"));
    console.log(user.token_key);
    var header = {
      headers: new HttpHeaders().set(
        "Authorization",
        `Token ${user.token_key}`
      ),
    };
    this.isLoggedIn = false;
    localStorage.removeItem("user");
    localStorage.removeItem("appointmentId")
    this.router.navigate(["/login"]);
  }
}
