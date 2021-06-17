import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MateriaService } from 'src/app/services/materia.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { Materia } from 'src/app/clases/materia';

export class ListadoAlumnosPorMateriasComponent implements OnInit {

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  public usuarioLogueado: Usuario | null = null;

  listadoMat: Materia[] = [];
  listadoAlumn: Usuario[] = [];
  
  materiaElejida: Materia | null = null;

  public usuario: any = null;


  constructor(public auth: AuthService, private usuarioService: UsuarioService, private materiaService: MateriaService) { }

  async ngOnInit() {
    // this._Iservice.traerTodos().subscribe((ins: InscripcionMateria[]) => {
    //   this.listadoIns = ins;
    // });

    var user = await this.auth.usuario;
    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
      console.log(dataUser);
      this.usuarioLogueado = dataUser;
    }
  }

  cargarMateriaSeleccionada(materia: Materia) {
    this.listadoAlumn = [];
    // console.log(materia);
    this.materiaElejida = materia;
    this.listarAlumnos();
  }

  listarAlumnos() {
    // console.log(this.listadoIns);
    // this.listadoIns.forEach(ins => {
    //   if (ins.materia.id == this.materiaElejida.id) {
    //     ins.listaAlumnos.forEach(alum => {
    //       this.listadoAlumn.push(alum);
    //     });
    //   }
    // });
  }
}