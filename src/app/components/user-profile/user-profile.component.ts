import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  confirmPassword: string | undefined; // Nuevo campo para confirmar la contraseña

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const userId = this.authService.getCurrentUserId();
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
    console.log(userId);
  }

  updateUser() {
    if (this.user.password !== this.confirmPassword) {
      // La confirmación de contraseña no coincide, muestra un mensaje de error o realiza alguna acción
      return;
    }

    this.authService.updateUser(this.user).subscribe(
      (data) => {
        // Actualización exitosa, puedes mostrar un mensaje de éxito o redirigir a otra página
      },
      (error) => {
        // Manejo de errores, puedes mostrar un mensaje de error o realizar alguna acción
      }
    );
  }
}
