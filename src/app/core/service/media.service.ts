import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SortDirection} from "@angular/material/sort";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Media} from "../interface/media";

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient) {
  }

  allPageMedia(postId: number, page: number, limit: number, sort: string = '', order: SortDirection = ''): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/backlink_post_post/allMedia/?postId=${postId}&page=${page}&limit=${limit}&sort=${sort}&order=${order}`);
  }

  all(page: number, limit: number, sort: string = '', order: SortDirection = ''): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/backlink_post_post/all/?page=${page}&limit=${limit}&sort=${sort}&order=${order}`);
  }

  get(postId: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/backlink_post_post/get/id/${postId}`);
  }

  post(file: FormData) {
    return this.http.post<Media>(`${environment.apiUrl}/api/backlink_media_media/post/`, file, {withCredentials: true});
  }

  put(post: FormData) {
    return this.http.post<Media>(`${environment.apiUrl}/api/backlink_post_post/put/`, post, {withCredentials: true});
  }
}
