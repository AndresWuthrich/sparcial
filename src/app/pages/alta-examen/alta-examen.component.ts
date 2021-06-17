import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Examen } from 'src/app/clases/examen';
import { Materia } from 'src/app/clases/materia';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ExamenService } from 'src/app/services/examen.service';
import { MateriaService } from 'src/app/services/materia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alta-examen',
  templateUrl: './alta-examen.component.html',
  styleUrls: ['./alta-examen.component.css']
})
export class AltaExamenComponent implements OnInit {

  public examenAlta: Examen = new Examen();
  public signup: boolean;
  public formExamen: FormGroup;

  public listaAlumnos: Usuario[] = [];
  public listaMaterias: Materia[] = [];

  public banderaAlumnoSeleccionado = true;
  public listaAlumnosSeleccionados: Array<Usuario> = new Array<Usuario>();

  public banderaMateriaSeleccionada = true;
  public listaMateriasSeleccionadas: Array<Materia> = new Array<Materia>();

  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  public usuarioLogueado: Usuario | null = null;

  constructor(private fb: FormBuilder, private router: Router, private materiaService: MateriaService, private examenService: ExamenService, private usuarioService: UsuarioService, public auth: AuthService) {
    this.signup = false;

    this.formExamen = this.fb.group({
      'materia':['', Validators.required],
      'fechaExamen':['', Validators.required],
      'alumno':['', Validators.required],
      // 'profesor':['', Validators.required],
      'nota':['', [Validators.required, Validators.min(1), Validators.max(10)]]
    });

    this.usuarioService.traerAlumnos().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.listaAlumnos = usuarios;
    });
  }

  async ngOnInit() {

    var user = await this.auth.usuario;
    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
      console.log(dataUser);
      this.usuarioLogueado = dataUser;
    }

    this.materiaService.traerTodas().subscribe((materias: Materia[]) => {
      console.log(materias);
      console.log(this.usuarioLogueado?.uid);
      console.log(user.email);

      materias.forEach(materia => {
        console.log(materia.profesor?.uid);
        if(materia.profesor?.email == user?.email){
          this.listaMaterias.push(materia);

        }
      })
    });

  }

  async alta(){
    console.log(this.formExamen.getRawValue());

    // const { email, password } = this.formRegistro.value;
    
    this.signup = true;
    
    setTimeout(() => {
      this.signup = false;
    }, 3000);

    // this.auth.Registro(email, password).then(value => { 
    //   console.log(value?.user?.uid);

    this.examenAlta.materia = this.formExamen.controls['materia'].value;
    this.examenAlta.profesor = this.usuarioLogueado;
    this.examenAlta.alumno = this.formExamen.controls['alumno'].value;
    this.examenAlta.fechaExamen = this.formExamen.controls['fechaExamen'].value;
    this.examenAlta.nota = this.formExamen.controls['nota'].value;

    console.log("alta", this.examenAlta);
    this.examenService.agregarExamen(this.examenAlta);

    // this.router.navigate(['home']);
  }

  agregarAlumno(usuario: Usuario){
    this.banderaAlumnoSeleccionado = false;
    if(this.listaAlumnosSeleccionados.includes(usuario)){

    } else{
      this.listaAlumnosSeleccionados.push(usuario);
      this.formExamen.controls['alumno'].setValue(usuario);
    }
  }

  agregarMateria(materia: Materia){
    this.banderaMateriaSeleccionada = false;
    if(this.listaMateriasSeleccionadas.includes(materia)){

    } else{
      this.listaMateriasSeleccionadas.push(materia);
      this.formExamen.controls['materia'].setValue(materia);
    }
  }
}
