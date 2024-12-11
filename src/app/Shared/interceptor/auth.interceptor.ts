import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private _authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var lang = 'en';
        if (localStorage.getItem('lang')) {
            lang = localStorage.getItem('lang');
        }
        if (req.url.indexOf('Login') < 0 && this._authService.getToken()) {
            var token = 'Bearer ' + this._authService.getToken();
            const cloneReq = req.clone({
                headers: req.headers.set(
                    'Authorization',
                    token
                )
                    //.set('Content-Type', 'application/json')
                    .set('Accept-Language', lang)
            });
            return next.handle(cloneReq).pipe(tap(() => { },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status == 401) {
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('login');
                        }
                    }
                }));
        }
        else {

            const cloneReq = req.clone({
                headers: req.headers
                    //.set('Content-Type', 'application/json')
                    .set('Accept-Language', lang)
            });
            return next.handle(cloneReq);
        }
    }
}
