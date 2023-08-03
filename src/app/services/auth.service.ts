import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL de la API REST

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get<any[]>(this.apiUrl).subscribe(
        (users) => {
          const authenticatedUser = users.find((user) => user.username === username && user.password === password);
          if (authenticatedUser) {
            // Usuario autenticado correctamente
            // Puedes guardar el usuario en el almacenamiento local o en una variable de servicio para usarlo en otras partes de la aplicación
            console.log('Autenticación exitosa');
            resolve(true);
          } else {
            // Autenticación fallida
            console.log('Autenticación fallida');
            resolve(false);
          }
        },
        (error) => {
          console.error('Error al cargar los usuarios', error);
          reject(error);
        }
      );
    });
  }

  logout() {
    // Cierra sesión eliminando el usuario del almacenamiento local
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    // Obtiene el usuario actual almacenado en el almacenamiento local
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
}
