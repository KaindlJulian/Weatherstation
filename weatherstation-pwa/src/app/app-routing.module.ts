import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent, MqttClientComponent } from './components/index';


const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'mqtt', component: MqttClientComponent},
    { path: '**', redirectTo: '/dashboard'}
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }