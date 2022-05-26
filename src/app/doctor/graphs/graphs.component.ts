import { Component, OnInit, Input } from "@angular/core";
import { DoctorService } from "../doctor.service";
import { DatePipe } from "@angular/common";
import { Output, EventEmitter } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import Compressor from "compressorjs";

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm,
} from "@angular/forms";
import { data } from "jquery";
declare var $;

@Component({
  selector: "app-graphs",
  templateUrl: "./graphs.component.html",
  styleUrls: ["./graphs.component.scss"],
})
export class GraphsComponent implements OnInit {
  @Input() memberId = "";
  @Input() user: any;
  @Input() locationDetails: any;
  @Output() showGraphs = new EventEmitter<any>();
  @Input() refreshGraphs: EventEmitter<boolean>;
  @Input() refreshPosturePics: EventEmitter<boolean>;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  graphLoaded: any;
  public barChartLabels = [];
  public barChartType = "line";
  public colors = [
    { borderColor: "#ff0000" },
    { borderColor: "#ffff00" },
    { borderColor: "#00ff00" },
    { borderColor: "#00ffff" },
  ];

  public barChartLabel = [];
  public barChartLegend = true;

  public barChartData = [];
  HGraph = {
    dataSets: [{ data: [] }],
  };
  BentRowBandGraph = {
    dataSets: [{ data: [] }],
  };

  BicepCurlBandGraph = {
    dataSets: [{ data: [] }],
  };

  CalfRaiseBandGraph = {
    dataSets: [{ data: [] }],
  };

  ChestFlysBandGraph = {
    dataSets: [{ data: [] }],
  };
  ChestPressBandGraph = {
    dataSets: [{ data: [] }],
  };

  DeadLiftBandGraph = {
    dataSets: [{ data: [] }],
  };

  OverheadPressBandGraph = {
    dataSets: [{ data: [] }],
  };

  SquatBandGraph = {
    dataSets: [{ data: [] }],
  };

  TricepPushBandGraph = {
    dataSets: [{ data: [] }],
  };

  HDates = [];
  BentRowBandDates = [];
  BentRowPartialsDates = [];
  BentRowRepsDates = [];
  BicepCurlBandDates = [];
  BicepCurlPartialsDates = [];
  BicepCurlRepsDates = [];
  CalfRaiseBandDates = [];
  CalfRaisePartialsDates = [];
  CalfRaiseRepsDates = [];
  ChestFlysBandDates = [];
  ChestFlysPartialsDates = [];
  ChestFlysRepsDates = [];
  ChestPressBandDates = [];
  ChestPressPartialsDates = [];
  ChestPressRepsDates = [];
  DeadLiftBandDates = [];
  DeadLiftPartialsDates = [];
  DeadLiftRepsDates = [];
  OverheadPressBandDates = [];
  OverheadPressPartialsDates = [];
  OverheadPressRepsDates = [];
  SquatBandDates = [];
  SquatPartialsDates = [];
  SquatRepsDates = [];
  TricepPushBandDates = [];
  TricepPushPartialsDates = [];
  TricepPushRepsDates = [];

  WDates = [];
  HipTestDates = [];
  WaistTestDates = [];
  TotalRatioDates = [];
  BodyFatDates = [];
  FatMassDates = [];
  LeanMassDates = [];
  BDates = [];
  LRDates = [];
  LegDates = [];
  Balance0Dates = [];
  Balance1Dates = [];
  Balance2Dates = [];
  chestDates = [];
  bicepDates = [];
  RightNeckDates = [];
  RightAnkleDates = [];
  LeftAnkleDates = [];
  RightFootDates = [];
  RightNeckBackDates = [];
  LeftNeckBackDates = [];
  RightAnkleBackDates = [];
  LeftAnkleBackDates = [];
  RightKneeBackDates = [];
  LeftKneeBackDates = [];
  RightHipBackDates = [];
  LeftHipBackDates = [];
  RightHandBackDates = [];
  LeftHandBackDates = [];
  RightElbowBackDates = [];
  LeftElbowBackDates = [];
  RightShoulderBackDates = [];
  LeftShoulderBackDates = [];
  LeftFootDates = [];
  LeftNeckDates = [];
  RightKneeDates = [];
  LeftKneeDates = [];
  RightElbowDates = [];
  LeftElbowDates = [];
  RightHandDates = [];
  LeftHandDates = [];
  LeftHipDates = [];
  RightHipDates = [];
  HandDates = [];
  HipDates = [];
  HamstringDates = [];
  CalfDates = [];
  RightShoulderDates = [];
  LeftShoulderDates = [];

  WGraph = {
    dataSets: [{ data: [] }],
  };

  bTracks = {
    dataSets: [{ data: [] }],
  };

  HipTest = {
    dataSets: [{ data: [] }],
  };
  WaistTest = {
    dataSets: [{ data: [] }],
  };
  TotalRatio = {
    dataSets: [{ data: [] }],
  };
  BodyFatTest = {
    dataSets: [{ data: [] }],
  };
  FatMassTest = {
    dataSets: [{ data: [] }],
  };
  LeanMassTest = {
    dataSets: [{ data: [] }],
  };
  LRGripGraph = {
    dataSets: [{ data: [] }],
  };

  LegGraphData = {
    dataSets: [{ data: [] }],
  };
  legLabels = ["Sit to stand", "Squat", "Split Squat"];

  BalanceTest0 = {
    dataSets: [{ data: [] }],
  };
  BalanceTest1 = {
    dataSets: [{ data: [] }],
  };
  BalanceTest2 = {
    dataSets: [{ data: [] }],
  };

  bicepData = {
    dataSets: [{ data: [] }],
  };

  chestData = {
    dataSets: [{ data: [] }],
  };

  bodyLabels = [];
  NeckLabels = [];
  bodyFront = {
    dataSets: [{ data: [] }],
  };

  RightNeckFront = {
    dataSets: [{ data: [] }],
  };
  LeftNeckFront = {
    dataSets: [{ data: [] }],
  };
  RightNeckBack = {
    dataSets: [{ data: [] }],
  };
  LeftNeckBack = {
    dataSets: [{ data: [] }],
  };

  Back = {
    dataSets: [{ data: [] }],
  };

  RightHamstrings = {
    dataSets: [{ data: [] }],
  };

  LeftHamstrings = {
    dataSets: [{ data: [] }],
  };

  RightCalf = {
    dataSets: [{ data: [] }],
  };
  LeftCalf = {
    dataSets: [{ data: [] }],
  };

  RightElbowFront = {
    dataSets: [{ data: [] }],
  };
  LeftElbowFront = {
    dataSets: [{ data: [] }],
  };
  RightElbowBack = {
    dataSets: [{ data: [] }],
  };
  LeftElbowBack = {
    dataSets: [{ data: [] }],
  };

  RightHandFront = {
    dataSets: [{ data: [] }],
  };
  LeftHandFront = {
    dataSets: [{ data: [] }],
  };
  RightHandBack = {
    dataSets: [{ data: [] }],
  };
  LeftHandBack = {
    dataSets: [{ data: [] }],
  };
  RightKnee = {
    dataSets: [{ data: [] }],
  };
  LeftKnee = {
    dataSets: [{ data: [] }],
  };

  LeftAnkle = {
    dataSets: [{ data: [] }],
  };

  RightAnkle = {
    dataSets: [{ data: [] }],
  };

  RightHip = {
    dataSets: [{ data: [] }],
  };
  LeftHip = {
    dataSets: [{ data: [] }],
  };

  RightFoot = {
    dataSets: [{ data: [] }],
  };
  LeftFoot = {
    dataSets: [{ data: [] }],
  };
  RightShoulderFront = {
    dataSets: [{ data: [] }],
  };

  LeftShoulderFront = {
    dataSets: [{ data: [] }],
  };
  RightShoulderBack = {
    dataSets: [{ data: [] }],
  };
  LeftShoulderBack = {
    dataSets: [{ data: [] }],
  };
  bodyBack = {
    dataSets: [{ data: [] }],
  };

  public bandColors = {
    Orange: "#FFA500",
    "Red/Purple": "#FF0000",
    White: "#ADD8E6",
    "Light Grey": "#D3D3D3",
    "Dark Grey": "#A9A9A9",
    Black: "#000000",
    Elite: "#FF8C00",
  };
  public chestBandColors = [];
  public squatBandColors = [];
  public overheadBandColors = [];
  public tricepPushBandColors = [];
  public chestFlysBandColors = [];
  public deadLiftBandColors = [];
  public bentRowBandColors = [];
  postureFound = false;
  public bicepCurlBandColors = [];
  public calfRaiseBandColors = [];
  public bicepDataBandColors = [];
  posturePhotos = [];
  posture_id: 0;
  postureObject = null;
  spinner = false;
  success_count = 0;
  public chestDataBandColors = [];
  bicepLabels = [
    "Orange",
    "Red/Purple",
    "White",
    "Light Grey",
    "Dark Grey",
    "Black",
    "Elite",
  ];
  x3Labels = {
    "0": "Orange",
    "0.5": "Orange(w)",
    "1.0": "Red/Purple",
    "1.5": "Red/Purple(w)",
    "2.0": "White",
    "2.5": "White(w)",
    "3.0": "Light Grey",
    "3.5": "Light Grey(w)",
    "4.0": "Dark Grey",
    "4.5": "Dark Grey(w)",
    "5.0": "Black",
    "5.5": "Black(w)",
    "6.0": "Elite",
  };
  public x3BandColors = {
    Orange: "#FFA500",
    "Orange(w)": "#FFA500",
    "Red/Purple": "#FF0000",
    "Red/Purple(w)": "#FF0000",
    White: "#ADD8E6",
    "White(w)": "#ADD8E6",
    "Light Grey": "#D3D3D3",
    "Light Grey(w)": "#D3D3D3",
    "Dark Grey": "#A9A9A9",
    "Dark Grey(w)": "#A9A9A9",
    Black: "#000000",
    "Black(w)": "#000000",
    Elite: "#FF8C00",
  };

