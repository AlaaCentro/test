import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class PermissionService {
    private apiUrl = `${environment.APIUrl}inbound/get_inbound/crm_update_allowed`;
    public permissionSubject = new BehaviorSubject<any>(null);
    public permissionsResultList: string[] = []; // Array to hold the permissions

    constructor(private http: HttpClient) {}

    fetchAndSetPermission(email: string): void {
        const apiUrlWithEmail = `${this.apiUrl}/${email}`;
        console.log("API URL:", apiUrlWithEmail);

        this.http.get<any>(apiUrlWithEmail).subscribe({
            next: (response) => {
                if (response.user_code) {
                    const userPermissions = response;
                    sessionStorage.setItem(
                        "userCode",
                        userPermissions.user_code
                    );

                    this.permissionsResultList =
                        userPermissions.result.map(Number);
                    // sessionStorage.setItem("permissionsResult", userPermissions.result);
                    // sessionStorage.setItem("permissionsName", userPermissions.name);
                    this.permissionSubject.next(userPermissions);
                } else {
                    console.warn("No permissions found for user.");
                    this.permissionSubject.next(null);
                }
            },
            error: (error) => {
                console.error("Error fetching permission:", error);
                this.permissionSubject.next(null);
            },
        });
    }

    getPermissionsResultList(): string[] {
        return this.permissionsResultList;
    }

    getPermission(): Observable<any> {
        return this.permissionSubject.asObservable();
    }

    hasPermission(permission: any): boolean {
        return this.permissionsResultList.includes(permission);
    }
}
