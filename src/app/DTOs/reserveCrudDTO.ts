import { Reservation } from '../Models/reservation';
export default class ReserveCrudDTO {
    public opStatus?: string;
    public hasError: boolean;
    public error: any;
    public data?: any;
}

export class ReserveCrudDTOMyFlights {
    public opStatus?: string;
    public hasError: boolean;
    public error: any;
    public data?: Reservation[];
}
