import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin();
  }
  checkLogin(): boolean {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      (user.role !== 'member')
        ? this.router.navigate(["/coach"])
        : this.router.navigate(["/patient"]);
      return false;
    }
    // Navigate to the login page with extras
    return true;
  }
}
