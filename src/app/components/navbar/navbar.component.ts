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
  photo: string="";
  name: string="";

  constructor(
    private authGoogleService: AuthGoogleService,
    private router: Router,
    private perfilDataService: PerfilDataService
  ) {}

  ngOnInit() {
    this.subscription = new Subscription();

    this.subscription.add(
      this.perfilDataService.getName().subscribe(name => {
        this.name = name;
        console.log("name",name);

      })
    );

    this.subscription.add(
      this.perfilDataService.getPhoto().subscribe(photo => {
        this.photo = photo;
        console.log("name",photo);
      })
    );
  }
  logOut(){
    this.authGoogleService.logout();
    this.router.navigate(['login']);
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
