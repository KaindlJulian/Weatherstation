import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  constructor() { }

  @Input() isDashboard: boolean;

  ngOnInit() {
  }

  callDialog() {
    // emit event
  }

}
