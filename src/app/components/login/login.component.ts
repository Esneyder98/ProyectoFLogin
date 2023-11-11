import { Component } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { PerfilDataService } from 'src/app/services/perfil-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  nombre = '';
  photo = "";
  constructor(
    private authGoogleService: AuthGoogleService,
    private perfilDataService: PerfilDataService,
    private router:Router,
  ) {

  }


async login() {
  try {
    await this.authGoogleService.login();
  } catch (error) {
    console.error('Error en inicio de sesión:', error);
  }

  // Luego de iniciar sesión, verifica la autenticación y redirige si es necesario
  this.checkAuthentication();
}

checkAuthentication() {
  if (this.authGoogleService.isAuthenticated()) {
    this.router.navigate(['main']);
  } else {
    console.error('El usuario no está autenticado.');
  }
}

  showData() {
    if (this.authGoogleService.isAuthenticated()) {
    const profileData = this.authGoogleService.getProfile();
    console.log('Datos de perfil de Google:', profileData);

    if (profileData) {
      const data = JSON.stringify(profileData);
      console.log(data);
      const parseData = JSON.parse(data);
      console.log(parseData);

      if (parseData) {
        this.nombre = parseData.name;
        console.log('Nombre recibido en Login:', this.nombre);
        this.photo = parseData.picture;

        const perfil = {
          name: this.nombre,
          photo: this.photo
        };

        this.perfilDataService.agregarDatos(perfil);
      } else {
        console.error('parseData es null.');
      }
    } else {
      console.error('No se pudieron obtener datos de perfil.');
    }
  }  else {
    console.error('El usuario no está autenticado.');
  }
  }




  // showData() {
  //   const data = JSON.stringify(this.authGoogleService.getProfile());
  //   console.log(data);
  //   const parseData = JSON.parse(data);
  //   console.log(parseData);
  //   this.nombre = parseData.name;
  //   console.log('Nombre recibido en Login:', this.nombre);
  //   this.photo = parseData.picture;
  //   const perfil = {
  //     name : this.nombre,
  //     photo : this.photo
  //   }
  //   this.perfilDataService.agregarDatos(perfil);

  // }
}
