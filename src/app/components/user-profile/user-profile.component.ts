import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userForm!: FormGroup;
  user: any; // Supongamos que aquí tienes los datos del usuario después de iniciar sesión

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private snackBar: SnackbarService) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit() {
    // Inicializar el formulario con los datos del usuario
    this.userForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      // Agrega otros controles del formulario según los campos del usuario
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      // Obtener los datos actualizados del formulario
      console.log(this.userForm.value);
      const updatedUserData = {name: this.userForm.value.name, username: this.userForm.value.username, password: this.userForm.value.password, id: this.authService.getCurrentUserId()};
      // Llamar al servicio para actualizar los datos del usuario
      this.authService.updateUser(updatedUserData).subscribe(
        (data) => {
          this.snackBar.showSnackbar('Usuario actualizado correctamente');
        },
        (error) => {
          this.snackBar.showSnackbar('Error al actualizar el usuario', error);
        }
      );
    } else {
      // El formulario es inválido, muestra mensajes de error o realiza alguna acción
    }
  }
}
