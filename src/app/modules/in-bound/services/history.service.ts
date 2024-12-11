import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class HistoryService {
    private TOKEN_KEY = "EMRtoken";

    private apiUrl = environment.APIUrl;

    constructor(private http: HttpClient) {}

    GetHistoryList(chaiss: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/voice_hist_by_chass/" + chaiss
        );
    }
}
