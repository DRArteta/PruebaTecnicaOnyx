import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  // Función para mostrar el snack-bar con un mensaje
  showSnackbar(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Cerrar', {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
