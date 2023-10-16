import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {SortDirection} from "@angular/material/sort";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RobotsService {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  all(page: number, limit: number, sort: string = '', order: SortDirection = ''): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/backlink_post_post/all/?page=${page}&limit=${limit}&sort=${sort}&order=${order}`);
  }

  get(robotId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/backlink_post_post/get/?robotId=${robotId}`);
  }

  post(post: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/backlink_post_post/post/`, post, {withCredentials: true});
  }

  put(postData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/backlink_post_post/put/`, postData, {withCredentials: true});
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
