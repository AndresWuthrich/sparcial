import { Component, OnInit } from '@angular/core';

import { Materia } from 'src/app/clases/materia';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MateriaService } from 'src/app/services/materia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inscripcion-materia-alumno',
  templateUrl: './inscripcion-materia-alumno.component.html',
  styleUrls: ['./inscripcion-materia-alumno.component.css']
})
export class InscripcionMateriaAlumnoComponent implements OnInit {

  public listaMaterias: Materia[] = [];
  public listaAlumnos: Usuario[] = [];

  public usuarioLogueado: Usuario | null = null;

  constructor(private materiaService: MateriaService, private usuarioService: UsuarioService, public auth: AuthService) {
    this.materiaService.traerTodas().subscribe((materias: Materia[]) => {
      this.listaMaterias = materias;
    });

    // this.usuarioService.traerAlumnos().subscribe((usuarios: Usuario[]) => {
    //   console.log("alumn",usuarios);
    //   this.listaAlumnos = usuarios;
    // });

  }

  async ngOnInit() {
    var usuarioActual = await this.auth.obtenerUsuarioActual();

    console.log('ACTUAL' +usuarioActual?.email);

    if(usuarioActual?.email != null){
      var datosUsuario: any = await this.usuarioService.obtenerUsuarioPorEmail(usuarioActual?.email);
      console.log('DATO USER' + datosUsuario);
      this.usuarioLogueado = datosUsuario;
    }
  }

  inscripcionAlumno(materia: Materia){
    console.log("1", this.usuarioLogueado);
    if(this.usuarioLogueado != null){

      if(materia.alumnos?.includes(this.usuarioLogueado)){

      } else{
        materia.alumnos?.push(this.usuarioLogueado);
        console.log("2", materia);
      }
     
      this.materiaService.inscribirUsuario(materia, this.usuarioLogueado);
    }
  }
}
