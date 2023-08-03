import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component'; // Importa el componente de login a los declarativos

const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta de inicio, redirige al componente LoginComponent
  { path: 'user-dashboard', component: UserDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
