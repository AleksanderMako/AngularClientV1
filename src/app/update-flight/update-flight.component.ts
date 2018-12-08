import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import DataTransportService from '../services/dataTransportService';
import { Flight } from '../Models/Flight';
import { StandardFlightCrudDTO } from '../DTOs/flightCrudDTO';

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css']
})
export class UpdateFLightComponent implements OnInit {

  private toEditFlight: Flight;
  private manageFlight: FormGroup;
  public Delete_disable: any;
  public show: any;

  constructor(private fb: FormBuilder, private client: HttpClient, private dataTransportService: DataTransportService) { }

  ngOnInit() {
    const key = 'toEditFlight';
    this.show = 0;
    this.toEditFlight = JSON.parse(localStorage.getItem(key));
    alert('update comp says : ' + JSON.stringify(this.toEditFlight));
    // alert('update comp says : ' + this.toEditFlight.flightNumber);

    this.manageFlight = this.fb.group({
      departure: [this.toEditFlight.departure, Validators.required],
      destination: [this.toEditFlight.destination, Validators.required],
      airplaneType: [this.toEditFlight.airplaneType, Validators.required],
      capacity: [this.toEditFlight.capacity, Validators.required],
      date: [this.toEditFlight.Date, Validators.required]
    });
  }
  update() {
    alert('I just update ');
    this.Delete_disable = 1;
    this.show = 1;

  }
  disabled() {
    return this.Delete_disable;
  }
  showBtn() {
    return this.show;
  }


  onSubmit() {
    const updateFLightURL = 'http://localhost:4000/api/flight/update';
    const isFormValid = this.manageFlight.valid;
    const updatePayload = {
      functionName: 'update',
      args: {
        flightNumber: this.toEditFlight.flightNumber,
        departure: this.manageFlight.controls['departure'].value,
        destination: this.manageFlight.controls['destination'].value,
        airplaneType: this.manageFlight.controls['airplaneType'].value,
        capacity: this.manageFlight.controls['capacity'].value
      }
    };
    if (!isFormValid) {
      alert('Please enter valid data ');
    } else {
      this.client
        .post(updateFLightURL, updatePayload, { responseType: 'json' })
        .subscribe((data: StandardFlightCrudDTO) => {
          if (data.opStatus === 'success' && data.hasError === false) {
            alert(JSON.stringify(data.data));
          } else {
            alert(`{
              status :${data.opStatus}
              error : ${data.error}
            }`);
          }
        });
    }

  }

  delete() {
    const deleteUrl = 'http://localhost:4000/api/flight/delete';
    const deletePayload = {
      functionName: 'delete',
      args: {
        flightNumber: this.toEditFlight.flightNumber
      }
    };
    return this.client
      .post(deleteUrl, deletePayload, { responseType: 'json' })
      .subscribe((data: StandardFlightCrudDTO) => {
        if (data.opStatus === 'success' && data.hasError === false) {
          alert(JSON.stringify(data.data));
        } else {
          alert(`{
            status :${data.opStatus}
            error : ${data.error}
          }`);
        }
      });
  }

}
