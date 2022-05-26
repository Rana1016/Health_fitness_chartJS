import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../admin.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators, AbstractControl} from "@angular/forms";
import Compressor from "compressorjs";

declare var $;

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"],
})
export class MembersComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtInstance: DataTables.Api;
  dtTrigger: Subject<any> = new Subject();
  user_table_obj = null;
  user_role = false;
  members: any;
  imageEditing: boolean = false;
  table_user_id: any;
  update_note_count= 0;
  formType = 1;
  imageElement: any;
  updateImage: boolean = true;
  url2: any;
  submitted: boolean = false;
  spinner = false;
  arr_index = 0;
  ImageName = "";
  member_id = "";
  addMemberError = null;
  formTitle = "Register a new user";
  formBtn = "Add Member Now";
  updatedImageFile: any = null;
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
    password: new FormControl("", [
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
    dob: new FormControl(""),
    userName: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getMembers();
    this.dtOptions = {
      destroy: true,
      pagingType: "full_numbers",
      retrieve: true,
    };
  }


  createNew(type) {
    this.submitted = false;
    this.url2 = "https://levelup-bucket.s3.amazonaws.com/media/profile_pictures/default_CalbzNF.jpg"
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


 
 addMembers() {
    console.log(this.memberForm.valid)
    if (!this.memberForm.valid) {
      this.submitted = true;
      return;
    }
    this.spinner = true;
    this.submitted = false;
    var user = this.memberForm.value;
    user.dob = this.updatedImageFile;
    if (this.formType) {
      this.adminService.addUser(user).subscribe(
        (res) => {
            console.log(res)
            this.members.push(res)
            this.rerender();
            this.updatedImageFile = null;
            if(this.imageElement){
            this.imageElement.value = ""
            }
            $("#addMember").modal("hide");
            this.memberForm.reset();
            this.toastr.success("Member Added Successfully");
            this.addMemberError = null;
            this.spinner = false;
          }) 
        ,
        (error) => {
          this.spinner = false;
          this.updatedImageFile = null;
          this.addMemberError = error.error.Error;
          console.log(error);
        }
    } else {
      this.adminService.addCoach(user).subscribe(
        (res) => {
          this.members.push(res)
          this.rerender();
          if(this.imageElement){
          this.imageElement.value = ""
          }
          $("#addMember").modal("hide");
          this.memberForm.reset();
          this.toastr.success("Coach Added Successfully");
          this.spinner = false;
        },
        (error) => {
          this.spinner = false;
          this.addMemberError = error.error.Error;
          console.log(error);
        }
      );
    }
  }

  updateUser() {
    if (!this.updateMemberForm.valid) {
      this.submitted = true;
      return;
    }
    this.spinner = true;
    this.submitted = false;
    let data = this.updateMemberForm.value;
    data.id = this.user_table_obj.id;
    this.user_role ? (data.role = "coach") : (data.role = "member");
    data.note_count = this.update_note_count
    if (this.updatedImageFile) {
      const that = this;
      data.picture = this.updatedImageFile;
      new Compressor(data.picture, {
        quality: 0.4,
        success(result) {
          data.picture = result;
          that.adminService.updateUser(data).subscribe(
            (res) => {
              that.members[that.arr_index].name = res.name;
              that.members[that.arr_index].get_email = res.get_email;
              that.updatedImageFile = null;
              that.spinner = false;
              data.picture = null;
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
      this.adminService.updateUser(data).subscribe(
        (res) => {
          this.members[this.arr_index].name = res.name;
          this.members[this.arr_index].get_email = res.get_email;
          this.spinner = false;
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

  getMembers() {
    this.spinner = true;
    this.adminService.getMembers().subscribe(
      (res) => {
        this.spinner = false;
        this.members = res;
        console.log(res)
        this.dtTrigger.next();
      },
      (error) => {
        this.spinner = false;
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  getMemberId(id) {
    this.member_id = id;
  }
  get memberFormData(): { [key: string]: AbstractControl } {
    return this.memberForm.controls;
  }
  get updateMemberFormData(): { [key: string]: AbstractControl } {
    return this.updateMemberForm.controls;
  }
  delete_member() {
    this.spinner = true;
    this.adminService.deleteMember(this.member_id).subscribe(
      (res) => {
        const i = this.members.findIndex((e) => e.id == this.member_id);
        console.log(i);
        this.members.splice(i, 1);
        this.rerender();
        this.spinner = false;
        this.toastr.error("Member Deleted Successfully");
      },
      (error) => {
        this.spinner = false;
        console.log(error);
      }
    );
  }

  getMemberObj(obj, index) {
    this.arr_index = index;
    this.user_table_obj = obj;
    this.spinner = true;
    this.adminService.getMember(obj.get_email).subscribe(
      (res) => {
        console.log(res)
        this.updateMemberForm.patchValue(res);
        res.role == "member"
          ? (this.user_role = false)
          : (this.user_role = true);
        console.log(this.user_role);
        this.update_note_count = res.note_count
        this.table_user_id = res.id;
        this.url2 = res.picture;
        this.spinner = false;
      },
      (error) => {
        this.spinner = false;
        console.log(error);
      }
    );
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

  imageChangedEvent: any = "";
  croppedImage: any = "";

  fileChangeEvent(event: any, type: any,elem :any): void {
    this.spinner = true;
    this.updateImage = true;
    this.ImageName = event.target.files[0].name;
    this.imageChangedEvent = event;
    this.imageElement = elem;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.url2 = event.base64;
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
}
