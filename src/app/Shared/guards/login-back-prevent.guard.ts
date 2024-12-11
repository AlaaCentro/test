import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginBackPreventGuard implements CanActivate {
    constructor(private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('userCode') || localStorage.getItem('userCode')) {
        this._router.navigate(['/inbound/mainInBound']);
            return true;
        }
        this._router.navigate(['']);
        return false;



}}
