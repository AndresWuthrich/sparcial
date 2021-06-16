import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/clases/materia';
import { Usuario } from 'src/app/clases/usuario';
import { MateriaService } from 'src/app/services/materia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inscripcion-materia',
  templateUrl: './inscripcion-materia.component.html',
  styleUrls: ['./inscripcion-materia.component.css']
})
export class InscripcionMateriaComponent implements OnInit {

  public listaMaterias: Materia[] = [];
  public listaAlumnos: Usuario[] = [];

  constructor(private materiaService: MateriaService, private usuarioService: UsuarioService) {
    this.materiaService.traerTodas().subscribe((materias: Materia[]) => {
      this.listaMaterias = materias;
    });

    this.usuarioService.traerAlumnos().subscribe((usuarios: Usuario[]) => {
      console.log("alumn",usuarios);
      this.listaAlumnos = usuarios;
    });

  }

  ngOnInit(): void {
  }

}
