import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ActionService {
    private TOKEN_KEY = "EMRtoken";

    private apiUrl = environment.APIUrl;

    constructor(private http: HttpClient) {}

    sendSMS(data: any): Observable<any> {
        return this.http.post<any>(
            this.apiUrl + "inbound//get_inbound/send_sms",
            data
        );
    }

    GetSMSHistory(mobile: any, voiceid: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl +
                "inbound/get_inbound/sms_hist/" +
                mobile +
                "/" +
                voiceid
        );
    }

    GetCrmMinistryList(): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/crm_ministry_reason"
        );
    }

    GetActionHistory(id: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/crm_inbound_action_hist/" + id
        );
    }

    GetMinistryHistory(id: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/crm_inbound_ministry_hist/" + id
        );
    }
}
