import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AltaExamenComponent } from './pages/alta-examen/alta-examen.component';
import { HomeComponent } from './pages/home/home.component';
import { InscripcionMateriaAlumnoComponent } from './pages/inscripcion-materia-alumno/inscripcion-materia-alumno.component';
import { InscripcionMateriaComponent } from './pages/inscripcion-materia/inscripcion-materia.component';
import { ListadoMateriasComponent } from './pages/listado-materias/listado-materias.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'inscripcionmateria', component: InscripcionMateriaComponent },
  { path: 'inscripcionmateriaalumno', component: InscripcionMateriaAlumnoComponent },
  { path: 'listadomaterias', component: ListadoMateriasComponent },
  { path: 'altaexamen', component: AltaExamenComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[AdminGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
