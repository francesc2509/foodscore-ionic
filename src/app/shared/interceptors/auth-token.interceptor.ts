import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(
        private storage: Storage
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storage.get(environment['token-key'])).pipe(
            switchMap((token) => {
                if (token) { // Clone the request to add the new header.
                    const authReq = req.clone({
                        headers: req.headers.set('Authorization', `Bearer ${token}`)
                    });
                    // Pass on the cloned request instead of the original request.
                    return next.handle(authReq);
                }
                return next.handle(req);
            }),
            catchError((err) => {
                return next.handle(req);
            }),
        );
    }
}
