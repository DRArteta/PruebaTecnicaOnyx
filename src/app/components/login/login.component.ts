import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService) { }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          // Si el inicio de sesión es exitoso, redirecciona a la página principal
          // (Por ahora, simplemente imprimimos un mensaje de éxito en la consola)
          console.log('Inicio de sesión exitoso.');
        } else {
          // Si el inicio de sesión falla, muestra un mensaje de error
          this.loginError = true;
        }
      }
    );
  }
}
