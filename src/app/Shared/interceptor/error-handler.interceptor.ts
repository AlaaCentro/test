import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private translate: TranslateService,
        private messageService: MessageService, private authservice: AuthService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(catchError(error => this.errorHandler(error)));
    }

    // Customize the default error handler here if needed
    private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
        let data: { reason: string; status?: number };
        let errorCode = error.status;
        switch (errorCode) {
            case 0:
                data = {
                    reason: this.translate.currentLang === 'ar'
                        ? 'عذرا، هناك خطأ ما.'
                        : 'Sorry, Something Went Wrong in server.',
                    status: error.status
                };

                //  this.authservice.logOut();
                break;
            case 400:
                data = {
                    reason: this.translate.currentLang === 'en' ? 'one or more field has invalid value' : 'البيانات المدخله غير صحيحه',
                    status: error.status
                };
                break;
            case 401:
                this.messageService.add({
                    severity: 'error', summary: 'Error',
                    detail: this.translate.currentLang === 'en'
                        ? 'Username or password is incorrect'
                        : 'اسم المستخدم او كلمه المرور غير صحيحه'
                });
                // TODO
                this.authservice.logOut();
                break;

            case 403:
                data = {
                    reason: "Sorry, you aren't Authorized",
                    status: error.status
                };
                break;

            case 404:

                this.messageService.add({
                    severity: 'error', summary: 'Error',
                    detail: this.translate.currentLang === 'en'
                        ? 'Not Found' :
                        'المحتوى غير موجود'
                });
                break;

            case 500:
                data = {
                    reason: this.translate.currentLang === 'ar' ?
                        'عذرا هناك خطأ في الخادم' :
                        'Sorry, there is a server error'
                    , status: error.status
                };
                // this.authservice.logOut();
                break;

            default:
                data = {
                    reason:
                        this.translate.currentLang === 'ar'
                            ? 'عذرا، هناك خطأ ما.'
                            : 'Sorry, Something Went Wrong.',
                    status: error.status
                };
                break;
        }
        this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: data.reason
        });
        throw error;
    }
}
