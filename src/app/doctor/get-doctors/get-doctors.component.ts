import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm,
} from "@angular/forms";

import { DoctorService } from "../doctor.service";
import { Output, EventEmitter } from "@angular/core";
import { ToastrService } from "ngx-toastr";

declare var $;

@Component({
  selector: "app-get-doctors",
  templateUrl: "./get-doctors.component.html",
  styleUrls: ["./get-doctors.component.scss"],
})
export class GetDoctorsComponent implements OnInit {
  @Input() showPopup = false;
  @Input() memberId = "";
  @Input() memDoctors = [];
  spinner = false;
  formTitle = "";
  btnTitle = "";
  noDoctor = false;
  submitted = false;
  doctors = [];
  @Output() modalClose = new EventEmitter<any>();
  doctorName = new FormControl();
  doctorObj: any;
  filteredValues = [];
  doctorForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    type: new FormControl(""),
    clinicLocation: new FormControl(""),
  });

  constructor(
    private doctorService: DoctorService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const that = this;
    $("#doctorName").on("hide.bs.modal", function (e) {
      that.closeModal();
    });
    this.doctorName.valueChanges.subscribe((newValue) => {
      this.filteredValues = this.filterValues(newValue);
      console.log(this.filteredValues);
      if (this.filteredValues.length === 0) {
        this.noDoctor = true;
        this.doctorForm.patchValue({
          firstName: this.doctorName.value,
        });
      } else {
        this.noDoctor = false;
      }
    });
  }
  filterValues(search: string) {
    return this.doctors.filter((value) =>
      value.name.toLowerCase().includes(search.toString().toLowerCase())
    );
  }
  ngOnChanges(changes: any) {
    if (changes.memberId) {
      this.memberId = changes.memberId.currentValue;
    }
    if (changes.showPopup && changes.showPopup.currentValue) {
      $("#doctorName").modal("show");
      this.getAllDoctors();
      this.doctorName.patchValue("");
    }
    if (changes.memDoctors) {
      this.memDoctors = changes.memDoctors.currentValue;
    }
  }

  updateDoctor() {
    if (!this.doctorForm.valid) {
      this.submitted = true;
      return;
    }
    this.submitted = false;
    if (this.btnTitle === "Add") {
      this.doctorService.addDoctor(this.doctorForm.value).subscribe(
        (res) => {
          this.doctors.push(res);
          this.toastr.success("Doctor Added Successfully.");
          this.doctorObj = res;
          this.setDoctor();
          this.doctorForm.reset();
          $("#addNewDoctor").modal("hide");
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.doctorService
        .updateDoctor(this.doctorObj.id, this.doctorForm.value)
        .subscribe(
          (res) => {
            const index = this.memDoctors.indexOf(this.doctorObj);
            this.memDoctors.splice(index, 1);
            this.memDoctors.push(res);
            this.toastr.success("Doctor Updated Successfully.");
            this.doctorForm.reset();
            $("#addNewDoctor").modal("hide");
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  setDoctorObj(doc) {
    this.doctorObj = doc;
    $("#deleteDoctor").modal("show");
  }
  removeDoctor() {
    this.doctorService.unBindDoctor(this.memberId, this.doctorObj.id).subscribe(
      (res) => {
        const index = this.memDoctors.indexOf(this.doctorObj);
        this.memDoctors.splice(index, 1);
        this.toastr.error("Doctor Removed Successfully.");
      },
      (error) => {}
    );
  }
  setAddNewDoctor() {
    this.formTitle = "Add a Member";
    this.btnTitle = "Add";
    $("#addNewDoctor").modal("show");
  }
  setDoctorProfile(doc) {
    this.doctorService.getMember(doc.get_email).subscribe(
      (res) => {
        $("#addNewDoctor").modal("show");
        this.doctorObj = doc;
        this.formTitle = "Update a Member";
        this.btnTitle = "Update";
        this.doctorForm.patchValue({
          firstName: res.get_first_name,
          lastName: res.get_last_name,
          type: doc.doctor_type,
          clinicLocation: doc.clinical_location,
        });
      },
      (error) => {}
    );
  }
  closeModal() {
    this.modalClose.emit("close");
  }
  get doctorFormData(): { [key: string]: AbstractControl } {
    return this.doctorForm.controls;
  }
  getAllDoctors() {
    this.spinner = true;
    this.doctorService.getDoctors().subscribe(
      (res) => {
        this.doctors = res;
        this.spinner = false;
      },
      (error) => {
        console.log(error);
        this.spinner = false;
      }
    );
  }

  getDoctor(doctor) {
    this.doctorObj = this.doctors.filter((doc) => doc.name === doctor.value)[0];
    $("#setDoctor").modal("show");
  }

  setDoctor() {
    const existingDoc = this.memDoctors.filter(
      (doc) => doc.id === this.doctorObj.id
    );
    console.log(existingDoc);
    this.doctorService.checkAutomation().subscribe(
      (res) => {
        if (existingDoc.length > 0) {
          this.toastr.error("Doctor Already Binded");
          this.doctorObj = "";
        } else {
          this.doctorService
            .bindDoctor(this.memberId, this.doctorObj.id)
            .subscribe(
              (res) => {
                this.memDoctors.push(this.doctorObj);
                this.toastr.success("Doctor Binded Successfully.");
                this.doctorObj = "";
              },
              (error) => {
                console.log(error);
              }
            );
        }
      },
      (error) => {
        this.toastr.error(
          "Please contact support@gotfollowup.com to enable the doctors automation"
        );
      }
    );
  }
}
