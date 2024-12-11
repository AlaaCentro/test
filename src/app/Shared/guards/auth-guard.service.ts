import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard  {
    constructor(private _router: Router, private _authService: AuthService) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('userCode') || localStorage.getItem('userCode')||state.url.includes('/inbound/mainInBound')) {
            return true;
        }
        this._router.navigate(['/access']);
        return false;
    }
}
