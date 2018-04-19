import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent, MqttClientComponent, StationsComponent, StationItemComponent } from './components/index';


const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'stations', component: StationsComponent},
    { path: 'mqtt', component: MqttClientComponent},
    // any other path redirects to dashboard
    { path: '**', redirectTo: '' }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
