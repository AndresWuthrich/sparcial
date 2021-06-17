import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  public userLogueado: Observable<any> = this.auth.fireStoreAuth.user;
  public usuarioLogueado: Usuario | null = null;

  constructor(private usuarioService: UsuarioService, public auth: AuthService){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("verif");

    var user = this.auth.usuario;
    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = this.usuarioService.obtenerUsuarioPorEmail(user.email);
      this.usuarioLogueado = dataUser;
      console.log("perfil",this.usuarioLogueado?.perfil);
      if(this.usuarioLogueado?.perfil == 'administrador'){
        return true;
      } else {
        return true;
      }
    } else {
      return false;
    }


    // return this.obtenerUsuario();
    // return false;
  }
  
  // async obtenerUsuario(): Promise<boolean> {

  //   var user = await this.auth.usuario;
  //   // var user = await this.auth.getCurrentUser();
  //   if (user?.email != null && user) {
  //     console.log(user.email);
  //     var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
  //     console.log(dataUser);
  //     this.usuarioLogueado = dataUser;
  //     if(this.usuarioLogueado?.perfil == 'administrador'){
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }  
  // }
}
