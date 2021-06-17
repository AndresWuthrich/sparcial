import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaMateriaComponent } from './admin/alta-materia/alta-materia.component';
import { InscripcionMateriaComponent } from './pages/inscripcion-materia/inscripcion-materia.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthService } from './services/auth.service';
import { ListadoMateriasComponent } from './pages/listado-materias/listado-materias.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InscripcionMateriaAlumnoComponent } from './pages/inscripcion-materia-alumno/inscripcion-materia-alumno.component';
import { DetalleMateriaComponent } from './pages/detalle-materia/detalle-materia.component';
import { ResaltarMateriaDirective } from './directives/resaltar-materia.directive';
import { UpperPipe } from './pipes/upper.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    AltaMateriaComponent,
    InscripcionMateriaComponent,
    ListadoMateriasComponent,
    NavbarComponent,
    InscripcionMateriaAlumnoComponent,
    DetalleMateriaComponent,
    ResaltarMateriaDirective,
    UpperPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
