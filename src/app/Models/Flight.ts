
export interface Flight {
    _id?: string;
    flightNumber?: string;
    departure?: string;
    destination?: string;
    airplaneType?: string;
    capacity?: number;
    Date: Date;
    seats?: [];
}
