import { Flight } from '../Models/Flight';
export class FlightCrudDTO {
    public opStatus?: string;
    public hasError: boolean;
    public error: any;
    public data?: Flight[];
}
export class StandardFlightCrudDTO {
    public opStatus?: string;
    public hasError: boolean;
    public error: any;
    public data?: any;
}
