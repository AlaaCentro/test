import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class AttachService {
    private TOKEN_KEY = "EMRtoken";

    private apiUrl = environment.APIUrl;

    constructor(private http: HttpClient) {}

    uploadImage(file: File, id: any): Observable<any> {
        const formData: FormData = new FormData();
        formData.append("file", file);
        let fileExtension = file.name.split(".").pop();
        const url = `${this.apiUrl}inbound/post_inbound/upload_image?filename=${file.name}&mimetype=image/${fileExtension}&id=${id}`;
        const headers = new HttpHeaders();
        return this.http.post(url, formData, { headers });
    }

    updateUploadedImage(file: File, id: any): Observable<any> {
        const formData: FormData = new FormData();
        formData.append("file", file);
        let fileExtension = file.name.split(".").pop();
        const url = `${this.apiUrl}inbound/post_inbound/upload_image?filename=${file.name}&mimetype=image/${fileExtension}&id=${id}`;
        const headers = new HttpHeaders();
        return this.http.post(url, formData, { headers });
    }

    getVoiceImage(id: any): Observable<any> {
        return this.http.get<any>(
            this.apiUrl + "inbound/post_inbound/upload_image?id=" + id
        );
    }

    test(imageData: any): Observable<any> {
        let apiKey = "13b8acfca0af1bf526a8753d69282c93";
        let apiUrl = "https://api.imgbb.com/1/upload";
        const url = `${apiUrl}?key=${apiKey}`;
        const formData = new FormData();
        formData.append("image", imageData);
        return this.http.post<any>(url, formData);
    }
}
