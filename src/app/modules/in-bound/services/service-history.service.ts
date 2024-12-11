import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "src/app/Shared/dtos/api-response";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ServiceHistoryService {
    private TOKEN_KEY = "EMRtoken";

    private apiUrl = environment.APIUrl;

    constructor(private http: HttpClient) {}

    GetServiceList(chaiss: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/service_hist_by_chass/" + chaiss
        );
    }
}
