import * as moment from 'moment';
import { Injectable } from '@angular/core';
@Injectable()
export class SessionService {
    constructor() {

    }
    public setSession(userId: string, token: string) {
        localStorage.setItem(userId, token);
    }
    public getSession(userId: string) {
        return localStorage.getItem(userId);
    }
    public logout(userId: string) {
        localStorage.removeItem(userId);
    }

}
