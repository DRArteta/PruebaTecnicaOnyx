import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookFormComponent } from './components/book-form/book-form.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component'; // Importa el componente de login a los declarativos
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'book-form', component: BookFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
