import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { BusyService } from '../services/busy.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class Loadinginterceptor implements HttpInterceptor{

    constructor(private busyService: BusyService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.busyService.busy();
        return next.handle(req).pipe(
            delay(500),
            finalize(() => this.busyService.idle())
        );
    }


}