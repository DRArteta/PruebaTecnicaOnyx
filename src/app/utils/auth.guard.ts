import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    // Verificar si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      console.log(this.authService.isAuthenticated());
      return true; // Permitir acceso a la ruta
    } else {
      // Redirigir al login y guardar la URL actual para redirigir al dashboard después del login
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }
}
