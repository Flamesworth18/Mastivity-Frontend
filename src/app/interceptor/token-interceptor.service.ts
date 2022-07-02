import { AuthService } from './../service/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, switchMap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.inject.get(AuthService);
    let authReq = req;
    authReq = this.AddTokenHeader(req, authService.token);
    return next.handle(authReq).pipe(
      catchError(errordata => {
        if(errordata === 401){
          authService.sessionExpired();
        }
        
        return throwError(errordata);
      })
    );

  }

  AddTokenHeader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('authorization', 'bearer ' + token) });
  }

}
