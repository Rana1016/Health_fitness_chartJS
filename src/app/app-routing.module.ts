import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { GuestGuard } from "./auth/guest.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canActivate: [GuestGuard],
  },
  {
    path: "coach",
    loadChildren: () =>
      import("./doctor/doctor.module").then((m) => m.DoctorModule),
    canActivate: [AuthGuard],
  },
  {
    path: "patient",
    loadChildren: () =>
      import("./doctor/doctor.module").then((m) => m.DoctorModule),
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin-panel/admin-panel.module").then((m) => m.AdminPanelModule),
    canActivate: [AuthGuard],
  },
  {
    path: "user/:id",
    loadChildren: () =>
      import("./doctor/doctor.module").then((m) => m.DoctorModule),
    canActivate: [AuthGuard],
  },
 
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
