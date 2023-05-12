import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComparisonProductService } from '../services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComparisonProductInterceptor implements HttpInterceptor {
  constructor(private comparisonProductService: ComparisonProductService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.comparisonProductService.validateComparisonList();
    return next.handle(req);
  }
}
