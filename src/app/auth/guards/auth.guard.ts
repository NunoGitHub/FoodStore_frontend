import { UserService } from './../../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService:UserService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userService.currentUser.token) return true;
    this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}});//state.url has the url component that needs to be activated, so the  for example the checkout, for example we go to  check out and we are redirected to the login because we do not have the login, so we make the login and we are redircted to the checkout
    return false;//not show the page that user wants to go
  }

}
