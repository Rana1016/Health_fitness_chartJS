import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService:AuthService,private fb:FormBuilder,private router: Router,private toastr: ToastrService) { }
  error = null;
  submitted = false;
  ChangePasswordForm = this.fb.group({
    password1:['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required,Validators.minLength(6)]]
  });
  Change_Password(){
    if(this.ChangePasswordForm.invalid){
      this.submitted = true;
      return;
    }
    var form = this.ChangePasswordForm.value;
    this.authService.changepass(form).subscribe((res) => {
console.log(res)
this.error = null;
   this.toastr.success("Password Changed Successfully");
   localStorage.removeItem('token');
   this.router.navigate(['/login']);
    },(error) =>{
      console.log("Error: ",error.error.error)
      this.error = error.error.error;
    })
  }
  ngOnInit() {
  }

}
