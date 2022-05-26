import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm,
} from "@angular/forms";
import { AdminService } from "../admin.service";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-super-admin",
  templateUrl: "./super-admin.component.html",
  styleUrls: ["./super-admin.component.scss"],
})
export class SuperAdminComponent implements OnInit {
  superAdminForm = new FormGroup({
    locationName: new FormControl("", [Validators.required]),
    timeZone:new FormControl("US/Central", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    emailAddress: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    phoneNumber: new FormControl("", [
      Validators.required,
      Validators.pattern("((([0-9]{3}))|[0-9]{3})[s-]?[\0-9]{3}[s-]?[0-9]{4}$"),
    ]),
    dob: new FormControl("", [Validators.required]),
    api_key: new FormControl(""),
    base_url: new FormControl(""),
    api_url: new FormControl(""),
    acuity_key: new FormControl(""),
    acuity_user_id: new FormControl(""),
  });
  submitForm = false;
  constructor(private adminService: AdminService, private toastr: ToastrService) {}

  ngOnInit() {}
  get superAdminFormData(): { [key: string]: AbstractControl } {
    return this.superAdminForm.controls;
  }
 
  handleFormSubmit() {
    if (!this.superAdminForm.valid) {
      this.submitForm = true;
      return;
    }
    this.submitForm = false;
    this.adminService.addLocation(this.superAdminForm.value).subscribe((res)=>{
      this.toastr.success("Form Submitted Successfully")
      this.superAdminForm.reset();
      this.superAdminForm.patchValue({
        timeZone:"US/Central"
      })
    },(error)=>{
      console.log(error)
    })
  }
}
