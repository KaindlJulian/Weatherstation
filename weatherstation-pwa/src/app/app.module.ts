import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MyMqttService } from './_services/my-mqtt.service';

import { DashboardComponent, MqttClientComponent } from './components/index';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MqttClientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [MyMqttService],
  bootstrap: [AppComponent]
})
export class AppModule { }
