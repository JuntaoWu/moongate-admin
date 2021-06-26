import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange().subscribe(token => {
      if (token.isValid()) {
        this.accessToken = token.getValue();
      }
    });

  }

  private accessToken: String;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone(
      {
        headers: request.headers.set('Authorization', `Bearer ${this.accessToken}`),
        url: request.url.startsWith('http') ? request.url : `${environment.api}${request.url}`
      }
    );
    return next.handle(req);
  }
}
