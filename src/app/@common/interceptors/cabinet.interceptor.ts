import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { CabinetService } from '../services/cabinet.service';

@Injectable()
export class CabinetInterceptor implements HttpInterceptor {
  constructor(private cabinetService: CabinetService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const cabinetRequest = request.clone({
      setHeaders: { 'x-cabinet': this.cabinetService.getCabinetId() },
    });

    return next.handle(cabinetRequest);
  }
}
