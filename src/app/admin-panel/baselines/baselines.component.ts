import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { Toast, ToastrService } from "ngx-toastr";

@Component({
  selector: "app-baselines",
  templateUrl: "./baselines.component.html",
  styleUrls: ["./baselines.component.scss"],
})
export class BaselinesComponent implements OnInit {
  chestFlag = false;
  bTracksFlag = false;
  weightManagementFlag = false;
  x3TrainingFlag = false;
  baselineReminder = 0;
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getBaslineValues();
  }

  getBaslineValues() {
    this.adminService.getBaseline().subscribe(
      (res) => {
        this.chestFlag = res.x3_chest_and_bicep_flag;
        this.bTracksFlag = res.b_tracks_flag;
        this.weightManagementFlag = res.weight_management_flag;
        this.x3TrainingFlag = res.training_tab_flag;
        this.baselineReminder = res.baseline_reminder;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateBaslineValues() {
    let obj = {
      baseline_reminder: this.baselineReminder,
      x3_chest_and_bicep_flag: this.chestFlag ? "True" : "False",
      weight_management_flag: this.weightManagementFlag ? "True" : "False",
      training_tab_flag: this.x3TrainingFlag ? "True" : "False",
      b_tracks_flag: this.bTracksFlag ? "True" : "False",
    };
    this.adminService.updateBaseline(obj).subscribe(
      (res) => {
        this.toastr.success("Baslines Updated Successfully.");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
