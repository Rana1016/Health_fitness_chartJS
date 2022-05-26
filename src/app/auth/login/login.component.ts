import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
declare var $;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  login_class = false;
  reg_class = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}
  error = null;
  submitted = false;
  loginForm = this.fb.group({
    userName: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
        ),
      ],
    ],
    password: ["", [Validators.required, Validators.minLength(6)]],
    rememberMe: [""],
  });
  toggle_login() {
    this.login_class = true;
    this.reg_class = false;
  }

  toggle_reg() {
    this.login_class = false;
    this.reg_class = true;
  }

  signIn() {
    if (!this.loginForm.valid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    var form = this.loginForm.value;
    this.authService.signIn(form).subscribe(
      (res) => {
        this.authService.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(res));
        this.toastr.success("Login Successfully");
        (res.role !== "member")
          ? this.router.navigate(["/coach"])
          : this.router.navigate(["/patient"]);
      },
      (error) => {
        console.log("Error: ", error.error.Error);
        this.error = error.error.Error;
      }
    );
  }

  ngOnInit() {
    this.login_class = true;
  }
  fixAutoFill(usr: Event, pwd: string) {
    if (usr) {
      this.loginForm.value.userName = (usr.target as HTMLInputElement).value;
    }
    if (pwd) {
      this.loginForm.value.password = pwd;
    }
  }
}
