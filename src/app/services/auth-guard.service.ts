import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { first, map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuthenticated = this.userService.getIsAuthenticated();
    if(!isAuthenticated){
      this.router.navigate(['/home']);
    }
    return isAuthenticated;
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return this.userService.isLoggedIn().pipe(
  //     tap(isLoggedIn => {
  //       if (!isLoggedIn) {
  //         this.router.navigate(['/login']);
  //       }
  //     })
  //   );
  // }
}
