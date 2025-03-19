import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloak: Keycloak) {}

  getRole() {
    return this.keycloak.resourceAccess;
  }

  getUserProfile() {
    return this.keycloak.loadUserProfile();
  }

  getToken() {
    return this.keycloak.token;
  }

  logout() {
    this.keycloak.logout();
  }
}
