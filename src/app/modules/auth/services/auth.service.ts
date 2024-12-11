import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckCodeDto } from '../dto/check-code-dto';
import { CheckPasswordDto } from '../dto/check-password-dto';
import { ForgetPasswordDto } from '../dto/forget-password-dto';
import { ResetPasswordDto } from '../dto/reset-password-dto';
import { UserChangePasswordDto } from '../dto/user-change-password-dto';
import { AuthModel, User } from '../models/authModel';
import { SystemConfiguration } from '../models/system-configuration';
import { EncryptDecryptService } from 'src/app/Shared/services/encrypt-decrypt.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private jwtHelper = new JwtHelperService();
    private tokenKey: string = environment.tokenKey;
    userPermissions: number[] = [];
    private apiUrl = environment.APIUrl;
    get currentUser(): User {
        let user: User = null;
        if (this.isAuthenticated()) {
            user = this.jwtHelper.decodeToken(this.getToken());
        }
        if (!user || !user.id) {
            user = null;
            this.removeToken();
        }
        return user;
    }

    constructor(private http: HttpClient, private _router: Router, private encryptService: EncryptDecryptService) {
    }

    login(credentials: AuthModel): Observable<any> {
        return this.http.post(this.apiUrl + 'inbound/get_inbound/validate_user', credentials);
    }

    regenerateToken(userId: string): Observable<any> {
        return this.http.get(this.apiUrl + 'api/User/RegenerateToken/' + userId);
    }

    private setSessionAtStartUp() {
        this.setToken(localStorage.getItem(this.encryptService.encryptUsingAES256(this.tokenKey)), false);
    }

    public getToken() {
        return localStorage.getItem(this.encryptService.encryptUsingAES256(this.tokenKey));
    }

    setToken(token: string, rememberMe: boolean) {
        if (token && token.trim()) {
            if (rememberMe === true) {
                localStorage.setItem(this.encryptService.encryptUsingAES256(this.tokenKey), token);
            }
            localStorage.setItem(this.encryptService.encryptUsingAES256(this.tokenKey), token);
        }
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem('sessionEnded');
    }

    public isAuthenticated(): boolean {
        let isAuth = false;
        try {
            const token = this.getToken();
            isAuth = token ? !this.jwtHelper.isTokenExpired(token) : false;
        } catch (error) {
            isAuth = false;
        } finally {
            if (!isAuth) {
                this.removeToken();
            }
            return isAuth;
        }
    }

    endSession() {
        localStorage.setItem('sessionEnded', 'sessionEnded');
    }

    logOut() {
        localStorage.clear();
        sessionStorage.clear();
        this._router.navigate(['']);
    }

    public getLang() {
        return localStorage.getItem("lang");
    }


}
