import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaOnyx';
  constructor(public authService: AuthService, private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/user-dashboard']);
  }

  goToAddBookForm() {
    this.router.navigate(['/book-form']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  userProfile(){
    this.router.navigate(['/user-profile']);

  }
}
