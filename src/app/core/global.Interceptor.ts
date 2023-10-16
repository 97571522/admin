import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const eaTokenId = localStorage.getItem('EA_TOKEN_ID');
    if (req.url.includes('/auth/signin') || req.url.includes('/auth/signup')) {
      return next.handle(req);
    } else {
      const authReq = req.clone({
        headers: req.headers.set('Ea-Token-Id', `${eaTokenId}`)
      });
      return next.handle(authReq);
    }
  }
}
