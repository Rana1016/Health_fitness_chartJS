import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { ToastrService } from "ngx-toastr";
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user:any;
  public id: any;

  constructor(
    private route       : ActivatedRoute, 
    private adminService: AdminService, 
    private toastr      : ToastrService, 
    private authService : AuthService
  ) { }

  logout(e): void {
    this.toastr.success("Logout Successfully");
    this.authService.logout();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.route.params.subscribe(params => {
      this.id = params['id'] 
    });
    console.log(this.id)
  }

}
