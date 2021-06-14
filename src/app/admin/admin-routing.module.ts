import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AltaMateriaComponent } from './alta-materia/alta-materia.component';
import { ListadoMateriasComponent } from './listado-materias/listado-materias.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'altamateria', component: AltaMateriaComponent },
  { path: 'listadomaterias', component: ListadoMateriasComponent },
  { path: 'listadousuarios', component: AltaMateriaComponent },
  { path: '', redirectTo: 'admin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
