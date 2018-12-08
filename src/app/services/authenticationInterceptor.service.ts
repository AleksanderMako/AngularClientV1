import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public currentUID: string;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // get jwt token

        const token = localStorage.getItem('currentuser');

        if (token) {
            const clonedHeader = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });
            return next.handle(clonedHeader)
                .do((event: HttpEvent<any>) => { }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {

                        if (err.status === 401) {
                            alert('access denied ');
                        }
                    }
                });
        } else {
            return next.handle(req)
                .do((event: HttpEvent<any>) => { }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            alert('access denied ');
                        }
                    }
                });
        }

    }
}
