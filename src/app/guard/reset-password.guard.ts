import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = route.params['token'];
    return this.authService.onValideResetToken(token).pipe(
      map(response => {
        // @ts-ignore
        if (response === "Token valide") {
          return true;
        } else {
          this.router.navigate(['/not-found']);
          return false;
        }
      }),
      catchError(error => {
        this.router.navigate(['/not-found']);
        return of(false);
      })
    );
  }
}
