import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FlightTableDataSource } from './flight-table-datasource';
import { HttpClient } from '@angular/common/http';
import { FlightCrudDTO } from '../DTOs/flightCrudDTO';
import { Flight } from '../Models/Flight';
import DataTransportService from '../services/dataTransportService';
import { Router } from '@angular/router';
import { SessionService } from '../session-service';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.css'],
})
export class FlightTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: FlightTableDataSource;
  loading: boolean;
  constructor(private client: HttpClient, private dataService: DataTransportService,
    private router: Router, private session: SessionService) {

  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['flightNumber', 'departure', 'destination', 'airplaneType', 'capacity', 'Date'];

  ngOnInit() {
    this.loading = true;

    const allFLightsUrl = 'http://localhost:4000/api/flight/read';
    const readAllFlightsPayload = {
      functionName: 'read',
      args: undefined
    };

    return this.client
      .post(allFLightsUrl, readAllFlightsPayload, { responseType: 'json' })
      .subscribe((data: any) => {
        alert(JSON.stringify(data.successStatus));
        const newData: FlightCrudDTO = JSON.parse(data.successStatus);
        if (newData.opStatus === 'success' && newData.hasError === false) {
          const tabledata = newData.data;
          this.dataSource = new FlightTableDataSource(this.paginator, this.sort, tabledata);
          this.loading = false;
        } else if (data.opStatus === 'error' && data.hasError === true) {
          alert(`{
            status :${data.opStatus}
            error : ${data.error}
          }`);
        }
      });
  }


  getFlight(row: Flight) {
    const key = 'toEditFlight';
    localStorage.setItem(key, JSON.stringify(row));
    localStorage.setItem(row.flightNumber, JSON.stringify(row.seats));
    const userType = this.session.getSession('currentTypeOfUser');
    if (userType === 'simple') {
      this.router.navigate(['/reserve']);

    } else {
      this.router.navigate(['/manageFlights']);
    }
  }
}
