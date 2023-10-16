import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Website} from "../interface/website";
import {environment} from "../../../environments/environment";
import {SortDirection} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(
    private http: HttpClient
  ) {
  }

  all(page: number, limit: number, sort: string = '', order: SortDirection = ''): Observable<Website> {
    return this.http.get<Website>(`${environment.apiUrl}/api/backlink_website_website/all/?page=${page}&limit=${limit}&sort=${sort}&order=${order}`);
  }

  get(websiteId: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/backlink_website_website/get/websiteId/${websiteId}`);
  }

  post(website: FormData) {
    return this.http.post<Website>(`${environment.apiUrl}/api/backlink_website_website/post/`, website, {withCredentials: true});
  }

  put(websiteData: FormData) {
    return this.http.post<Website>(`${environment.apiUrl}/api/backlink_website_website/put/`, websiteData, {withCredentials: true});
  }

  allSelect(page: number, limit: number, sort: string = '', order: SortDirection = ''): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/backlink_website_website/allSelect/?page=${page}&limit=${limit}`, {withCredentials: true})
  }
}
