import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-listado-eliminados',
  templateUrl: './listado-eliminados.component.html',
  styleUrls: ['./listado-eliminados.component.css']
})
export class ListadoEliminadosComponent implements OnInit {

  listaUsuarios!: Usuario[];
  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.traerTodos().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

}