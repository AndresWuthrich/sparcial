import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListadoMateriasComponent } from './listado-materias/listado-materias.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListadoMateriasComponent,
    ListadoUsuariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
