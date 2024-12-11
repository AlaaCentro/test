import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ComponsationService {
    private TOKEN_KEY = "EMRtoken";

    private apiUrl = environment.APIUrl;

    constructor(private http: HttpClient) {}

    GetComponsationList1(chaiss: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/comp_info1/" + chaiss
        );
    }

    GetComponsationList2(chaiss: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/comp_info2/" + chaiss
        );
    }
}
