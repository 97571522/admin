import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SortDirection} from "@angular/material/sort";
import {Observable, of} from "rxjs";
import {Post} from "../interface/post";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {Media} from "../interface/media";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  all(page: number, limit: number, sort: string = '', order: SortDirection = ''): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/api/backlink_post_post/all/?page=${page}&limit=${limit}&sort=${sort}&order=${order}`);
  }

  get(postId: number): Observable<Post> {
    return this.http.get<any>(`${environment.apiUrl}/api/backlink_post_post/get/?postId=${postId}`);
  }

  post(post: FormData): Observable<Post> {
    return this.http.post<Post>(`${environment.apiUrl}/api/backlink_post_post/post/`, post, {withCredentials: true});
  }

  put(postData: FormData): Observable<Post> {
    return this.http.post<Post>(`${environment.apiUrl}/api/backlink_post_post/put/`, postData, {withCredentials: true});
  }

  postPageMedia(mediaData: FormData): Observable<Post> {
    return this.http.post<any>(`${environment.apiUrl}/api/backlink_post_post/postMedia/`, mediaData, {withCredentials: true});
  }

  putMedia(mediaData: FormData): Observable<Post> {
    return this.http.post<any>(`${environment.apiUrl}/api/backlink_post_post/putMedia/`, mediaData, {withCredentials: true});
  }

  deletePageMedia(mediaId: Media) {
    return this.http.delete<any>(`${environment.apiUrl}/api/backlink_post_post/deleteMedia/?mediaId=${mediaId}`, {withCredentials: true});
  }

  deleteMedia(mediaId: any) {
    return this.http.delete<any>(`${environment.apiUrl}/api/backlink_post_post/deleteMedia/?id=${mediaId}`, {withCredentials: true});
  }

  getClientById() {
    const id = this.activatedRoute.snapshot.paramMap.get("id")
    if (id) {
      //then we have to fetch details from backend
      return this.get(Number(id)).subscribe({
        next: (res: any) => {
          return res;
        }
      })
    } else {
      // return empty product observable.
      return of(this.get);
    }
  }
}
