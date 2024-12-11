import { LookupTypeEnum } from './../enums/lookup-type.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LookupService {
    private apiUrl = environment.APIUrl;
    constructor(private http: HttpClient, private _router: Router) { }

    // getSelectList(query: string, type: LookupTypeEnum): Observable<any> {
    //     return this.http.get<any>(this.apiUrl + 'api/Lookups?NameContains=' + query + '&LookupType=' + type + '&PageNumber=1&PageSize=1000');
    // }

    getIndustriesSelectList(query: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'api/Industries?PageNumber=1&PageSize=500&NameContains=' + query);
    }

    getCountriesSelectList(query: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/Countries?PageNumber=1&PageSize=500&NameContains=' + query);
    }

    getGovernoratesSelectList(query: string): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/Governorates?PageNumber=1&PageSize=500&NameContains=' + query);
    }
}
