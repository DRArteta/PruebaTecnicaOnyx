import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo HttpClient
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importar BrowserAnimationsModule
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; // Agrega esta línea
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; // Importa el componente de login
import { AuthService } from './services/auth.service'; // Importa el servicio de autenticación
import { FormsModule } from '@angular/forms';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './components/dialogs/info/info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDashboardComponent,
    BookFormComponent,
    InfoComponent,
    DeleteDialogComponent // Agrega el componente de login a los declarativos
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Agrega el módulo HttpClient a los importados
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatOptionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [AuthService], // Agrega el servicio de autenticación a los proveedores
  bootstrap: [AppComponent]
})
export class AppModule { }
