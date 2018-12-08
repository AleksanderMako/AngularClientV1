import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {
  MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatToolbarModule, MatSidenavModule,
  MatIconModule, MatListModule, MatDatepickerModule, MatNativeDateModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatSpinner
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/authenticationInterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { SessionService } from './session-service';
import { UsersTableComponent } from './users-table/users-table.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import DataTransportService from './services/dataTransportService';
import { FlightTableComponent } from './flight-table/flight-table.component';
import { UpdateFLightComponent } from './update-flight/update-flight.component';
import { ReserveComponent } from './reserve/reserve.component';
import { MyflightsComponent } from './myflights/myflights.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    NavigationComponent,
    LoginComponent,
    CreateFlightComponent,
    UsersTableComponent,
    UpdateUserComponent,
    FlightTableComponent,
    UpdateFLightComponent,
    ReserveComponent,
    MatSpinner,
    MyflightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      { path: 'register', component: LoginUserComponent },
      { path: 'login', component: LoginComponent },
      { path: 'createFlight', component: CreateFlightComponent },
      { path: 'usersTable', component: UsersTableComponent },
      { path: 'UpdateUser', component: UpdateUserComponent },
      { path: 'flights', component: FlightTableComponent },
      { path: 'manageFlights', component: UpdateFLightComponent },
      { path: 'reserve', component: ReserveComponent },
      { path: 'myFlights', component: MyflightsComponent },






    ]),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, SessionService, DataTransportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
