import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "src/app/Shared/dtos/api-response";
import { SelectList } from "src/app/Shared/dtos/select-list";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class VoiceInfoService {
    private TOKEN_KEY = "EMRtoken";

    private apiUrl = environment.APIUrl;

    constructor(private http: HttpClient) {}

    GetInboundDataByChass(Id: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/chass_by_mobile/" + Id
        );
    }

    GetInboundDataByJob(Id: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl +
                "inbound/get_inbound/chass_by_mobile/job_by_chass/" +
                Id
        );
    }

    GetCustomerVoiceList(): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/customer_voice"
        );
    }

    GetComplaintList(type): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/customer_voice/type/" + type
        );
    }

    GetSourceList(): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/customer_voice/source_list"
        );
    }

    GetInboundDataByVoiceID(p_id: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl +
                "inbound/post_inbound/insert_update_inbound?p_id=" +
                p_id
        );
    }

    createInbound(data: any): Observable<any> {
        return this.http.post<any>(
            this.apiUrl + "inbound/post_inbound/insert_update_inbound",
            data
        );
    }

    updateInbound(data: any): Observable<any> {
        return this.http.put<any>(
            this.apiUrl + "inbound/post_inbound/insert_update_inbound",
            data
        );
    }
}
