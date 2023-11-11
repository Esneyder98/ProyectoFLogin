// main.component.ts
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { PerfilDataService } from 'src/app/services/perfil-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  name: string;
  photo: string;

  constructor(
    private authGoogleService: AuthGoogleService,
    private router: Router,
    private perfilDataService: PerfilDataService
  ) {
    this.name = '';
    this.photo = '';
    this.subscription = this.perfilDataService.getName()
      .subscribe(name => {
        console.log('Nombre recibido en Main:', name);
        this.name = name;
      });
      this.subscription = this.perfilDataService.getPhoto()
      .subscribe(photo => {
        console.log('Nombre recibido en Main:', photo)
        this.photo = photo;
      });
  }

async ngOnInit() {
  try {
    // Espera a que la inicialización esté completa
    await this.waitForInitialization();

    // Verificar si el usuario está autenticado antes de mostrar datos
    if (this.authGoogleService.isAuthenticated()) {
      await this.showData();
    } else {
      // Si no está autenticado, redirigir al componente de inicio de sesión
      this.router.navigate(['login']);
    }
  } catch (error) {
    console.error('Error en ngOnInit:', error);
  }
}

private async waitForInitialization(): Promise<void> {
  return new Promise<void>(resolve => {
    const checkInitialization = () => {
      if (this.authGoogleService.isInitialized()) {
        resolve();
      } else {
        setTimeout(checkInitialization, 100); // Verificar nuevamente después de 100 ms
      }
    };

    checkInitialization();
  });
}


  async showData() {
    try {
      const profileData = this.authGoogleService.getProfile();

      if (profileData) {
        const data = JSON.stringify(profileData);
        console.log('Datos de perfil de Google:', profileData);
        console.log(data);

        const parseData = JSON.parse(data);

        if (parseData) {
          this.name = parseData.name;
          console.log('Nombre recibido en Login:', this.name);
          this.photo = parseData.picture;

          const perfil = {
            name: this.name,
            photo: this.photo
          };

          this.perfilDataService.agregarDatos(perfil);
        } else {
          console.error('parseData es null.');
        }
      } else {
        console.error('No se pudieron obtener datos de perfil.');
      }
    } catch (error) {
      console.error('Error al obtener datos de perfil:', error);
    }
  }

  logOut(){
    this.authGoogleService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
