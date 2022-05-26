import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService:AuthService,private fb:FormBuilder,private router: Router,private toastr: ToastrService) { }
  error = null;
  submitted = false;
  ForgotPasswordForm = this.fb.group({
    email:['',[Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
  });
  ChangePassword(){
    if(!this.ForgotPasswordForm.valid){
   this.submitted=true;
   return;
   }
   var form = this.ForgotPasswordForm.value;
   var host = window.location.origin;
   this.authService.sentemail(form,host).subscribe((res) => {
   this.toastr.success(res.OK)
   localStorage.setItem("token",JSON.stringify(res));
   this.error= null;
   },(error) =>{
    console.log("Error: ",error.error.error)
    this.error = error.error.error;
  })

    //  this.router.navigate(['login/recover_forgotten_password'])
  //  this.submitted=false;
  //    var form = this.loginForm.value;
  //    this.authService.signIn(form).subscribe((res) => {
  //      this.authService.isLoggedIn = true;
  //      localStorage.setItem("user",JSON.stringify(res));
  //      this.toastr.success('Login Successfully');
  //        this.router.navigate(['/doctor']);
  //    },(error) =>{
  //      console.log("Error: ",error.error.Error)
  //      this.error = error.error.Error;
  //    })
   }
  ngOnInit() {
  }

}
