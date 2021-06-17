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

    // this.materiaService.traerTodas().subscribe((materias: Materia[]) => {
    //   this.listaMaterias = materias;
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

    this.materiaService.traerTodas().subscribe((materias: Materia[]) => {
      console.log("1",this.usuarioLogueado?.perfil);

      if(this.usuarioLogueado?.perfil == 'profesor'){
        materias.forEach(materia => {
          console.log("2",this.usuarioLogueado?.uid);
          console.log("3",materia.profesor?.uid);
          if(this.usuarioLogueado != null && materia.profesor != null ){
            if(materia.profesor.uid != undefined && materia.profesor.uid === this.usuarioLogueado.uid){
            // if(materia.profesor.uid != undefined && materia.profesor.uid === this.usuarioLogueado.uid){
                // this.listaMaterias = materias;
                this.listaMaterias.push(materia);
          }}
        })
      }

      if(this.usuarioLogueado?.perfil == 'alumno'){
        materias.forEach(materia => {
          console.log("2",this.usuarioLogueado?.uid);
          
          materia.alumnos?.forEach(alumno => {
            console.log("3",alumno.uid);
            if(this.usuarioLogueado != null && alumno.uid != null ){
              if(alumno.uid != undefined && alumno.uid === this.usuarioLogueado.uid){
              // if(materia.profesor.uid != undefined && materia.profesor.uid === this.usuarioLogueado.uid){
                  // this.listaMaterias = materias;
                  this.listaMaterias.push(materia);
            }}
  
          })
        })
      }

      });


  }
}
