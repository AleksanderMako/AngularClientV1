import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight } from '../Models/Flight';
import { Seat } from '../Models/seat';
import ReserveCrudDTO from '../DTOs/reserveCrudDTO';

@Component({
    selector: 'app-reserve',
    templateUrl: './reserve.component.html',
    styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

    private reserveForm: FormGroup;
    private flightToEdit: Flight;
    public seats: Seat[];
    public seatsToReserve: Seat[] = [];
    constructor(private client: HttpClient, private fb: FormBuilder) { }

    public filterSeats(seats: Seat[]) {

        for (let i = 0; i < seats.length; i++) {

            if (seats[i].status === 'free') {

                this.seatsToReserve.push(seats[i]);

            }
        }
    }

    ngOnInit() {

        this.flightToEdit = JSON.parse(localStorage.getItem('toEditFlight'));
        this.seats = JSON.parse((localStorage.getItem(this.flightToEdit.flightNumber)));
        this.filterSeats(this.seats);
        alert(JSON.stringify(this.seatsToReserve));
        this.reserveForm = this.fb.group({

            flightNumber: [this.flightToEdit.flightNumber, Validators.required],
            username: ['enter username', Validators.required],
            selectedSeat: ['', Validators.required]
        });
    }

    onSubmit() {

        // flight number
        // seat number
        // username
        // seat_id
        const reserveUrl = 'http://localhost:4000/api/reservation/book';
        const reservePayload = {
            functionName: 'readOne',
            args: {
                flightNumber: this.flightToEdit.flightNumber,
                username: this.reserveForm.controls['username'].value,
                seatNumber: this.reserveForm.controls['selectedSeat'].value.SeatIDS,
                _id: this.reserveForm.controls['selectedSeat'].value._id
            }
        };
        return this.client
            .post(reserveUrl, reservePayload, { responseType: 'json' })
            .subscribe((data: ReserveCrudDTO) => {

                alert(JSON.stringify(data));
          //      const newData: ReserveCrudDTO = JSON.parse(data);
                if (data.opStatus === 'success' && data.hasError === false) {
                    alert('reservation completed successfully ') ;
                } else {
                    alert(`{
                      status :${data.opStatus}
                      error : ${data.error}
                    }`);
                }

            });
    }
}
