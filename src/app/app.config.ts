import { provideRouter } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { AutoRefreshTokenService, provideKeycloak, UserActivityService, withAutoRefreshToken } from 'keycloak-angular';

import { routes } from './app.routes';

export const provideKeycloakAngular = () =>
provideKeycloak({
    config: {
        realm: 'my-realm',
        url: 'http://localhost:8080',
        clientId: 'frontend-angular'
    },
    initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        redirectUri: window.location.origin + '/'
    },
    features: [
        withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
        })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
});

export const appConfig: ApplicationConfig = {
    providers: [provideKeycloakAngular(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};