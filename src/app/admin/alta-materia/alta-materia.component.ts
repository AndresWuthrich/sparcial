import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-materia',
  templateUrl: './alta-materia.component.html',
  styleUrls: ['./alta-materia.component.css']
})
export class AltaMateriaComponent implements OnInit {

  public signup: boolean;
  public formMateria: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signup = false;

    this.formMateria = this.fb.group({
      'descripcion':['', Validators.required],
      'cuatrimestre':['', Validators.required],
      'cupoAlumnos':['', Validators.required],
      'anio':['', Validators.required],
      'profesor':['', Validators.required]
    })
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

      // this.usuarioAlta.nombre = this.formRegistro.controls['nombre'].value;
      // this.usuarioAlta.apellido = this.formRegistro.controls['apellido'].value;
      // this.usuarioAlta.edad = this.formRegistro.controls['edad'].value;
      // this.usuarioAlta.dni = this.formRegistro.controls['dni'].value;
      // this.usuarioAlta.perfil = this.perfil;
      // this.usuarioAlta.email = this.formRegistro.controls['email'].value;
      // this.usuarioAlta.password = this.formRegistro.controls['password'].value;
      // this.usuarioAlta.imagenPerfil = this.formRegistro.controls['imagen'].value;
      // this.usuarioAlta.uid = this.auth.usuario.uid;
      // this.usuarioAlta.uid = value?.user?.uid;
 
      // if(this.perfil=='paciente'){
      //   this.usuarioAlta.imagenPerfil2 = this.formRegistro.controls['imagen2'].value;
      //   this.usuarioAlta.obraSocial = this.formRegistro.controls['obraSocial'].value;
      //   this.usuarioAlta.cuentaAprobada = true;
        
      //   console.log(this.imagenPerfil);
      //   console.log(this.imagenPerfil2);
      //   this.usuarioService.agregarPaciente(this.imagenPerfil, this.imagenPerfil2, this.usuarioAlta);
        // this.email = this.password = '';
  
      // } else {
        // this.usuarioAlta.especialidad = this.formRegistro.controls['especialidad'].value;
        // this.usuarioAlta.especialidad = this.listaEspecialidadesSeleccionadas;

        // this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'Lunes', 8, 19));
        // this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'Martes', 8, 19));
        // this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'Miercoles', 8, 19));
        // this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'Jueves', 8, 19));
        // this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'Viernes', 8, 19));
        // this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'Sabado', 8, 14));

        // this.usuarioAlta.horarioAtencion = this.listaDiasSeleccionadas;

        // console.log(this.imagenPerfil);
        // this.usuarioService.agregarEspecialista(this.imagenPerfil, this.usuarioAlta);
        // this.email = this.password = '';
      // }
      // this.router.navigate(['verificacion-email']);
      this.router.navigate(['home']);
      // });
    // console.log(this.auth.usuario.uid);
  }

}
