import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';

import {
  DashboardComponent,
  MqttClientComponent,
  AppNavbarComponent,
  AppFooterComponent,
  StationDataComponent,
  TemperatureChartComponent,
  WeekChartComponent} from './components/index';

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
    WeekChartComponent
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
