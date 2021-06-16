import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  public listaUsuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.traerTodos().subscribe((usuarios: Usuario[]) => {
      this.listaUsuarios = usuarios;
    });
   }

  ngOnInit(): void {
  }
}
