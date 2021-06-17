import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { ListadoEliminadosComponent } from './listado-eliminados/listado-eliminados.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListadoUsuariosComponent,
    ListadoEliminadosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
