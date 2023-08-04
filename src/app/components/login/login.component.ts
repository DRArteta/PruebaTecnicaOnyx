import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private snackbarService: SnackbarService) {}

  onLogin() {
    this.authService.login(this.username, this.password).then((authenticated) => {
      if (authenticated) {
        // Autenticación exitosa, redirigir al dashboard o a la URL almacenada en los parámetros de consulta (query parameters)
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user-dashboard';
        this.router.navigateByUrl(returnUrl);
        this.snackbarService.showSnackbar('Inicio de sesión exitoso');
      } else {
        // Autenticación fallida, mostrar un mensaje de error
        this.snackbarService.showSnackbar('Usuario o contraseña incorrectos');
      }
    }).catch((error) => {
      this.snackbarService.showSnackbar('Error en la autenticación', error);
    });
  }
}
