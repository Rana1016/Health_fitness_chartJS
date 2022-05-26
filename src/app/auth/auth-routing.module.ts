import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component'
import {ResetPasswordComponent} from './reset-password/reset-password.component'
import { ResetPasswordGuard } from '../auth/reset-password.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'recover_forgotten_password',
    component: ResetPasswordComponent,
    canActivate: [ResetPasswordGuard]

  },
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
