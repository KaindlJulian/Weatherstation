
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, FormBuilder } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import {
  DashboardComponent,
  MqttClientComponent,
  AppNavbarComponent,
  AppFooterComponent,
  StationDataComponent,
  TemperatureChartComponent,
  WeekChartComponent,
  StationsComponent,
  StationItemComponent,
  OptionsComponent} from './components/index';

import { MyMqttService } from './_services/my-mqtt.service';
import { SessionsStorageService } from './_services/sessions-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MqttClientComponent,
    AppNavbarComponent,
    AppFooterComponent,
    StationDataComponent,
    TemperatureChartComponent,
    WeekChartComponent,
    StationsComponent,
    StationItemComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MyMqttService, SessionsStorageService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
