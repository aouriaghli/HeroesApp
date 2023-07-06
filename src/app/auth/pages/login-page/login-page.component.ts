import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  /**
   *
   */
  constructor( private authService: AuthService,
    private router: Router) {


  }

  onLogin():void{
    //es un servicio que devuelve un observable
    // por tanto hay que hacer subscribe para que funcione
    this.authService.login('ayb.job@gmail.com', '123456')
    .subscribe( user => {
      this.router.navigate(['/']);
    });
  }
}
