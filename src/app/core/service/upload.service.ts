import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  // @ts-ignore
  uploadMedia(meidaData) {
    return this.http.post(`${environment.apiUrl}/api/media_media/post/`, meidaData, {
      withCredentials: true,
      observe: 'events',
      reportProgress: true,
    })
  }
}
