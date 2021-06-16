import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AltaMateriaComponent } from './alta-materia/alta-materia.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'altamateria', component: AltaMateriaComponent },
  { path: 'listadousuarios', component: ListadoUsuariosComponent },
  { path: '', redirectTo: 'admin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
