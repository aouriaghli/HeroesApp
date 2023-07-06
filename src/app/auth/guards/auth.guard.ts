import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

//CanMatch y CanActivated estan deprecated , deberian cambiarse por CanMatchFn y CanActivateFn
export class AuthGuard implements CanMatch, CanActivate {


  constructor(private authService: AuthService,
              private router: Router){}

  //En este caso canMatch y canActivate van a hacer lo mismo, asi que creo un metodo para ser llamado desde los dos
  private checkAuthStatus(): boolean | Observable<boolean>{
      return this.authService.checkAuthentication()
              .pipe(
                tap(isAuthenticated => console.log('Authenticated: ', isAuthenticated)),
                tap( isAuthenticated => {
                  if (!isAuthenticated) {
                    this.router.navigate(['./auth/login']);
                  }
                }),
              )

  }

  canMatch(route: Route, segments: UrlSegment[]): boolean  | Observable<boolean> {
    // console.log('Can Match')
    // console.log({route, segments})
    // return true;
    return this.checkAuthStatus();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean > {
    // console.log('Can Activate')
    // console.log({route, state})
    // return true;
    return this.checkAuthStatus();
  }

}
