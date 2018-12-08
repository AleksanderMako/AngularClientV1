import { Injectable, Output, EventEmitter } from '@angular/core';
import { UsersTableItem } from '../Models/dataTableUser';
import { Flight } from '../Models/Flight';

@Injectable()
export default class DataTransportService {

    toEdit: UsersTableItem;

    getItem(key: string, objType: number) {
        this.toEdit = JSON.parse(localStorage.getItem(key));
        return this.toEdit;
    }

    setToEdit(key: string, user: UsersTableItem) {
        localStorage.setItem(key, JSON.stringify(user));
    }
}
