import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const AuthGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

/*  if(!auth.isAuthenticated()) {
    router.navigateByUrl('/connexion2')
    return false
  }*/
  return true
}
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
