import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { PerfilDataService } from 'src/app/services/perfil-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  subscription!: Subscription;
  name: string;
  photo: string;
  photoDefault: string = '../../../assets/img/profile_default.png'
  constructor(
    private authGoogleService: AuthGoogleService,
    private router: Router,
    private perfilDataService: PerfilDataService
  ) {
    this.name = '';
    this.photo = '';
    this.subscription = this.perfilDataService.getName()
      .subscribe(name => {
        this.name = name;
      });
      this.subscription = this.perfilDataService.getPhoto()
      .subscribe(photo => {
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
        const parseData = JSON.parse(data);

        if (parseData) {
          this.name = parseData.name;
           // Verificar si la foto es válida y asignar un valor predeterminado si no lo es
          this.photo = parseData.picture || this.photoDefault;

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
