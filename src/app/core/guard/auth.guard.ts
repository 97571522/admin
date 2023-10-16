import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from "../service/account.service";
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private ticket: string | undefined;
  private verifyData: FormData = new FormData();
  private ticketData: FormData = new FormData();

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private accountService: AccountService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 检查用户是否已经通过SSO登录并具有相应权限
    if (this.authService.isLoggedIn() && this.authService.hasPermission()) {
      return true;
    }
    //let redirect = <string>encodeURIComponent(window.location.href);
    //window.location.replace("http://localhost:4200/signin/?redirect=" + redirect);
    //this.verifyData.append('redirect', redirect);
    //this.accountService.verify(this.verifyData).subscribe({
    //  next: (result: any) => {
    //    window.location.replace("https://accounts.enterprisealliance.com/signin/?redirect=" + result.data.redirect);
    //  }
    //})
    // 用户未登录或无权限，重定向到登录页或无权限页面
    //this.router.navigate(['/login']);
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
