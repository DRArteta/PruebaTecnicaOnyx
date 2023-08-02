import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'assets/data/books.json'; // Ruta del archivo JSON

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any>(this.usersUrl).pipe(
      map(users => {
        const foundUser = users.users.find((user: any) => user.username === username && user.password === password);
        if (foundUser) {
          // Usuario encontrado, inicia sesión
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
          return true;
        } else {
          // Usuario no encontrado, no puede iniciar sesión
          return false;
        }
      })
    );
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
