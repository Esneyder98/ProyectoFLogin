import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private initialized = false;

  constructor(private oauthService: OAuthService) {
    this.initLogin()
    .then(() => {
      this.isAuthenticatedSubject.next(this.isAuthenticated());
      this.initialized = true;
    })
    .catch(error => console.error('Error en la inicialización:', error));
  }

  private initLogin(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const config: AuthConfig = {
        issuer: 'https://accounts.google.com',
        strictDiscoveryDocumentValidation: false,
        clientId:
          '248487377490-k5pdvh4gnmroabauv67b9et7bpffsk0q.apps.googleusercontent.com',
        redirectUri: window.location.origin + '/main',
        scope: 'openid profile email',
      };
      this.oauthService.configure(config);
      this.oauthService.setupAutomaticSilentRefresh();

      this.oauthService
        .loadDiscoveryDocumentAndTryLogin()
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  // auth-google.service.ts

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
// Agrega un nuevo método para esperar a que la autenticación esté completa
async waitForAuthentication(): Promise<void> {
  return new Promise<void>(resolve => {
    const checkAuthentication = () => {
      if (this.isAuthenticated()) {
        resolve();
      } else {
        setTimeout(checkAuthentication, 100); // Verificar nuevamente después de 100 ms
      }
    };

    checkAuthentication();
  });
}

// Modifica el método login para esperar a que la autenticación esté completa
  login() {
    this.oauthService.initLoginFlow();
    return this.waitForAuthentication();
  }

  logout() {
    this.oauthService.logOut();
  }
  getProfile() {
    const identityClaims = this.oauthService.getIdentityClaims();

    if (identityClaims) {
      return identityClaims;
    } else {
      console.error('No se pudieron obtener las reclamaciones de identidad.');
      return null;
    }
  }

  // getProfile() {
  //   return this.oauthService.getIdentityClaims();
  // }
}
