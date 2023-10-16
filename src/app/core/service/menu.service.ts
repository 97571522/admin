import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {
  }

  main() {
    return this.http.get(`${environment.apiUrl}/api/menu_menu_menu/get/?id=1`, {withCredentials: true})
  }
}
