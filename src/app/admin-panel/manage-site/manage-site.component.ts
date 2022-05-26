import { Component, OnInit } from "@angular/core";
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
declare var $;

@Component({
  selector: "app-manage-site",
  templateUrl: "./manage-site.component.html",
  styleUrls: ["./manage-site.component.scss"],
})
export class ManageSiteComponent implements OnInit {
  submitForm = false;
  resultsFound = false;
  currentAutomationName = "";
  automationForm = new FormGroup({
    automationName: new FormControl("", [Validators.required]),
  });
  updateAutomationForm = new FormGroup({
    automationName: new FormControl("", [Validators.required]),
  });
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}
  get automationFormData(): { [key: string]: AbstractControl } {
    return this.automationForm.controls;
  }
  get updateAutomationFormData(): { [key: string]: AbstractControl } {
    return this.automationForm.controls;
  }

  ngOnInit() {
    this.getLocationAutomationData();
  }
  getLocationAutomationData() {
    this.adminService.getLocationDetails().subscribe((res) => {
      if (res.automation_name) {
        this.currentAutomationName = res.automation_name;
        this.resultsFound = true;
      }
    });
  }
  setAutomationData() {
    this.updateAutomationForm.patchValue({
      automationName: this.currentAutomationName,
    });
  }
  validate() {
    if (!this.automationForm.valid) {
      this.submitForm = true;
      return;
    }
    this.submitForm = false;
    this.adminService
      .checkAutomation(this.automationForm.value.automationName)
      .subscribe(
        (res) => {
          this.adminService
            .updateCheckAutomation(this.automationForm.value.automationName)
            .subscribe(
              (res) => {
                this.toastr.success("Automation Found");
                this.resultsFound = true;
                this.currentAutomationName =
                  this.automationForm.value.automationName;
                console.log(res);
              },
              (error) => {}
            );
        },
        (error) => {
          this.toastr.error(error.error.Error);
          this.resultsFound = false;
        }
      );
  }
  updateAutomatioData() {
    if (!this.updateAutomationForm.valid) {
      this.submitForm = true;
      return;
    }
    this.submitForm = false;
    this.adminService
      .checkAutomation(this.updateAutomationForm.value.automationName)
      .subscribe(
        () => {
          this.adminService
            .updateCheckAutomation(
              this.updateAutomationForm.value.automationName
            )
            .subscribe(
              (res) => {
                this.toastr.success("Automation Updated Successfully");
                this.resultsFound = true;
                this.currentAutomationName =
                  this.updateAutomationForm.value.automationName;
                $("#manageSiteUpdate").modal("hide");
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          this.toastr.error(error.error.Error);
          this.resultsFound = false;
        }
      );
  }
  deleteAutomationData() {
    this.adminService.deleteCheckAutomation().subscribe(
      (res) => {
        this.toastr.success("Automation Deleted Successfully");
        this.resultsFound = false;
        $("#automationDelete").modal("hide");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
