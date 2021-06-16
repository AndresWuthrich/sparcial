import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from 'src/app/clases/materia';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MateriaService } from 'src/app/services/materia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styleUrls: ['./listado-materias.component.css']
})
export class ListadoMateriasComponent implements OnInit {

  public listaMaterias: Materia[] = [];
  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  public usuarioLogueado: Usuario | null = null;


  constructor(private materiaService: MateriaService, private usuarioService: UsuarioService, public auth: AuthService) {
    this.materiaService.traerTodas().subscribe((materias: Materia[]) => {
      this.listaMaterias = materias;
    });

    this.materiaService.traerTodas().subscribe((materias: Materia[]) => {
      this.listaMaterias = materias;
    });
  }

  ngOnInit(): void {
  }

}
