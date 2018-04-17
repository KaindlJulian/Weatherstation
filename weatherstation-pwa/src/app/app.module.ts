
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
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
  StationItemComponent} from './components/index';

import { MyMqttService } from './_services/my-mqtt.service';

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
    StationItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MyMqttService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
