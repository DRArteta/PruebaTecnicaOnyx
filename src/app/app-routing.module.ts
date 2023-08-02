import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Agrega aquí las rutas para otros componentes si los tienes
  // ...
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login si no hay ninguna ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
