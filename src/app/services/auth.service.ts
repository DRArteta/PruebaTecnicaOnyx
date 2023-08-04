import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticatedUser: any; // Variable para almacenar el usuario autenticado

  constructor(private http: HttpClient) {}

  // Función para realizar la autenticación
  // Función para realizar la autenticación
  login(username: string, password: string): Promise<boolean> {
    // Realizar la lógica de autenticación usando el API REST
    return this.http.get<any>(`http://localhost:3000/users?username=${username}&password=${password}`)
      .toPromise()
      .then((response) => {
        this.authenticatedUser = response[0];
        return true; // Autenticación exitosa
      })
      .catch((error) => {
        this.authenticatedUser = null;
        return false; // Autenticación fallida
      });
  }

  // Función para cerrar sesión
  logout() {
    this.authenticatedUser = null;
  }

  // Función para obtener el ID del usuario actual
  getCurrentUserId(): number {
    return this.authenticatedUser?.id;
  }

  getCurrentUser(): any {
    // Obtiene el usuario actual almacenado en el almacenamiento local
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  // Función para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authenticatedUser !== undefined;
  }
}
