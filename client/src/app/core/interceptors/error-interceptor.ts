import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route: Router, private toaster: ToastrService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(returnedError => {
        if (returnedError){
          if (returnedError.status === 400) {
            if (returnedError.error.errors){
              throw returnedError.error;
            } else {
              this.toaster.error(returnedError.error.message, returnedError.error.statusCode);
            }
          }

          if (returnedError.status === 401) {
            this.toaster.error(returnedError.error.message, returnedError.error.statusCode);
          }

          if (returnedError.status === 404) {
            this.route.navigateByUrl('/not-found');
          }

          if (returnedError.status === 500) {
            const navigationExtras: NavigationExtras = { state: {error: returnedError.error} };
            this.route.navigateByUrl('/server-error', navigationExtras);
          }

          return throwError(returnedError);
        }
      })
    );
  }
}
