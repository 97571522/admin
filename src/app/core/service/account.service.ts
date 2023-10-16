import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {
  }

  signin(signinData: FormData) {
    return this.http.post(`${environment.apiUrl}/api/signin/index/`, signinData, {withCredentials: true})
  }

  signout(signout: FormData) {
    return this.http.post(`${environment.apiUrl}/api/signout/index/`, signout, {withCredentials: true})
  }

  signup(signup: FormData) {
    return this.http.post(`${environment.apiUrl}/api/signup/index/`, signup, {withCredentials: true})
  }

  verify(verifyData: FormData) {
    return this.http.post(`https://accounts.enterprisealliance.net/api/verify/index/`, verifyData,{withCredentials: true})
  }
}
