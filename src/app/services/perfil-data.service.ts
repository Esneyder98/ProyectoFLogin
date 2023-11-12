import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilDataService {
  name: string;
  photo: string;
  private name$ = new Subject<any>();
  private photo$ = new Subject<any>();

  constructor(){
    this.name = "";
    this.photo = "";
  }
  agregarDatos(perfil: any) {
    if (perfil && perfil.name && perfil.photo) {
      this.name = perfil.name;
      this.photo = perfil.photo;
      this.name$.next(this.name);
      this.photo$.next(this.photo);
    } else {
      console.error('Datos incorrectos:', perfil);
    }
  }


  getName(): Observable<string> {
    return this.name$.asObservable();
  }

  getPhoto(): Observable<string> {
    return this.photo$.asObservable();
  }
}