  BalanceTestLabels = ["Eyes Forward ", "Eyes Up ", "Eyes Closed"];
  editPosture = new FormGroup({
    pic: new FormControl(""),
    created_at: new FormControl("", [Validators.required]),
  });
  constructor(
    private doctorService: DoctorService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.refreshGraphs) {
      this.refreshGraphs.subscribe((data) => {
        this.getChartData();
      });
    }
    if (this.refreshPosturePics) {
      this.refreshPosturePics.subscribe((data) => {
        this.getUserPosture();
      });
    }
  }
  ngOnChanges(changes: any) {
    if (changes.memberId) {
      this.memberId = changes.memberId.currentValue;
      this.getChartData();
      this.postureFound = false;
      this.posturePhotos = [];
      this.posture_id = 0;
      this.postureObject = null;
      this.getUserPosture();
    }
    this.user = changes.user ? changes.user.currentValue : "";
  }

  object_update: {};
  image_change(item) {
    if (item.target.files && item.target.files[0]) {
      this.object_update = item.target.files[0];
      (<HTMLInputElement>document.querySelector("#img_change_url")).src =
        URL.createObjectURL(item.target.files[0]);
    }
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

  UpdatePosture() {
    if (!this.object_update) {
      $("#editPosture").modal("hide");
      return;
    }
    let data = this.editPosture.value;
    data.pic = this.object_update;
    const that = this;
    this.spinner = true;
    that.success_count = 0;
    var today = new Date(data.created_at);
    data.created_at =
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
    new Compressor(data.pic, {
      quality: 0.4,
      success(result) {
        that.doctorService
          .editPosture(data.created_at, result, that.postureObject[0])
          .subscribe(
            (res) => {
              that.getUserPosture();
              $("#editPosture").modal("hide");
              that.success_count++;
              this.object_update = {};
            },
            (error) => {
              console.log(error);
              that.spinner = false;
              this.object_update = {};
            }
          );
      },
    });
    var timer = setInterval(function () {
      if (that.success_count > 0) {
        that.toastr.success("Posture Picture Edit Successfully");
        that.success_count = 0;
        clearInterval(timer);
      }
    }, 200);
  }

  getUserPosture() {
    this.doctorService.getPosturePhoto(this.memberId).subscribe(
      (res) => {
        this.spinner = true;
        if (res.length > 0) {
          this.postureFound = true;
          this.posturePhotos = res;
        } else {
          this.postureFound = false;
        }
        this.spinner = false;
      },
      (error) => {
        console.log(error);
        this.spinner = false;
      }
    );
  }

  async getChartData() {
    await this.removeChartsData();
    await this.baseLinevalues();
    await this.bodyvalues();
    await this.trainingValues();
    this.graphLoaded = true;
    this.showGraphs.emit(true);
  }

  bodyvalues() {
    let right_neck_front = {
      label: "Right Neck Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_neck_front = {
      label: "Left Neck Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_shoulder_front = {
      label: "Right Shoulder Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_shoulder_front = {
      label: "Left Shoulder Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_elbow_front = {
      label: "Right Elbow Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_elbow_front = {
      label: "Left Elbow Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_hand_front = {
      label: "Right Hand Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_hand_front = {
      label: "Left Hand Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_hip_front = {
      label: "Right Hip Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_hip_front = {
      label: "Left hip Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_knee_front = {
      label: "Right Knee Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_knee_front = {
      label: "Left knee Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_ankle_front = {
      label: "Right Ankle Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_ankle_front = {
      label: "Left Ankle Front",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };

    // back data
    let bottom_right_foot = {
      label: "Right Foot",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let bottom_left_foot = {
      label: "Left Foot",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_neck_back = {
      label: "Right Neck Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_neck_back = {
      label: "Left Neck Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_shoulder_back = {
      label: "Right shoulder Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_shoulder_back = {
      label: "Left Shoulder Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_elbow_back = {
      label: "Right Elbow Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_elbow_back = {
      label: "Left Elbow Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_hand_back = {
      label: "Right Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_hand_back = {
      label: "Left Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_hip_back = {
      label: "Right Hip Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_hip_back = {
      label: "Left Hip Back",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_knee_back = {
      label: "Right Hamstring",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_knee_back = {
      label: "Left Hamstring",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let right_ankle_back = {
      label: "Right Calf",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };
    let left_ankle_back = {
      label: "Left Calf",
      data: [],
      backgroundColor: [],
      borderWidth: 5,
    };

    this.doctorService.getBodyChart(this.memberId).subscribe((res) => {
      let pipe = new DatePipe("en-US");
      this.Back.dataSets = [];
      this.RightAnkle.dataSets = [];
      this.LeftAnkle.dataSets = [];
      this.LeftCalf.dataSets = [];
      this.RightCalf.dataSets = [];
      this.RightHip.dataSets = [];
      this.LeftHip.dataSets = [];
      this.LeftFoot.dataSets = [];
      this.RightFoot.dataSets = [];
      this.RightKnee.dataSets = [];
      this.LeftKnee.dataSets = [];
      this.RightHamstrings.dataSets = [];
      this.LeftHamstrings.dataSets = [];
      this.RightElbowFront.dataSets = [];
      this.LeftElbowFront.dataSets = [];
      this.RightElbowBack.dataSets = [];
      this.LeftElbowBack.dataSets = [];
      this.RightHandFront.dataSets = [];
      this.RightHandFront.dataSets = [];
      this.RightHandBack.dataSets = [];
      this.LeftHandBack.dataSets = [];
      this.RightNeckFront.dataSets = [];
      this.LeftNeckFront.dataSets = [];
      this.RightNeckBack.dataSets = [];
      this.LeftNeckBack.dataSets = [];

      this.RightShoulderFront.dataSets = [];
      this.LeftShoulderFront.dataSets = [];
      this.RightShoulderBack.dataSets = [];
      this.LeftShoulderBack.dataSets = [];

      res.right_neck_front_values.forEach((key, i) => {
        this.RightNeckDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_neck_front.data.push(key.right_neck_front);
        right_neck_front.backgroundColor.push("rgba(255,255,255,0)");
      });

      res.left_neck_front_values.forEach((key, i) => {
        this.LeftNeckDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_neck_front.data.push(
          res.left_neck_front_values[i].left_neck_front
        );
        left_neck_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_shoulder_front_values.forEach((key, i) => {
        this.RightShoulderDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_shoulder_front.data.push(
          res.right_shoulder_front_values[i].right_shoulder_front
        );
        right_shoulder_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_shoulder_front_values.forEach((key, i) => {
        this.LeftShoulderDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_shoulder_front.data.push(
          res.left_shoulder_front_values[i].left_shoulder_front
        );
        left_shoulder_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_elbow_front_values.forEach((key, i) => {
        this.RightElbowDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_elbow_front.data.push(
          res.right_elbow_front_values[i].right_elbow_front
        );
        right_elbow_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_elbow_front_values.forEach((key, i) => {
        this.LeftElbowDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_elbow_front.data.push(
          res.left_elbow_front_values[i].left_elbow_front
        );
        left_elbow_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_hand_front_values.forEach((key, i) => {
        this.RightHandDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_hand_front.data.push(
          res.right_hand_front_values[i].right_hand_front
        );
        right_hand_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_hand_front_values.forEach((key, i) => {
        this.LeftHandDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_hand_front.data.push(
          res.left_hand_front_values[i].left_hand_front
        );
        left_hand_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_hip_front_values.forEach((key, i) => {
        this.RightHipDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_hip_front.data.push(
          res.right_hip_front_values[i].right_hip_front
        );
        right_hip_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_hip_front_values.forEach((key, i) => {
        this.LeftHipDates.push(pipe.transform(key.body_created, "dd MMM yyyy"));
        left_hip_front.data.push(res.left_hip_front_values[i].left_hip_front);
        left_hip_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_knee_front_values.forEach((key, i) => {
        this.RightKneeDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_knee_front.data.push(
          res.right_knee_front_values[i].right_knee_front
        );
        right_knee_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_knee_front_values.forEach((key, i) => {
        this.LeftKneeDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_knee_front.data.push(
          res.left_knee_front_values[i].left_knee_front
        );
        left_knee_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_ankle_front_values.forEach((key, i) => {
        this.RightAnkleDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_ankle_front.data.push(
          res.right_ankle_front_values[i].right_ankle_front
        );
        right_ankle_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_ankle_front_values.forEach((key, i) => {
        this.LeftAnkleDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_ankle_front.data.push(
          res.left_ankle_front_values[i].left_ankle_front
        );
        left_ankle_front.backgroundColor.push("rgba(255,255,255,0)");
      });
      // back
      res.bottom_right_foot_values.forEach((key, i) => {
        this.RightFootDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        bottom_right_foot.data.push(
          res.bottom_right_foot_values[i].bottom_right_foot
        );
        bottom_right_foot.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.bottom_left_foot_values.forEach((key, i) => {
        this.LeftFootDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        bottom_left_foot.data.push(
          res.bottom_left_foot_values[i].bottom_left_foot
        );
        bottom_left_foot.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_neck_back_values.forEach((key, i) => {
        this.RightNeckBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_neck_back.data.push(
          res.right_neck_back_values[i].right_neck_back
        );
        right_neck_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_neck_back_values.forEach((key, i) => {
        this.LeftNeckBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_neck_back.data.push(res.left_neck_back_values[i].left_neck_back);
        left_neck_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_shoulder_back_values.forEach((key, i) => {
        this.RightShoulderBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_shoulder_back.data.push(
          res.right_shoulder_back_values[i].right_shoulder_back
        );
        right_shoulder_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_shoulder_back_values.forEach((key, i) => {
        this.LeftShoulderBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_shoulder_back.data.push(
          res.left_shoulder_back_values[i].left_shoulder_back
        );
        left_shoulder_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_elbow_back_values.forEach((key, i) => {
        this.RightElbowBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_elbow_back.data.push(
          res.right_elbow_back_values[i].right_elbow_back
        );
        right_elbow_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_elbow_back_values.forEach((key, i) => {
        this.LeftElbowBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_elbow_back.data.push(
          res.left_elbow_back_values[i].left_elbow_back
        );
        left_elbow_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_hand_back_values.forEach((key, i) => {
        this.RightHandBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_hand_back.data.push(
          res.right_hand_back_values[i].right_hand_back
        );
        right_hand_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_hand_back_values.forEach((key, i) => {
        this.LeftHandBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_hand_back.data.push(res.left_hand_back_values[i].left_hand_back);
        left_hand_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_hip_back_values.forEach((key, i) => {
        this.RightHipBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_hip_back.data.push(res.right_hip_back_values[i].right_hip_back);
        right_hip_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_hip_back_values.forEach((key, i) => {
        this.LeftHipBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_hip_back.data.push(res.left_hip_back_values[i].left_hip_back);
        left_hip_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_knee_back_values.forEach((key, i) => {
        this.RightKneeBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_knee_back.data.push(
          res.right_knee_back_values[i].right_knee_back
        );
        right_knee_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_knee_back_values.forEach((key, i) => {
        this.LeftKneeBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_knee_back.data.push(res.left_knee_back_values[i].left_knee_back);
        left_knee_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.right_ankle_back_values.forEach((key, i) => {
        this.RightAnkleBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        right_ankle_back.data.push(
          res.right_ankle_back_values[i].right_ankle_back
        );
        right_ankle_back.backgroundColor.push("rgba(255,255,255,0)");
      });
      res.left_ankle_back_values.forEach((key, i) => {
        this.LeftAnkleBackDates.push(
          pipe.transform(key.body_created, "dd MMM yyyy")
        );
        left_ankle_back.data.push(
          res.left_ankle_back_values[i].left_ankle_back
        );
        left_ankle_back.backgroundColor.push("rgba(255,255,255,0)");
      });

      this.bodyLabels = [...new Set(this.bodyLabels)];

      let nDs = [];
      this.checkZero(right_neck_front.data) ? nDs.push(right_neck_front) : "";
      nDs = this.RemoveLeadingZeros(nDs, this.RightNeckDates);
      this.RightNeckFront = {
        dataSets: nDs,
      };
      nDs = [];
      this.checkZero(left_neck_front.data) ? nDs.push(left_neck_front) : "";
      nDs = this.RemoveLeadingZeros(nDs, this.LeftNeckDates);
      this.LeftNeckFront = {
        dataSets: nDs,
      };
      nDs = [];
      this.checkZero(right_neck_back.data) ? nDs.push(right_neck_back) : "";
      nDs = this.RemoveLeadingZeros(nDs, this.RightNeckBackDates);
      this.RightNeckBack = {
        dataSets: nDs,
      };
      nDs = [];
      this.checkZero(left_neck_back.data) ? nDs.push(left_neck_back) : "";
      nDs = this.RemoveLeadingZeros(nDs, this.LeftNeckBackDates);
      this.LeftNeckBack = {
        dataSets: nDs,
      };

      let shDs = [];
      this.checkZero(right_shoulder_front.data)
        ? shDs.push(right_shoulder_front)
        : "";
      shDs = this.RemoveLeadingZeros(shDs, this.RightShoulderDates);
      this.RightShoulderFront = {
        dataSets: shDs,
      };
      shDs = [];
      this.checkZero(left_shoulder_front.data)
        ? shDs.push(left_shoulder_front)
        : "";
      shDs = this.RemoveLeadingZeros(shDs, this.LeftShoulderDates);
      this.LeftShoulderFront = {
        dataSets: shDs,
      };
      shDs = [];
      this.checkZero(right_shoulder_back.data)
        ? shDs.push(right_shoulder_back)
        : "";
      shDs = this.RemoveLeadingZeros(shDs, this.RightShoulderBackDates);
      this.RightShoulderBack = {
        dataSets: shDs,
      };
      shDs = [];
      this.checkZero(left_shoulder_back.data)
        ? shDs.push(left_shoulder_back)
        : "";
      shDs = this.RemoveLeadingZeros(shDs, this.LeftShoulderBackDates);
      this.LeftShoulderBack = {
        dataSets: shDs,
      };

      let elDs = [];
      this.checkZero(right_elbow_front.data)
        ? elDs.push(right_elbow_front)
        : "";
      elDs = this.RemoveLeadingZeros(elDs, this.RightElbowDates);
      this.RightElbowFront = {
        dataSets: elDs,
      };
      elDs = [];
      this.checkZero(left_elbow_front.data) ? elDs.push(left_elbow_front) : "";
      elDs = this.RemoveLeadingZeros(elDs, this.LeftElbowDates);
      this.LeftElbowFront = {
        dataSets: elDs,
      };
      elDs = [];
      this.checkZero(right_elbow_back.data) ? elDs.push(right_elbow_back) : "";
      elDs = this.RemoveLeadingZeros(elDs, this.RightElbowBackDates);
      this.RightElbowBack = {
        dataSets: elDs,
      };
      this.checkZero(left_elbow_back.data) ? elDs.push(left_elbow_back) : "";
      elDs = this.RemoveLeadingZeros(elDs, this.LeftElbowBackDates);
      this.LeftElbowBack = {
        dataSets: elDs,
      };

      let haDs = [];
      this.checkZero(right_hand_front.data) ? haDs.push(right_hand_front) : "";
      haDs = this.RemoveLeadingZeros(haDs, this.RightHandDates);
      this.RightHandFront = {
        dataSets: haDs,
      };
      haDs = [];
      this.checkZero(left_hand_front.data) ? haDs.push(left_hand_front) : "";
      haDs = this.RemoveLeadingZeros(haDs, this.LeftHandDates);
      this.LeftHandFront = {
        dataSets: haDs,
      };

      let baDs = [];
      this.checkZero(right_hand_back.data) ? baDs.push(right_hand_back) : "";
      baDs = this.RemoveLeadingZeros(baDs, this.RightHandBackDates);
      this.RightHandBack = {
        dataSets: baDs,
      };
      baDs = [];
      this.checkZero(left_hand_back.data) ? baDs.push(left_hand_back) : "";
      baDs = this.RemoveLeadingZeros(baDs, this.RightHandBackDates);
      this.RightHandBack = {
        dataSets: baDs,
      };

      let knDs = [];
      this.checkZero(right_knee_front.data) ? knDs.push(right_knee_front) : "";
      knDs = this.RemoveLeadingZeros(knDs, this.RightKneeBackDates);
      this.RightKnee = {
        dataSets: knDs,
      };

      knDs = [];
      this.checkZero(left_knee_front.data) ? knDs.push(left_knee_front) : "";
      knDs = this.RemoveLeadingZeros(knDs, this.LeftKneeBackDates);
      this.LeftKnee = {
        dataSets: knDs,
      };

      let hamDs = [];
      this.checkZero(right_knee_back.data) ? hamDs.push(right_knee_back) : "";
      hamDs = this.RemoveLeadingZeros(hamDs, this.RightKneeBackDates);
      this.RightHamstrings = {
        dataSets: hamDs,
      };
      hamDs = [];
      this.checkZero(left_knee_back.data) ? hamDs.push(left_knee_back) : "";
      hamDs = this.RemoveLeadingZeros(hamDs, this.LeftKneeBackDates);
      this.LeftHamstrings = {
        dataSets: hamDs,
      };

      let anDs = [];
      this.checkZero(right_ankle_front.data)
        ? anDs.push(right_ankle_front)
        : "";
      anDs = this.RemoveLeadingZeros(anDs, this.RightAnkleBackDates);
      this.RightAnkle = {
        dataSets: anDs,
      };
      anDs = [];
      this.checkZero(left_ankle_front.data) ? anDs.push(left_ankle_front) : "";
      anDs = this.RemoveLeadingZeros(anDs, this.LeftAnkleBackDates);
      this.LeftAnkle = {
        dataSets: anDs,
      };

      let caDs = [];
      this.checkZero(right_ankle_back.data) ? caDs.push(right_ankle_back) : "";
      caDs = this.RemoveLeadingZeros(caDs, this.RightAnkleBackDates);
      this.RightCalf = {
        dataSets: caDs,
      };
      caDs = [];
      this.checkZero(left_ankle_back.data) ? caDs.push(left_ankle_back) : "";
      caDs = this.RemoveLeadingZeros(caDs, this.LeftAnkleBackDates);
      this.LeftCalf = {
        dataSets: caDs,
      };

      let hiDs = [];
      this.checkZero(right_hip_front.data) ? hiDs.push(right_hip_front) : "";
      hiDs = this.RemoveLeadingZeros(hiDs, this.RightHipDates);
      this.RightHip = {
        dataSets: hiDs,
      };
      hiDs = [];
      this.checkZero(left_hip_front.data) ? hiDs.push(left_hip_front) : "";
      hiDs = this.RemoveLeadingZeros(hiDs, this.LeftHipDates);
      this.LeftHip = {
        dataSets: hiDs,
      };

      let ftDs = [];
      this.checkZero(bottom_right_foot.data)
        ? ftDs.push(bottom_right_foot)
        : "";
      ftDs = this.RemoveLeadingZeros(ftDs, this.RightFootDates);
      this.RightFoot = {
        dataSets: ftDs,
      };
      ftDs = [];
      this.checkZero(bottom_left_foot.data) ? ftDs.push(bottom_left_foot) : "";
      ftDs = this.RemoveLeadingZeros(ftDs, this.LeftFootDates);
      this.LeftFoot = {
        dataSets: ftDs,
      };
    });
  }

  removeChartsData() {
    this.HDates = [];
    this.WDates = [];
    this.BDates = [];
    this.BentRowBandDates = [];
    this.BentRowPartialsDates = [];
    this.BentRowRepsDates = [];
    this.BicepCurlBandDates = [];
    this.BicepCurlPartialsDates = [];
    this.BicepCurlRepsDates = [];
    this.CalfRaiseBandDates = [];
    this.CalfRaisePartialsDates = [];
    this.CalfRaiseRepsDates = [];
    this.ChestFlysBandDates = [];
    this.ChestFlysPartialsDates = [];
    this.ChestFlysRepsDates = [];
    this.ChestPressBandDates = [];
    this.ChestPressPartialsDates = [];
    this.ChestPressRepsDates = [];
    this.DeadLiftBandDates = [];
    this.DeadLiftPartialsDates = [];
    this.DeadLiftRepsDates = [];
    this.OverheadPressBandDates = [];
    this.OverheadPressPartialsDates = [];
    this.OverheadPressRepsDates = [];
    this.SquatBandDates = [];
    this.SquatPartialsDates = [];
    this.SquatRepsDates = [];
    this.TricepPushBandDates = [];
    this.TricepPushPartialsDates = [];
    this.TricepPushRepsDates = [];
    this.HipTestDates = [];
    this.WaistTestDates = [];
    this.TotalRatioDates = [];
    this.BodyFatDates = [];
    this.FatMassDates = [];
    this.LeanMassDates = [];
    this.LRDates = [];
    this.LegDates = [];
    this.Balance0Dates = [];
    this.Balance1Dates = [];
    this.Balance2Dates = [];
    this.chestDates = [];
    this.bicepDates = [];
    this.RightNeckDates = [];
    this.RightAnkleDates = [];
    this.LeftAnkleDates = [];
    this.RightFootDates = [];
    this.RightNeckBackDates = [];
    this.LeftNeckBackDates = [];
    this.RightAnkleBackDates = [];
    this.LeftAnkleBackDates = [];
    this.RightKneeBackDates = [];
    this.LeftKneeBackDates = [];
    this.RightHipBackDates = [];
    this.LeftHipBackDates = [];
    this.RightHandBackDates = [];
    this.LeftHandBackDates = [];
    this.RightElbowBackDates = [];
    this.LeftElbowBackDates = [];
    this.RightShoulderBackDates = [];
    this.LeftShoulderBackDates = [];
    this.LeftFootDates = [];
    this.LeftNeckDates = [];
    this.RightKneeDates = [];
    this.LeftKneeDates = [];
    this.RightElbowDates = [];
    this.LeftElbowDates = [];
    this.RightHandDates = [];
    this.LeftHandDates = [];
    this.LeftHipDates = [];
    this.RightHipDates = [];
    this.HandDates = [];
    this.HipDates = [];
    this.HamstringDates = [];
    this.CalfDates = [];
    this.RightShoulderDates = [];
    this.LeftShoulderDates = [];

    this.barChartLabel = [];
    this.HGraph = {
      dataSets: [{ data: [] }],
    };
    this.WGraph = {
      dataSets: [{ data: [] }],
    };
    this.bTracks = {
      dataSets: [{ data: [] }],
    };
    this.HipTest = {
      dataSets: [{ data: [] }],
    };
    this.WaistTest = {
      dataSets: [{ data: [] }],
    };
    this.TotalRatio = {
      dataSets: [{ data: [] }],
    };
    this.BodyFatTest = {
      dataSets: [{ data: [] }],
    };
    this.FatMassTest = {
      dataSets: [{ data: [] }],
    };
    this.LeanMassTest = {
      dataSets: [{ data: [] }],
    };
    this.LRGripGraph = {
      dataSets: [{ data: [] }],
    };

    this.LegGraphData = {
      dataSets: [{ data: [] }],
    };

    this.BalanceTest0 = {
      dataSets: [{ data: [] }],
    };
    this.BalanceTest1 = {
      dataSets: [{ data: [] }],
    };
    this.BalanceTest2 = {
      dataSets: [{ data: [] }],
    };

    this.bicepData = {
      dataSets: [{ data: [] }],
    };

    this.chestData = {
      dataSets: [{ data: [] }],
    };

    this.bodyLabels = [];
    this.bodyFront = {
      dataSets: [{ data: [] }],
    };

    this.RightNeckFront = {
      dataSets: [{ data: [] }],
    };
    this.RightNeckBack = {
      dataSets: [{ data: [] }],
    };
    this.LeftNeckFront = {
      dataSets: [{ data: [] }],
    };
    this.LeftNeckBack = {
      dataSets: [{ data: [] }],
    };

    this.Back = {
      dataSets: [{ data: [] }],
    };

    this.RightHamstrings = {
      dataSets: [{ data: [] }],
    };

    this.LeftHamstrings = {
      dataSets: [{ data: [] }],
    };
    this.RightCalf = {
      dataSets: [{ data: [] }],
    };
    this.LeftCalf = {
      dataSets: [{ data: [] }],
    };

    this.RightElbowFront = {
      dataSets: [{ data: [] }],
    };
    this.LeftElbowFront = {
      dataSets: [{ data: [] }],
    };
    this.RightElbowBack = {
      dataSets: [{ data: [] }],
    };
    this.LeftElbowBack = {
      dataSets: [{ data: [] }],
    };
    this.RightHandFront = {
      dataSets: [{ data: [] }],
    };
    this.LeftHandFront = {
      dataSets: [{ data: [] }],
    };
    this.RightHandBack = {
      dataSets: [{ data: [] }],
    };
    this.LeftHandBack = {
      dataSets: [{ data: [] }],
    };

    this.RightKnee = {
      dataSets: [{ data: [] }],
    };
    this.LeftKnee = {
      dataSets: [{ data: [] }],
    };

    this.LeftAnkle = {
      dataSets: [{ data: [] }],
    };

    this.RightAnkle = {
      dataSets: [{ data: [] }],
    };

    this.RightHip = {
      dataSets: [{ data: [] }],
    };
    this.LeftHip = {
      dataSets: [{ data: [] }],
    };

    this.RightFoot = {
      dataSets: [{ data: [] }],
    };
    this.LeftFoot = {
      dataSets: [{ data: [] }],
    };

    this.RightShoulderFront = {
      dataSets: [{ data: [] }],
    };
    this.LeftShoulderFront = {
      dataSets: [{ data: [] }],
    };
    this.RightShoulderBack = {
      dataSets: [{ data: [] }],
    };
    this.LeftShoulderBack = {
      dataSets: [{ data: [] }],
    };

    this.bodyBack = {
      dataSets: [{ data: [] }],
    };
    this.BentRowBandGraph = {
      dataSets: [{ data: [] }],
    };

    this.BicepCurlBandGraph = {
      dataSets: [{ data: [] }],
    };

    this.CalfRaiseBandGraph = {
      dataSets: [{ data: [] }],
    };

    this.ChestFlysBandGraph = {
      dataSets: [{ data: [] }],
    };

    this.ChestPressBandGraph = {
      dataSets: [{ data: [] }],
    };

    this.DeadLiftBandGraph = {
      dataSets: [{ data: [] }],
    };

    this.OverheadPressBandGraph = {
      dataSets: [{ data: [] }],
    };

    this.SquatBandGraph = {
      dataSets: [{ data: [] }],
    };

    this.TricepPushBandGraph = {
      dataSets: [{ data: [] }],
    };
    this.chestBandColors = [];
    this.squatBandColors = [];
    this.overheadBandColors = [];
    this.tricepPushBandColors = [];
    this.chestFlysBandColors = [];
    this.deadLiftBandColors = [];
    this.bentRowBandColors = [];
    this.bicepCurlBandColors = [];
    this.calfRaiseBandColors = [];
    this.bicepDataBandColors = [];
    this.chestDataBandColors = [];
  }

  getPostureObj(item) {
    this.postureObject = item;
    this.editPosture.patchValue({
      created_at: item[2].split(".")[0].split("Z")[0],
    });
  }
  getPostureId(id) {
    this.posture_id = id;
  }

  delete_posture() {
    this.doctorService.deletePosture(this.posture_id).subscribe((res) => {
      const i = this.posturePhotos.findIndex((e) => e[0] == this.posture_id);
      this.posturePhotos.splice(i, 1);
      if (this.posturePhotos.length === 0) {
        this.postureFound = false;
      }
      this.toastr.error("Posture Picture Deleted Successfully");
    });
  }

  baseLinevalues() {
    this.doctorService.getBaseLineChart(this.memberId).subscribe((res) => {
      let W = {
        data: [],
        label: "Weight",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let H = {
        data: [],
        label: "Height",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let B = {
        data: [],
        label: "Btracks",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let Hip = {
        data: [],
        label: "Hip",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let Waist = {
        data: [],
        label: "Waist",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let Ratio = {
        data: [],
        label: "Waist to Hip Ratio",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let bodyFat = {
        data: [],
        label: "Body Fat",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let fatMass = {
        data: [],
        label: "Fat Mass",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let leanMass = {
        data: [],
        label: "Lean Mass",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let L = {
        data: [],
        label: "Left",
        backgroundColor: ["rgba(255,255,255,0)"],
      };
      let R = {
        data: [],
        label: "Right",
        backgroundColor: ["rgba(255,255,255,0)"],
      };

      let pipe = new DatePipe("en-US");
      this.barChartLabel = [];

      if (res.height_values) {
        res.height_values.forEach((item, index) => {
          H.data.push(item.height);
          this.HDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }

      if (res.weight_values) {
        res.weight_values.forEach((item, index) => {
          W.data.push(res.weight_values[index].weight);
          this.WDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }

      if (res.b_tracks_values) {
        res.b_tracks_values.forEach((item, index) => {
          B.data.push(res.b_tracks_values[index].b_tracks);
          this.BDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }

      if (res.hip_values) {
        res.hip_values.forEach((item, index) => {
          Hip.data.push(res.hip_values[index].hip);
          this.HipTestDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }
      if (res.waist_values) {
        res.waist_values.forEach((item, index) => {
          Waist.data.push(res.waist_values[index].waist);
          this.WaistTestDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }

      if (res.hip_waist_ratio_values) {
        res.hip_waist_ratio_values.forEach((item, index) => {
          Ratio.data.push(res.hip_waist_ratio_values[index].hip_waist_ratio);
          this.TotalRatioDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }

      if (res.body_fat_perc_values) {
        res.body_fat_perc_values.forEach((item, index) => {
          bodyFat.data.push(res.body_fat_perc_values[index].body_fat_perc);
          this.BodyFatDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }
      if (res.fat_mass_values) {
        res.fat_mass_values.forEach((item, index) => {
          fatMass.data.push(res.fat_mass_values[index].fat_mass);
          this.FatMassDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }
      if (res.lean_mass_values) {
        res.lean_mass_values.forEach((item, index) => {
          leanMass.data.push(res.lean_mass_values[index].lean_mass);
          this.LeanMassDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }
      if (res.left_grip_values || res.right_grip_values) {
        res.left_grip_values.forEach((item, index) => {
          L.data.push(res.left_grip_values[index].left_grip);
          R.data.push(res.right_grip_values[index].right_grip);
          this.LRDates.push(
            pipe.transform(item.baseline_created, "dd MMM yyyy")
          );
        });
      }

      let hwDs = [];
      this.checkZero(H.data) ? hwDs.push(H) : "";
      hwDs = this.RemoveLeadingZeros(hwDs, this.HDates);
      this.HGraph = {
        dataSets: hwDs,
      };

      hwDs = [];
      this.checkZero(W.data) ? hwDs.push(W) : "";
      hwDs = this.RemoveLeadingZeros(hwDs, this.WDates);
      this.WGraph = {
        dataSets: hwDs,
      };

      hwDs = [];
      this.checkZero(B.data) ? hwDs.push(B) : "";
      hwDs = this.RemoveLeadingZeros(hwDs, this.BDates);
      this.bTracks = {
        dataSets: hwDs,
      };

      hwDs = [];
      this.checkZero(Hip.data) ? hwDs.push(Hip) : "";
      hwDs = this.RemoveLeadingZeros(hwDs, this.HipTestDates);
      this.HipTest = {
        dataSets: hwDs,
      };
      hwDs = [];
      this.checkZero(Waist.data) ? hwDs.push(Waist) : "";
      hwDs = this.RemoveLeadingZeros(hwDs, this.WaistTestDates);
      this.WaistTest = {
        dataSets: hwDs,
      };

      hwDs = [];
      this.checkZero(Ratio.data) ? hwDs.push(Ratio) : "";
      hwDs = this.RemoveLeadingZeros(hwDs, this.TotalRatioDates);
      this.TotalRatio = {
        dataSets: hwDs,
      };
      hwDs = [];
      this.checkZero(bodyFat.data) ? hwDs.push(bodyFat) : "";
      hwDs = this.RemoveLeadingZeros(hwDs, this.BodyFatDates);
      this.BodyFatTest = {
        dataSets: hwDs,
      };
      hwDs = [];
      this.checkZero(fatMass.data) ? hwDs.push(fatMass) : "";
      hwDs = this.RemoveLeadingZeros(hwDs, this.FatMassDates);
      this.FatMassTest = {
        dataSets: hwDs,
      };
      hwDs = [];
      this.checkZero(leanMass.data) ? hwDs.push(leanMass) : "";
      hwDs = this.RemoveLeadingZeros(hwDs, this.LeanMassDates);
      this.LeanMassTest = {
        dataSets: hwDs,
      };
      let ldDs = [];
      this.checkZero(L.data) ? ldDs.push(L) : "";
      this.checkZero(R.data) ? ldDs.push(R) : "";

      ldDs = this.RemoveLeadingZeros(ldDs, this.LRDates);
      this.LRGripGraph = {
        dataSets: ldDs,
      };
      let legDataSets = [];
      Object.keys(res.leg_strength_test_values).forEach((leg) => {
        let legdata = {
          label: this.legLabels[leg],
          data: [],
          backgroundColor: ["rgba(255,255,255,0)"],
          borderWidth: 5,
        };
        let count_zero = 0;
        res.leg_strength_test_values[leg].forEach((val, index) => {
          if (count_zero == 0 && val.leg_strength_test_reps == 0) {
          } else {
            count_zero++;
            legdata.data.push(val.leg_strength_test_reps);
            this.LegDates.push(
              pipe.transform(val.baseline_created, "dd MMM yyyy")
            );
          }
        });
        this.checkZero(legdata.data) ? legDataSets.push(legdata) : "";
      });
      this.LegGraphData.dataSets = [];
      legDataSets = this.RemoveLeadingZeros(legDataSets, this.LegDates);
      this.LegGraphData = {
        dataSets: legDataSets,
      };
      var data_temp = [];
      if (this.LegGraphData.dataSets["1"]) {
        for (var i = 0; i < this.LegGraphData.dataSets["0"].data.length; i++) {
          data_temp.push(",");
        }
        this.LegGraphData.dataSets["1"].data = data_temp.concat(
          this.LegGraphData.dataSets["1"].data
        );
      }

      if (this.LegGraphData.dataSets["2"]) {
        data_temp = [];
        for (var i = 0; i < this.LegGraphData.dataSets["1"].data.length; i++) {
          data_temp.push(",");
        }
        this.LegGraphData.dataSets["2"].data = data_temp.concat(
          this.LegGraphData.dataSets["2"].data
        );
      }

      if (res.single_leg_balance_test_values) {
        let left0 = {
          label: "Left",
          data: [],
          backgroundColor: ["rgba(255,255,255,0)"],
          borderWidth: 5,
        };
        let right0 = {
          label: "Right",
          data: [],
          backgroundColor: ["rgba(255,255,255,0)"],
          borderWidth: 5,
        };
        let left1 = {
          label: "Left",
          data: [],
          backgroundColor: ["rgba(255,255,255,0)"],
          borderWidth: 5,
        };
        let right1 = {
          label: "Right",
          data: [],
          backgroundColor: ["rgba(255,255,255,0)"],
          borderWidth: 5,
        };
        let left2 = {
          label: "Left",
          data: [],
          backgroundColor: ["rgba(255,255,255,0)"],
          borderWidth: 5,
        };
        let right2 = {
          label: "Right",
          data: [],
          backgroundColor: ["rgba(255,255,255,0)"],
          borderWidth: 5,
        };
        let count_zero = 0;
        res.single_leg_balance_test_values["0"].forEach((test0, index) => {
          if (
            count_zero == 0 &&
            test0.single_leg_balance_test_left == 0 &&
            test0.single_leg_balance_test_right == 0
          ) {
          } else {
            count_zero++;
            left0.data.push(test0.single_leg_balance_test_left);
            right0.data.push(test0.single_leg_balance_test_right);
            this.Balance0Dates.push(
              pipe.transform(test0.baseline_created, "dd MMM yyyy")
            );
          }
        });
        count_zero = 0;
        res.single_leg_balance_test_values["1"].forEach((test1, index) => {
          if (
            count_zero == 0 &&
            test1.single_leg_balance_test_left == 0 &&
            test1.single_leg_balance_test_right == 0
          ) {
          } else {
            count_zero++;
            left1.data.push(test1.single_leg_balance_test_left);
            right1.data.push(test1.single_leg_balance_test_right);
            this.Balance1Dates.push(
              pipe.transform(test1.baseline_created, "dd MMM yyyy")
            );
          }
        });

        res.single_leg_balance_test_values["2"].forEach((test2) => {
          left2.data.push(test2.single_leg_balance_test_left);
          right2.data.push(test2.single_leg_balance_test_right);
          this.Balance2Dates.push(
            pipe.transform(test2.baseline_created, "dd MMM yyyy")
          );
        });

        let btDs0 = [];
        this.checkZero(left0.data) ? btDs0.push(left0) : "";
        this.checkZero(right0.data) ? btDs0.push(right0) : "";
        btDs0 = this.RemoveLeadingZeros(btDs0, this.Balance0Dates);
        this.BalanceTest0 = {
          dataSets: btDs0,
        };
        let btDs1 = [];
        this.checkZero(left1.data) ? btDs1.push(left1) : "";
        this.checkZero(right1.data) ? btDs1.push(right1) : "";
        btDs1 = this.RemoveLeadingZeros(btDs1, this.Balance1Dates);
        this.BalanceTest1 = {
          dataSets: btDs1,
        };
        let btDs2 = [];
        this.checkZero(left2.data) ? btDs2.push(left2) : "";
        this.checkZero(right2.data) ? btDs2.push(right2) : "";
        btDs2 = this.RemoveLeadingZeros(btDs2, this.Balance2Dates);
        this.BalanceTest2 = {
          dataSets: btDs2,
        };
      }

      if (res.x3_bicep_curl_values) {
        let bicepDataSets = [];
        Object.keys(res.x3_bicep_curl_values).forEach((key) => {
          let itom = {
            label: this.bicepLabels[key],
            data: [],
            backgroundColor: ["rgba(255,255,255,0)"],
            borderWidth: 5,
          };
          let count_zero = 0;
          res.x3_bicep_curl_values[key].forEach((it, index) => {
            if (count_zero == 0 && it.x3_bicep_curl_reps == 0) {
            } else {
              count_zero++;
              itom.data.push(it.x3_bicep_curl_reps);
              this.bicepDates.push(
                pipe.transform(it.baseline_created, "dd MMM yyyy")
              );
            }
          });
          this.checkZero(itom.data) ? bicepDataSets.push(itom) : "";
        });

        this.bicepData.dataSets = [];
        bicepDataSets = this.RemoveLeadingZeros(bicepDataSets, this.bicepDates);
        this.bicepData = {
          dataSets: bicepDataSets,
        };
        let _that = this;
        this.bicepData.dataSets.forEach(function (item) {
          _that.bicepDataBandColors.push({
            borderColor: _that.bandColors[item["label"]],
          });
        });
      }

      if (this.bicepData.dataSets["1"]) {
        data_temp = [];
        for (var i = 0; i < this.bicepData.dataSets["0"].data.length; i++) {
          data_temp.push(",");
        }
        this.bicepData.dataSets["1"].data = data_temp.concat(
          this.bicepData.dataSets["1"].data
        );
      }

      if (this.bicepData.dataSets["2"]) {
        data_temp = [];
        for (var i = 0; i < this.bicepData.dataSets["1"].data.length; i++) {
          data_temp.push(",");
        }
        this.bicepData.dataSets["2"].data = data_temp.concat(
          this.bicepData.dataSets["2"].data
        );
      }
      if (this.bicepData.dataSets["3"]) {
        data_temp = [];
        for (var i = 0; i < this.bicepData.dataSets["2"].data.length; i++) {
          data_temp.push(",");
        }
        this.bicepData.dataSets["3"].data = data_temp.concat(
          this.bicepData.dataSets["3"].data
        );
      }
      if (this.bicepData.dataSets["4"]) {
        data_temp = [];
        for (var i = 0; i < this.bicepData.dataSets["3"].data.length; i++) {
          data_temp.push(",");
        }
        this.bicepData.dataSets["4"].data = data_temp.concat(
          this.bicepData.dataSets["4"].data
        );
      }
      if (this.bicepData.dataSets["5"]) {
        data_temp = [];
        for (var i = 0; i < this.bicepData.dataSets["4"].data.length; i++) {
          data_temp.push(",");
        }
        this.bicepData.dataSets["5"].data = data_temp.concat(
          this.bicepData.dataSets["5"].data
        );
      }
      if (this.bicepData.dataSets["6"]) {
        data_temp = [];
        for (var i = 0; i < this.bicepData.dataSets["5"].data.length; i++) {
          data_temp.push(",");
        }
        this.bicepData.dataSets["6"].data = data_temp.concat(
          this.bicepData.dataSets["6"].data
        );
      }

      if (res.x3_chest_press_values) {
        let chestDataSets = [];
        Object.keys(res.x3_chest_press_values).forEach((key) => {
          let itom = {
            label: this.bicepLabels[key],
            data: [],
            backgroundColor: ["rgba(255,255,255,0)"],
            borderWidth: 5,
          };
          let count_zero = 0;
          res.x3_chest_press_values[key].forEach((it, index) => {
            if (count_zero == 0 && it.x3_chest_press_reps == 0) {
            } else {
              count_zero++;
              itom.data.push(it.x3_chest_press_reps);
              this.chestDates.push(
                pipe.transform(it.baseline_created, "dd MMM yyyy")
              );
            }
          });
          this.checkZero(itom.data) ? chestDataSets.push(itom) : "";
        });
        this.chestData.dataSets = [];
        chestDataSets = this.RemoveLeadingZeros(chestDataSets, this.chestDates);
        this.chestData = {
          dataSets: chestDataSets,
        };

        let _that = this;
        this.chestData.dataSets.forEach(function (item) {
          _that.chestDataBandColors.push({
            borderColor: _that.bandColors[item["label"]],
          });
        });
      }

      if (this.chestData.dataSets["1"]) {
        data_temp = [];
        for (var i = 0; i < this.chestData.dataSets["0"].data.length; i++) {
          data_temp.push(",");
        }
        this.chestData.dataSets["1"].data = data_temp.concat(
          this.chestData.dataSets["1"].data
        );
      }

      if (this.chestData.dataSets["2"]) {
        data_temp = [];
        for (var i = 0; i < this.chestData.dataSets["1"].data.length; i++) {
          data_temp.push(",");
        }
        this.chestData.dataSets["2"].data = data_temp.concat(
          this.chestData.dataSets["2"].data
        );
      }
      if (this.chestData.dataSets["3"]) {
        data_temp = [];
        for (var i = 0; i < this.chestData.dataSets["2"].data.length; i++) {
          data_temp.push(",");
        }
        this.chestData.dataSets["3"].data = data_temp.concat(
          this.chestData.dataSets["3"].data
        );
      }
      if (this.chestData.dataSets["4"]) {
        data_temp = [];
        for (var i = 0; i < this.chestData.dataSets["3"].data.length; i++) {
          data_temp.push(",");
        }
        this.chestData.dataSets["4"].data = data_temp.concat(
          this.chestData.dataSets["4"].data
        );
      }
      if (this.chestData.dataSets["5"]) {
        data_temp = [];
        for (var i = 0; i < this.chestData.dataSets["4"].data.length; i++) {
          data_temp.push(",");
        }
        this.chestData.dataSets["5"].data = data_temp.concat(
          this.chestData.dataSets["5"].data
        );
      }
      if (this.chestData.dataSets["6"]) {
        data_temp = [];
        for (var i = 0; i < this.chestData.dataSets["5"].data.length; i++) {
          data_temp.push(",");
        }
        this.chestData.dataSets["6"].data = data_temp.concat(
          this.chestData.dataSets["6"].data
        );
      }
    });
  }

  trainingValues() {
    this.doctorService.getTrainingChart(this.memberId).subscribe(
      (res) => {
        console.log(res);
        let pipe = new DatePipe("en-US");
        this.barChartLabel = [];
        let data_temp = [];
        var concatCheck = true;
        if (res.chest_press_values) {
          let chestPressBand = [];
          Object.keys(res.chest_press_values).forEach((key) => {
            let itom = {
              label: this.x3Labels[key],
              data: [],
              backgroundColor: ["rgba(255,255,255,0)"],
              borderWidth: 5,
            };
            let count_zero = 0;
            res.chest_press_values[key].forEach((it, index) => {
              if (count_zero == 0 && it.chest_press_reps == 0) {
              } else {
                count_zero++;
                itom.data.push(it.chest_press_reps);
                this.ChestPressBandDates.push(
                  pipe.transform(it.training_push_created, "dd MMM yyyy")
                );
              }
            });
            this.checkZero(itom.data) ? chestPressBand.push(itom) : "";
          });

          this.ChestPressBandGraph.dataSets = [];
          chestPressBand = this.RemoveLeadingZeros(
            chestPressBand,
            this.ChestPressBandDates
          );
          this.ChestPressBandGraph = {
            dataSets: chestPressBand,
          };

          let _that = this;
          this.ChestPressBandGraph.dataSets.forEach(function (item) {
            _that.chestBandColors.push({
              borderColor: _that.x3BandColors[item["label"]],
            });
          });
        }

        if (this.ChestPressBandGraph.dataSets["1"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestPressBandGraph.dataSets["0"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestPressBandGraph.dataSets["1"].data = data_temp.concat(
            this.ChestPressBandGraph.dataSets["1"].data
          );
        }

        if (this.ChestPressBandGraph.dataSets["2"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestPressBandGraph.dataSets["1"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestPressBandGraph.dataSets["2"].data = data_temp.concat(
            this.ChestPressBandGraph.dataSets["2"].data
          );
        }
        if (this.ChestPressBandGraph.dataSets["3"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestPressBandGraph.dataSets["2"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestPressBandGraph.dataSets["3"].data = data_temp.concat(
            this.ChestPressBandGraph.dataSets["3"].data
          );
        }
        if (this.ChestPressBandGraph.dataSets["4"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestPressBandGraph.dataSets["3"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestPressBandGraph.dataSets["4"].data = data_temp.concat(
            this.ChestPressBandGraph.dataSets["4"].data
          );
        }
        if (this.ChestPressBandGraph.dataSets["5"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestPressBandGraph.dataSets["4"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestPressBandGraph.dataSets["5"].data = data_temp.concat(
            this.ChestPressBandGraph.dataSets["5"].data
          );
        }
        if (this.ChestPressBandGraph.dataSets["6"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestPressBandGraph.dataSets["5"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestPressBandGraph.dataSets["6"].data = data_temp.concat(
            this.ChestPressBandGraph.dataSets["6"].data
          );
        }

        if (res.squat_values) {
          let squatBand = [];
          Object.keys(res.squat_values).forEach((key) => {
            let itom = {
              label: this.x3Labels[key],
              data: [],
              backgroundColor: ["rgba(255,255,255,0)"],
              borderWidth: 5,
            };
            let count_zero = 0;
            res.squat_values[key].forEach((it, index) => {
              if (count_zero == 0 && it.squat_reps == 0) {
              } else {
                count_zero++;
                itom.data.push(it.squat_reps);
                this.SquatBandDates.push(
                  pipe.transform(it.training_push_created, "dd MMM yyyy")
                );
              }
            });
            this.checkZero(itom.data) ? squatBand.push(itom) : "";
          });
          this.SquatBandGraph.dataSets = [];
          squatBand = this.RemoveLeadingZeros(squatBand, this.SquatBandDates);
          this.SquatBandGraph = {
            dataSets: squatBand,
          };
          let _that = this;
          this.SquatBandGraph.dataSets.forEach(function (item) {
            _that.squatBandColors.push({
              borderColor: _that.x3BandColors[item["label"]],
            });
          });
        }

        if (this.SquatBandGraph.dataSets["1"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.SquatBandGraph.dataSets["0"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.SquatBandGraph.dataSets["1"].data = data_temp.concat(
            this.SquatBandGraph.dataSets["1"].data
          );
        }

        if (this.SquatBandGraph.dataSets["2"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.SquatBandGraph.dataSets["1"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.SquatBandGraph.dataSets["2"].data = data_temp.concat(
            this.SquatBandGraph.dataSets["2"].data
          );
        }
        if (this.SquatBandGraph.dataSets["3"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.SquatBandGraph.dataSets["2"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.SquatBandGraph.dataSets["3"].data = data_temp.concat(
            this.SquatBandGraph.dataSets["3"].data
          );
        }
        if (this.SquatBandGraph.dataSets["4"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.SquatBandGraph.dataSets["3"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.SquatBandGraph.dataSets["4"].data = data_temp.concat(
            this.SquatBandGraph.dataSets["4"].data
          );
        }
        if (this.SquatBandGraph.dataSets["5"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.SquatBandGraph.dataSets["4"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.SquatBandGraph.dataSets["5"].data = data_temp.concat(
            this.SquatBandGraph.dataSets["5"].data
          );
        }
        if (this.SquatBandGraph.dataSets["6"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.SquatBandGraph.dataSets["5"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.SquatBandGraph.dataSets["6"].data = data_temp.concat(
            this.SquatBandGraph.dataSets["6"].data
          );
        }

        if (res.overhead_press_values) {

          console.log('overhead ressponce',res.overhead_press_values)
          
          let overheadPressBand = [];
          var dateArr = [];
          var dataSpace = [];
          var loopLenght = [];
          Object.keys(res.overhead_press_values).forEach((key) => {
            let itom = {
              label: this.x3Labels[key],
              data!: [],
              backgroundColor: ["rgba(255,255,255,0)"],
              borderWidth: 5,
            };
            let count_zero = 0;
            res.overhead_press_values[key].forEach((it, index) => {
                count_zero++;
                this.OverheadPressBandDates.push(
                  Date.parse(it.training_push_created)
                  );
                // itom.data.push(it.overhead_press_reps);
            });
            res.overhead_press_values[key].forEach((it) => {
              var isDate;
              let dateCheck = Date.parse(it.training_push_created);
              console.log('main date array',this.OverheadPressBandDates)
              let filterData = this.OverheadPressBandDates.filter((data) => data == dateCheck);
              console.log(filterData);
              if(isDate == false ){
                // itom.data.push(0);
              }
              isDate = false;
              function dataPusher(index,dateCreated){
                index = 0;
                let dateCheck = Date.parse(dateCreated);
                console.log('date checker',this.OverheadPressBandDates[index],dateCheck);
                if(this.OverheadPressBandDates[index] == dateCheck ){
                  itom.data.push(it.overhead_press_reps);
                } else {
                  itom.data.push(',');
                }
                index++;
              }
           });
            this.checkZero(itom.data) ? overheadPressBand.push(itom) : "";
            console.log('key data',itom.data)

          });
          this.OverheadPressBandDates.sort(function (a, b) {
            return a - b;
          });
          this.OverheadPressBandDates.forEach((data) => {
            var date = new Date(data);
            dateArr.push(pipe.transform(date, "dd MMM yyyy"));
          });
          this.OverheadPressBandDates  = Array.from(new Set(dateArr));

          this.OverheadPressBandGraph.dataSets = [];
          overheadPressBand = this.RemoveLeadingZeros(
            overheadPressBand,
            this.OverheadPressBandDates
          );
          this.OverheadPressBandGraph = {
            dataSets: overheadPressBand,
          };
          let _that = this;
          this.OverheadPressBandGraph.dataSets.forEach(function (item) {
            _that.overheadBandColors.push({
              borderColor: _that.x3BandColors[item["label"]],
            });
          });
        }
        if (this.OverheadPressBandGraph.dataSets["1"]) {
          data_temp = [];
          data_temp = this.OverheadPressBandGraph.dataSets["0"].data;
          for (
            var i = 0;
            i < this.OverheadPressBandGraph.dataSets["1"].data.length;
            i++
          ) {
            dataSpace.push(",");
          }
          this.OverheadPressBandGraph.dataSets["0"].data =
            dataSpace.concat(data_temp);
          concatCheck = false;
        }
        if (this.OverheadPressBandGraph.dataSets["2"]) {
          data_temp = [];
          data_temp = this.OverheadPressBandGraph.dataSets["1"];
          this.OverheadPressBandGraph.dataSets["2"].data =
            this.OverheadPressBandGraph.dataSets["2"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.OverheadPressBandGraph.dataSets["2"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.OverheadPressBandGraph.dataSets["1"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.OverheadPressBandGraph.dataSets["3"]) {
          data_temp = [];
          data_temp = this.OverheadPressBandGraph.dataSets["2"];
          this.OverheadPressBandGraph.dataSets["3"].data =
            this.OverheadPressBandGraph.dataSets["3"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.OverheadPressBandGraph.dataSets["3"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.OverheadPressBandGraph.dataSets["2"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.OverheadPressBandGraph.dataSets["4"]) {
          data_temp = [];
          data_temp = this.OverheadPressBandGraph.dataSets["3"];
          this.OverheadPressBandGraph.dataSets["4"].data =
            this.OverheadPressBandGraph.dataSets["4"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.OverheadPressBandGraph.dataSets["4"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.OverheadPressBandGraph.dataSets["3"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.OverheadPressBandGraph.dataSets["5"]) {
          data_temp = [];
          data_temp = this.OverheadPressBandGraph.dataSets["4"];
          this.OverheadPressBandGraph.dataSets["5"].data =
            this.OverheadPressBandGraph.dataSets["5"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.OverheadPressBandGraph.dataSets["5"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.OverheadPressBandGraph.dataSets["4"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.OverheadPressBandGraph.dataSets["6"]) {
          data_temp = [];
          this.OverheadPressBandGraph.dataSets["6"].data = data_temp.concat(
            this.OverheadPressBandGraph.dataSets["6"].data
          );
        }

        if (res.tricep_push_values) {
          let tricepPushBand = [];
          var dateArr = [];
          Object.keys(res.tricep_push_values).forEach((key) => {
            let itom = {
              label: this.x3Labels[key],
              data: [],
              backgroundColor: ["rgba(255,255,255,0)"],
              borderWidth: 5,
            };
            let count_zero = 0;
            res.tricep_push_values[key].forEach((it, index) => {
              if (count_zero == 0 && it.tricep_push_reps == 0) {
              } else {
                count_zero++;
                itom.data.push(it.tricep_push_reps);
                this.TricepPushBandDates.push(
                  Date.parse(it.training_push_created)
                  // pipe.transform(it.training_push_created, "dd MMM yyyy")
                );
              }
            });
            this.checkZero(itom.data) ? tricepPushBand.push(itom) : "";
          });
          dateArr = [];
          this.TricepPushBandDates.sort(function (a, b) {
            return a - b;
          });
          this.TricepPushBandDates.forEach((data) => {
            var date = new Date(data);
            dateArr.push(pipe.transform(date, "dd MMM yyyy"));
          });
          this.TricepPushBandDates = Array.from(new Set(dateArr));

          this.TricepPushBandGraph.dataSets = [];
          tricepPushBand = this.RemoveLeadingZeros(
            tricepPushBand,
            this.TricepPushBandDates
          );
          this.TricepPushBandGraph = {
            dataSets: tricepPushBand,
          };
          let _that = this;
          this.TricepPushBandGraph.dataSets.forEach(function (item) {
            _that.tricepPushBandColors.push({
              borderColor: _that.x3BandColors[item["label"]],
            });
          });
        }

        if (this.TricepPushBandGraph.dataSets["1"]) {
          dataSpace=[]
          data_temp = [];
          data_temp = this.TricepPushBandGraph.dataSets["0"].data;
          this.TricepPushBandGraph.dataSets.forEach((indexData)=>{
            loopLenght.concat(indexData);
          })
          if(this.TricepPushBandGraph.dataSets["1"]=[]){
            for (
              var i = 0;
              i < loopLenght.length;
              i++
            ) {
              dataSpace.push(",");
            }
          }else{
            for (
              var i = 0;
              i < this.TricepPushBandGraph.dataSets["1"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
          }



          this.TricepPushBandGraph.dataSets["0"].data =
            dataSpace.concat(data_temp);
          concatCheck = false;
        }
        if (this.TricepPushBandGraph.dataSets["2"]) {

          data_temp = [];
          data_temp = this.TricepPushBandGraph.dataSets["1"];

          this.TricepPushBandGraph.dataSets.forEach((indexData)=>{
            loopLenght.concat(indexData);
          })
          if(this.TricepPushBandGraph.dataSets["2"] == []){
            for (
              var i = 0;
              i < loopLenght.length;
              i++
            ) {
              dataSpace.push(",");
            }
          }else{
            for (
              var i = 0;
              i < this.TricepPushBandGraph.dataSets["2"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
          }
          // if (concatCheck) {
          //   for (
          //     var i = 0;
          //     i < this.TricepPushBandGraph.dataSets["2"].data.length;
          //     i++
          //   ) {
          //     dataSpace.push(",");
          //   }
          // }
            this.TricepPushBandGraph.dataSets["1"].data =
              dataSpace.concat(data_temp);
          concatCheck = false;
        }
        if (this.TricepPushBandGraph.dataSets["3"]) {
          data_temp = [];
          data_temp = this.TricepPushBandGraph.dataSets["2"];
          this.TricepPushBandGraph.dataSets["3"].data =
            this.TricepPushBandGraph.dataSets["3"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.TricepPushBandGraph.dataSets["3"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.TricepPushBandGraph.dataSets["2"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.TricepPushBandGraph.dataSets["4"]) {
          data_temp = [];
          data_temp = this.TricepPushBandGraph.dataSets["3"];
          this.TricepPushBandGraph.dataSets["4"].data =
            this.TricepPushBandGraph.dataSets["4"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.TricepPushBandGraph.dataSets["4"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.TricepPushBandGraph.dataSets["3"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.TricepPushBandGraph.dataSets["5"]) {

          data_temp = [];
          data_temp = this.TricepPushBandGraph.dataSets["4"];
          this.TricepPushBandGraph.dataSets["5"].data =
            this.TricepPushBandGraph.dataSets["5"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.TricepPushBandGraph.dataSets["5"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.TricepPushBandGraph.dataSets["4"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.TricepPushBandGraph.dataSets["6"]) {

          data_temp = [];
          this.TricepPushBandGraph.dataSets["6"].data = data_temp.concat(
            this.TricepPushBandGraph.dataSets["6"].data
          );
        }

        if (res.chest_flys_values) {
          let chestFlysBand = [];
          Object.keys(res.chest_flys_values).forEach((key) => {
            let itom = {
              label: this.x3Labels[key],
              data: [],
              backgroundColor: ["rgba(255,255,255,0)"],
              borderWidth: 5,
            };

            let count_zero = 0;
            res.chest_flys_values[key].forEach((it, index) => {
              if (count_zero == 0 && it.chest_flys_reps == 0) {
              } else {
                count_zero++;
                itom.data.push(it.chest_flys_reps);
                this.ChestFlysBandDates.push(
                  pipe.transform(it.training_push_created, "dd MMM yyyy")
                );
              }
            });
            this.checkZero(itom.data) ? chestFlysBand.push(itom) : "";
          });

          this.ChestFlysBandGraph.dataSets = [];
          chestFlysBand = this.RemoveLeadingZeros(
            chestFlysBand,
            this.TricepPushBandDates
          );
          this.ChestFlysBandGraph = {
            dataSets: chestFlysBand,
          };
          let _that = this;
          this.ChestFlysBandGraph.dataSets.forEach(function (item) {
            _that.chestFlysBandColors.push({
              borderColor: _that.x3BandColors[item["label"]],
            });
          });
        }

        if (this.ChestFlysBandGraph.dataSets["1"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestFlysBandGraph.dataSets["0"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestFlysBandGraph.dataSets["1"].data = data_temp.concat(
            this.ChestFlysBandGraph.dataSets["1"].data
          );
        }

        if (this.ChestFlysBandGraph.dataSets["2"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestFlysBandGraph.dataSets["1"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestFlysBandGraph.dataSets["2"].data = data_temp.concat(
            this.ChestFlysBandGraph.dataSets["2"].data
          );
        }
        if (this.ChestFlysBandGraph.dataSets["3"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestFlysBandGraph.dataSets["2"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestFlysBandGraph.dataSets["3"].data = data_temp.concat(
            this.ChestFlysBandGraph.dataSets["3"].data
          );
        }
        if (this.ChestFlysBandGraph.dataSets["4"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestFlysBandGraph.dataSets["3"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestFlysBandGraph.dataSets["4"].data = data_temp.concat(
            this.ChestFlysBandGraph.dataSets["4"].data
          );
        }
        if (this.ChestFlysBandGraph.dataSets["5"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestFlysBandGraph.dataSets["4"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestFlysBandGraph.dataSets["5"].data = data_temp.concat(
            this.ChestFlysBandGraph.dataSets["5"].data
          );
        }
        if (this.ChestFlysBandGraph.dataSets["6"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.ChestFlysBandGraph.dataSets["5"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.ChestFlysBandGraph.dataSets["6"].data = data_temp.concat(
            this.ChestFlysBandGraph.dataSets["6"].data
          );
        }

        if (res.dead_lift_values) {
          let deadLiftBand = [];
          Object.keys(res.dead_lift_values).forEach((key) => {
            let itom = {
              label: this.x3Labels[key],
              data: [],
              backgroundColor: ["rgba(255,255,255,0)"],
              borderWidth: 5,
            };
            let count_zero = 0;
            res.dead_lift_values[key].forEach((it, index) => {
              if (count_zero == 0 && it.dead_lift_reps == 0) {
              } else {
                count_zero++;
                itom.data.push(it.dead_lift_reps);
                this.DeadLiftBandDates.push(
                  Date.parse(it.training_pull_created)

                  // pipe.transform(it.training_pull_created, "dd MMM yyyy")
                );
              }
            });
            this.checkZero(itom.data) ? deadLiftBand.push(itom) : "";
          });
          dateArr = [];
          this.DeadLiftBandDates.sort(function (a, b) {
            return a - b;
          });
          this.DeadLiftBandDates.forEach((data) => {
            var date = new Date(data);
            dateArr.push(pipe.transform(date, "dd MMM yyyy"));
          });
          this.DeadLiftBandDates = Array.from(new Set(dateArr));

          this.DeadLiftBandGraph.dataSets = [];
          this.DeadLiftBandGraph = {
            dataSets: deadLiftBand,
          };
          let _that = this;
          this.DeadLiftBandGraph.dataSets.forEach(function (item) {
            _that.deadLiftBandColors.push({
              borderColor: _that.x3BandColors[item["label"]],
            });
          });
        }

        if (this.DeadLiftBandGraph.dataSets["1"]) {
          dataSpace=[]
          data_temp = [];
          data_temp = this.DeadLiftBandGraph.dataSets["0"].data;
          for (
            var i = 0;
            i < this.DeadLiftBandGraph.dataSets["1"].data.length;
            i++
          ) {
            dataSpace.push(",");
          }

          this.DeadLiftBandGraph.dataSets["0"].data =
            dataSpace.concat(data_temp);
          concatCheck = false;
        }
        if (this.DeadLiftBandGraph.dataSets["2"]) {

          data_temp = [];
          data_temp = this.DeadLiftBandGraph.dataSets["1"];
          this.DeadLiftBandGraph.dataSets["2"].data =
            this.DeadLiftBandGraph.dataSets["2"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.DeadLiftBandGraph.dataSets["2"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.DeadLiftBandGraph.dataSets["1"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.DeadLiftBandGraph.dataSets["3"]) {
          data_temp = [];
          data_temp = this.DeadLiftBandGraph.dataSets["2"];
          this.DeadLiftBandGraph.dataSets["3"].data =
            this.DeadLiftBandGraph.dataSets["3"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.DeadLiftBandGraph.dataSets["3"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.DeadLiftBandGraph.dataSets["2"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.DeadLiftBandGraph.dataSets["4"]) {
          data_temp = [];
          data_temp = this.DeadLiftBandGraph.dataSets["3"];
          this.DeadLiftBandGraph.dataSets["4"].data =
            this.DeadLiftBandGraph.dataSets["4"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.DeadLiftBandGraph.dataSets["4"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.DeadLiftBandGraph.dataSets["3"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.DeadLiftBandGraph.dataSets["5"]) {

          data_temp = [];
          data_temp = this.DeadLiftBandGraph.dataSets["4"];
          this.DeadLiftBandGraph.dataSets["5"].data =
            this.DeadLiftBandGraph.dataSets["5"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.DeadLiftBandGraph.dataSets["5"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.DeadLiftBandGraph.dataSets["4"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.DeadLiftBandGraph.dataSets["6"]) {

          data_temp = [];
          this.DeadLiftBandGraph.dataSets["6"].data = data_temp.concat(
            this.DeadLiftBandGraph.dataSets["6"].data
          );
        }
        if (res.bent_row_values) {
          let bentRowBand = [];
          Object.keys(res.bent_row_values).forEach((key) => {
            let itom = {
              label: this.x3Labels[key],
              data: [],
              backgroundColor: ["rgba(255,255,255,0)"],
              borderWidth: 5,
            };

            let count_zero = 0;
            res.bent_row_values[key].forEach((it, index) => {
              if (count_zero == 0 && it.bent_row_reps == 0) {
              } else {
                count_zero++;
                itom.data.push(it.bent_row_reps);
                this.BentRowBandDates.push(
                  Date.parse(it.training_pull_created)
                  // pipe.transform(it.training_pull_created, "dd MMM yyyy")
                );
              }
            });
            this.checkZero(itom.data) ? bentRowBand.push(itom) : "";
          });
          dateArr = [];
          this.BentRowBandDates.sort(function (a, b) {
            return a - b;
          });
          this.BentRowBandDates.forEach((data) => {
            var date = new Date(data);
            dateArr.push(pipe.transform(date, "dd MMM yyyy"));
          });
          this.BentRowBandDates = Array.from(new Set(dateArr));

          this.BentRowBandGraph.dataSets = [];
          bentRowBand = this.RemoveLeadingZeros(
            bentRowBand,
            this.BentRowBandDates
          );
          this.BentRowBandGraph = {
            dataSets: bentRowBand,
          };
          let _that = this;
          this.BentRowBandGraph.dataSets.forEach(function (item) {
            _that.bentRowBandColors.push({
              borderColor: _that.x3BandColors[item["label"]],
            });
          });
        }

        if (this.BentRowBandGraph.dataSets["1"]) {
          dataSpace=[]
          data_temp = [];
          data_temp = this.BentRowBandGraph.dataSets["0"].data;
          for (
            var i = 0;
            i < this.BentRowBandGraph.dataSets["1"].data.length;
            i++
          ) {
            dataSpace.push(",");
          }

          this.BentRowBandGraph.dataSets["0"].data =
            dataSpace.concat(data_temp);
          concatCheck = false;
        }
        if (this.BentRowBandGraph.dataSets["2"]) {

          data_temp = [];
          data_temp = this.BentRowBandGraph.dataSets["1"];
          this.BentRowBandGraph.dataSets["2"].data =
            this.BentRowBandGraph.dataSets["2"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.BentRowBandGraph.dataSets["2"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.BentRowBandGraph.dataSets["1"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.BentRowBandGraph.dataSets["3"]) {
          data_temp = [];
          data_temp = this.BentRowBandGraph.dataSets["2"];
          this.BentRowBandGraph.dataSets["3"].data =
            this.BentRowBandGraph.dataSets["3"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.BentRowBandGraph.dataSets["3"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.BentRowBandGraph.dataSets["2"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.BentRowBandGraph.dataSets["4"]) {
          data_temp = [];
          data_temp = this.BentRowBandGraph.dataSets["3"];
          this.BentRowBandGraph.dataSets["4"].data =
            this.BentRowBandGraph.dataSets["4"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.BentRowBandGraph.dataSets["4"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.BentRowBandGraph.dataSets["3"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.BentRowBandGraph.dataSets["5"]) {

          data_temp = [];
          data_temp = this.BentRowBandGraph.dataSets["4"];
          this.BentRowBandGraph.dataSets["5"].data =
            this.BentRowBandGraph.dataSets["5"].data.concat(data_temp);
          if (concatCheck) {
            for (
              var i = 0;
              i < this.BentRowBandGraph.dataSets["5"].data.length;
              i++
            ) {
              dataSpace.push(",");
            }
            this.BentRowBandGraph.dataSets["4"].data =
              dataSpace.concat(data_temp);
          }
          concatCheck = false;
        }
        if (this.BentRowBandGraph.dataSets["6"]) {

          data_temp = [];
          this.BentRowBandGraph.dataSets["6"].data = data_temp.concat(
            this.BentRowBandGraph   .dataSets["6"].data
          );
        }
        if (res.bicep_curl_values) {
          let bicepCurlBand = [];
          Object.keys(res.bicep_curl_values).forEach((key) => {
            let itom = {
              label: this.x3Labels[key],
              data: [],
              backgroundColor: ["rgba(255,255,255,0)"],
              borderWidth: 5,
            };

            let count_zero = 0;
            res.bicep_curl_values[key].forEach((it, index) => {
              if (count_zero == 0 && it.bicep_curl_reps == 0) {
              } else {
                count_zero++;
                itom.data.push(it.bicep_curl_reps);
                this.BicepCurlBandDates.push(
                  pipe.transform(it.training_pull_created, "dd MMM yyyy")
                );
              }
            });
            this.checkZero(itom.data) ? bicepCurlBand.push(itom) : "";
          });
          this.BicepCurlBandGraph.dataSets = [];
          bicepCurlBand = this.RemoveLeadingZeros(
            bicepCurlBand,
            this.BicepCurlBandDates
          );
          this.BicepCurlBandGraph = {
            dataSets: bicepCurlBand,
          };
          let _that = this;
          this.BicepCurlBandGraph.dataSets.forEach(function (item) {
            _that.bicepCurlBandColors.push({
              borderColor: _that.x3BandColors[item["label"]],
            });
          });
        }

        if (this.BicepCurlBandGraph.dataSets["1"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.BicepCurlBandGraph.dataSets["0"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.BicepCurlBandGraph.dataSets["1"].data = data_temp.concat(
            this.BicepCurlBandGraph.dataSets["1"].data
          );
        }

        if (this.BicepCurlBandGraph.dataSets["2"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.BicepCurlBandGraph.dataSets["1"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.BicepCurlBandGraph.dataSets["2"].data = data_temp.concat(
            this.BicepCurlBandGraph.dataSets["2"].data
          );
        }
        if (this.BicepCurlBandGraph.dataSets["3"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.BicepCurlBandGraph.dataSets["2"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.BicepCurlBandGraph.dataSets["3"].data = data_temp.concat(
            this.BicepCurlBandGraph.dataSets["3"].data
          );
        }
        if (this.BicepCurlBandGraph.dataSets["4"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.BicepCurlBandGraph.dataSets["3"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.BicepCurlBandGraph.dataSets["4"].data = data_temp.concat(
            this.BicepCurlBandGraph.dataSets["4"].data
          );
        }
        if (this.BicepCurlBandGraph.dataSets["5"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.BicepCurlBandGraph.dataSets["4"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.BicepCurlBandGraph.dataSets["5"].data = data_temp.concat(
            this.BicepCurlBandGraph.dataSets["5"].data
          );
        }
        if (this.BicepCurlBandGraph.dataSets["6"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.BicepCurlBandGraph.dataSets["5"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.BicepCurlBandGraph.dataSets["6"].data = data_temp.concat(
            this.BicepCurlBandGraph.dataSets["6"].data
          );
        }

        if (res.calf_raise_values) {
          let calfRaiseBand = [];
          Object.keys(res.calf_raise_values).forEach((key) => {
            let itom = {
              label: this.x3Labels[key],
              data: [],
              backgroundColor: ["rgba(255,255,255,0)"],
              borderWidth: 5,
            };
            let count_zero = 0;
            res.calf_raise_values[key].forEach((it, index) => {
              if (count_zero == 0 && it.calf_raise_reps == 0) {
              } else {
                count_zero++;
                itom.data.push(it.calf_raise_reps);
                this.CalfRaiseBandDates.push(
                  pipe.transform(it.training_pull_created, "dd MMM yyyy")
                );
              }
            });
            this.checkZero(itom.data) ? calfRaiseBand.push(itom) : "";
          });
          this.CalfRaiseBandGraph.dataSets = [];
          calfRaiseBand = this.RemoveLeadingZeros(
            calfRaiseBand,
            this.CalfRaiseBandDates
          );
          this.CalfRaiseBandGraph = {
            dataSets: calfRaiseBand,
          };
          let _that = this;
          this.CalfRaiseBandGraph.dataSets.forEach(function (item) {
            _that.calfRaiseBandColors.push({
              borderColor: _that.x3BandColors[item["label"]],
            });
          });
        }

        if (this.CalfRaiseBandGraph.dataSets["1"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.CalfRaiseBandGraph.dataSets["0"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.CalfRaiseBandGraph.dataSets["1"].data = data_temp.concat(
            this.CalfRaiseBandGraph.dataSets["1"].data
          );
        }

        if (this.CalfRaiseBandGraph.dataSets["2"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.CalfRaiseBandGraph.dataSets["1"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.CalfRaiseBandGraph.dataSets["2"].data = data_temp.concat(
            this.CalfRaiseBandGraph.dataSets["2"].data
          );
        }
        if (this.CalfRaiseBandGraph.dataSets["3"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.CalfRaiseBandGraph.dataSets["2"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.CalfRaiseBandGraph.dataSets["3"].data = data_temp.concat(
            this.CalfRaiseBandGraph.dataSets["3"].data
          );
        }
        if (this.CalfRaiseBandGraph.dataSets["4"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.CalfRaiseBandGraph.dataSets["3"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.CalfRaiseBandGraph.dataSets["4"].data = data_temp.concat(
            this.CalfRaiseBandGraph.dataSets["4"].data
          );
        }
        if (this.CalfRaiseBandGraph.dataSets["5"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.CalfRaiseBandGraph.dataSets["4"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.CalfRaiseBandGraph.dataSets["5"].data = data_temp.concat(
            this.CalfRaiseBandGraph.dataSets["5"].data
          );
        }
        if (this.CalfRaiseBandGraph.dataSets["6"]) {
          data_temp = [];
          for (
            var i = 0;
            i < this.CalfRaiseBandGraph.dataSets["5"].data.length;
            i++
          ) {
            data_temp.push(",");
          }
          this.CalfRaiseBandGraph.dataSets["6"].data = data_temp.concat(
            this.CalfRaiseBandGraph.dataSets["6"].data
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
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
}
