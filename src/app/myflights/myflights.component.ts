import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MyflightsDataSource } from './myflights-datasource';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session-service';
import { ReserveCrudDTOMyFlights } from '../DTOs/reserveCrudDTO';

@Component({
  selector: 'app-myflights',
  templateUrl: './myflights.component.html',
  styleUrls: ['./myflights.component.css'],
})
export class MyflightsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MyflightsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['flightNumber', 'username', 'seatNumber', 'Departure', 'Destination', 'Date', 'firstname', 'lastName'];

  constructor(private client: HttpClient, private session: SessionService) {

  }
  ngOnInit() {

    const readMyflightsURL = 'http://localhost:4000/api/reservation/read';

    const readMyFlights = {
      functionName: 'readReservationsByCustomer',
      args: {
        username: this.session.getSession('currentUsername')
      }
    };
    this.client.post(readMyflightsURL, readMyFlights, { responseType: 'json' })
      .subscribe((data: ReserveCrudDTOMyFlights) => {
        if (data.opStatus === 'success' && data.hasError === false) {
          alert(JSON.stringify(data.data));
          alert(JSON.stringify(data.data[0]));
          this.dataSource = new MyflightsDataSource(this.paginator, this.sort, data.data);

        } else {
          alert(`{
            status :${data.opStatus}
            error : ${data.error}
          }`);
        }
      });

  }
}
