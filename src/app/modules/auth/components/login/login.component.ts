import { HttpClient } from "@angular/common/http";
import { PermissionService } from "src/app/modules/auth/services/permission.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MessageService } from "primeng/api";
import { AuthModel } from "../../models/authModel";
import { AuthService } from "../../services/auth.service";
import { environment } from "./../../../../../environments/environment";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    logoUrl = environment.logoUrl;
    loginAvatar = environment.loginAvatar;
    isLoading = false;
    langs = [
        { value: "ar", label: "عربي" },
        { value: "en", label: "English" },
    ];
    authModel: AuthModel;
    isRTL: boolean; // = false;
    form: FormGroup;
    formSubmitted = false;
    selectedlang = "en";

    constructor(
        private router: Router,
        private _authService: AuthService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private loaderService: NgxUiLoaderService,
        public translate: TranslateService,
        public permission: PermissionService,
        private http: HttpClient
    ) {
        // comment this as there is no logout to can login again
        if (this._authService.getToken()) {
            this.router.navigate(["/home"]);
        }
    }

    ngOnInit() {
        this.initForm();
        this.switchLang(this.translate.currentLang || "en");
    }

    switchLang(lang: string) {
        this.selectedlang = lang;
        this.translate.use(lang);
        localStorage.setItem("lang", lang);
        if (lang == "ar") this.isRTL = true;
        else this.isRTL = false;
    }

    onSubmit() {
        this.formSubmitted = true;
        this.formSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        this.authModel = this.form.value;
        this.loaderService.start();
        this.isLoading = true;
        this._authService.login(this.authModel).subscribe({
            next: (res) => {
                if (res.user_code) {
                    if (!localStorage.getItem("lang")) {
                        localStorage.setItem(
                            "lang",
                            res.data.defaultLanguage
                                ? res.data.defaultLanguage
                                : "en"
                        );
                    }
                    if (res.user_code) {
                        const userPermissions = res;
                        sessionStorage.setItem(
                            "userCode",
                            userPermissions.user_code
                        );

                        this.permission.permissionsResultList =
                            res.result.map(Number);
                        this.permission.permissionSubject.next(res);
                    }
                    this.router.navigate(["/inbound/mainInBound"]);
                    localStorage.setItem("menuMode", "static");
                    localStorage.setItem("layoutMode", "light");
                    this.router.navigate(["/inbound/mainInBound"]);
                } else {
                    this.addSingle(res.error, "error", "error");
                    this.form.get("password").setValue("");
                    this.isLoading = false;
                    this.loaderService.stop();
                    return;
                }
                this.loaderService.stop();
            },
            error: (error) => {
                this.isLoading = false;
                this.loaderService.stop();
            },
        });
        this.loaderService.stop();
    }

    addSingle(textmsg: string, sumary: string, severity: string) {
        this.messageService.add({
            key: "bc",
            severity,
            summary: sumary,
            detail: textmsg,
        });
    }

    initForm() {
        this.form = this.fb.group({
            password: ["", Validators.required],
            rememberMe: [false],
            email: ["", [Validators.required]], //Validators.email
        });
    }

    test() {
        const apiUrl = "https://http.dog/101.jpg"; // Replace with your API URL

        this.http.get(apiUrl, { responseType: "blob" }).subscribe(
            (response) => {
                // Success: Show a success message
                const res = "Data fetched successfully!";
                this.addssSingle(res, "success", "Success");
            },
            (error) => {
                // Error: Show an error message
                const res = "Failed to fetch data!";
                this.addssSingle(res, "error", "Error");
            }
        );
    }

    test2() {
        const apiUrl = "https://48.217.88.248/BE/weatherforecast/login";
        this.isLoading = true; // Start loader
        let item: any = {};
        item.email = this.form.get("email").value;
        item.pass = this.form.get("password").value;

        this.http.post<any>(apiUrl, item).subscribe({
            next: (res) => {
                if (res?.message =="Login successful") {
                    if (!localStorage.getItem("lang")) {
                        localStorage.setItem(
                            "lang",
                            res.data?.defaultLanguage || "en"
                        );
                    }
                    // Set layout preferences
                    localStorage.setItem("menuMode", "static");
                    localStorage.setItem("layoutMode", "light");
                    // Navigate to the main inbound page
                    this.router.navigate(["/inbound/mainInBound"]);
                } else {
                    // Handle login failure
                    this.addSingle(
                        res.error || "Login failed",
                        "error",
                        "error"
                    );
                    this.form.get("password").setValue("");
                }
                this.isLoading = false; // Stop loader
                this.loaderService.stop();
            },
            error: (error) => {
                // Handle API errors
                console.error("Login error:", error);
                this.addSingle(
                    "An error occurred during login",
                    "error",
                    "error"
                );
                this.isLoading = false; // Stop loader
                this.loaderService.stop();
            },
        });
    }

    addssSingle(message: string, severity: string, summary: string) {
        this.messageService.add({ severity, summary, detail: message });
    }
}
