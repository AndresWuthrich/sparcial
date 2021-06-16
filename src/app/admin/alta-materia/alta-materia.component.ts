import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Materia } from 'src/app/clases/materia';
import { Usuario } from 'src/app/clases/usuario';
import { MateriaService } from 'src/app/services/materia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alta-materia',
  templateUrl: './alta-materia.component.html',
  styleUrls: ['./alta-materia.component.css']
})
export class AltaMateriaComponent implements OnInit {

  public materiaAlta: Materia = new Materia();
  public signup: boolean;
  public formMateria: FormGroup;
  private imagen: any;
  public listaProfesores: Usuario[] = [];

  public banderaProfesorSeleccionado = true;
  public listaProfesoresSeleccionados: Array<Usuario> = new Array<Usuario>();

  constructor(private fb: FormBuilder, private router: Router, private materiaService: MateriaService, private usuarioService: UsuarioService) {
    this.signup = false;

    this.formMateria = this.fb.group({
      'descripcion':['', Validators.required],
      'cuatrimestre':['', Validators.required],
      'cupoAlumnos':['', Validators.required],
      'anio':['', Validators.required],
      'profesor':['', Validators.required],
      'imagen':['', Validators.required]
    });

    this.usuarioService.traerProfesores().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.listaProfesores = usuarios;
    });

   }

  ngOnInit(): void {
  }

  async alta(){
    console.log(this.formMateria.getRawValue());

    // const { email, password } = this.formRegistro.value;
    
    this.signup = true;
    
    setTimeout(() => {
      this.signup = false;
    }, 3000);

    // this.auth.Registro(email, password).then(value => { 
    //   console.log(value?.user?.uid);

    this.materiaAlta.descripcion = this.formMateria.controls['descripcion'].value;
    this.materiaAlta.cuatrimestre = this.formMateria.controls['cuatrimestre'].value;
    this.materiaAlta.cupoAlumnos = this.formMateria.controls['cupoAlumnos'].value;
    this.materiaAlta.anio = this.formMateria.controls['anio'].value;
    this.materiaAlta.profesor = this.formMateria.controls['profesor'].value;
    this.materiaAlta.imagen = this.formMateria.controls['imagen'].value;

    console.log("alta", this.materiaAlta);
    this.materiaService.agregarMateria(this.imagen, this.materiaAlta);

    this.router.navigate(['home']);
  }

  cargarImagen(event: any): void {
    this.imagen = event.target.files[0];
    console.log(this.imagen);
  }

  agregarProfesor(usuario: Usuario){
    this.banderaProfesorSeleccionado = false;
    if(this.listaProfesoresSeleccionados.includes(usuario)){

    } else{
      this.listaProfesoresSeleccionados.push(usuario);
      this.formMateria.controls['profesor'].setValue(usuario.email);
    }
  }

  // agregarNuevoProfesor(){
  //   console.log();
  //   if(this.descripcionEspecialidad != ''){
  //     this.especialidadAlta.descripcion = this.descripcionEspecialidad;

  //     this.especialidadService.agregarEspecialidad(this.especialidadAlta);
  //   }
  // }
}
