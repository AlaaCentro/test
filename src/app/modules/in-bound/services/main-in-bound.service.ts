import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainInBoundService {

    private TOKEN_KEY = "EMRtoken";

    private apiUrl = environment.APIUrl;

    constructor(private http: HttpClient) {}

    GetUserIdByEmail(Email: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/crm_update_allowed/" + Email
        );
    }


    GetChassNum(chass: any,PlateNum:any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/get_inbound/search_chass/" + chass+'/'+PlateNum
        );
    }

}
