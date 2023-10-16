import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ticket: string | null | undefined;
  private authToken: string | null = null; // 认证信息
  private accountStatus:boolean = false; // 登录状态
  private ticketData: FormData = new FormData();

  constructor(private http: HttpClient) { }

  // 检查用户是否已经登录
  isLoggedIn():boolean{
    this.ticket = localStorage.getItem('ticket');
    if (this.ticket) {
      this.ticketData.append('ticket',this.ticket);
      this.http.post<any>(`${environment.apiUrl}/api/verify/index/`,this.ticketData,{withCredentials:true});
    }
    return this.accountStatus = true;
  }

  // 验证用户是否具有相应权限
  hasPermission(): boolean {
    // 根据实际需求，进行权限验证的逻辑，例如判断用户的角色或权限列表中是否包含所需权限
    // 返回true表示有权限，返回false表示无权限
    return true;
  }

  // 获取认证信息
  getAuthToken(): string | null {
    return this.authToken;
  }
}
