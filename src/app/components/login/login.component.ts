import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).then((authenticated) => {
      if (authenticated) {
        // Autenticación exitosa, redirigir a la página después de iniciar sesión
        // Ejemplo: this.router.navigate(['/dashboard']);
        this.router.navigate(['/user-dashboard']);
        console.log('Autenticación exitosa');
      } else {
        // Autenticación fallida, mostrar un mensaje de error o hacer otra acción
        console.log('Autenticación fallida');
      }
    }).catch((error) => {
      console.error('Error en la autenticación', error);
    });
  }
}
