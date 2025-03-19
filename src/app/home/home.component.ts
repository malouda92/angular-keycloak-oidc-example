import { Component, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userProfile: any;

  constructor(private readonly keycloak: Keycloak) {}

  async ngOnInit() {
    if (this.keycloak?.authenticated) {
      this.userProfile = await this.keycloak.loadUserProfile();
    } else {
      this.keycloak.login();
    }
  }

  logOut() {
    this.keycloak.logout();
  }
}
