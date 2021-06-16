import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AuthService } from './auth.service';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Materia } from '../clases/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private filePath: any;
  private dbPath = '/materias';
  // private downloadURL: Observable<string>;
  public itemsCollection: AngularFirestoreCollection<Materia>;
  public materias: Observable<Materia[]>;
  img1: any;
  public usuarioLogueado: Usuario | null = null;
  public alumnosInscriptos: Usuario[] = [];

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, public auth: AuthService) {
    this.itemsCollection = this.afs.collection(this.dbPath);

    this.materias = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as Materia;
        return data;
      });
    }));

    // var usuarioActual = this.auth.obtenerUsuarioActual();

    // if(usuarioActual?.email != null){
    //   var datosUsuario: any = this.obtenerUsuarioPorEmail(usuarioActual?.email);
    //   console.log('DATO USER' + datosUsuario);
    //   this.usuarioLogueado = datosUsuario;
    // }
    // console.log('data' + this.usuarioLogueado?.horarioAtencion);

   }

  agregarMateria(imagen: any, materia: Materia){

    this.uploadImagen(imagen, materia);

    // return this.itemsCollection.add(JSON.parse(JSON.stringify(materia)));
  }

  uploadImagen(imagen: any, materia: Materia){
    this.filePath = `imagenes/${imagen.name}`;
    console.log(imagen.name);
    const fileRef = this.storage.ref(this.filePath);
    console.log(this.filePath);
    const task = this.storage.upload(this.filePath, imagen);
    console.log(imagen);
    task.snapshotChanges().pipe(finalize(()=>{
      fileRef.getDownloadURL().subscribe(urlImagen =>{
        console.log('URL_IMAGEN', urlImagen);

        materia.imagen = urlImagen;

        return this.itemsCollection.add(JSON.parse(JSON.stringify(materia)));
        })
    })).subscribe();
  }

  // async agregarImagenPerfil2(usuario: Usuario, imagen: any){
  //   usuario.imagenPerfil2 = imagen;
  //   console.log(imagen);
  //   var documentoUsuario = await this.obtenerDocumentoUsuario(usuario);
  //   console.log(documentoUsuario);
  //   if (documentoUsuario != null) {
  //       this.actualizarImagenPerfil2(usuario.imagenPerfil2, documentoUsuario);
  //   }
  // }

  // traerPacientes(){
  //   return this.usuarios.pipe(map(value => 
  //     { return value.filter(user => 
  //      { return user.perfil == "paciente"; });
  //   }));
  // }

  traerTodas(){
    return this.materias;
  }

  async obtenerDocumentoMateria(mat: Materia) {
    var value = await this.afs.collection(this.dbPath).ref.where('descripcion', '==', mat.descripcion).get();
    if (value.docs[0].exists) {
      return value.docs[0].id;
    }
    else {
      return null;
    }
  }

  // async actualizarImagenPerfil2(imagen: any, documento: any){
  //   var usuario = this.afs.collection(this.dbPath).doc(documento);
  //   console.log(imagen);

  //   return usuario.update({
  //     imagenPerfil2: imagen
  //   }).then(() => {
  //     Swal.fire({
  //       title: 'Agregado de imagen 2 exitoso'
  //     });
  //   }).catch((error) => {
  //     Swal.fire({
  //       title: error.code,
  //       text: error.message
  //     });
  //   });
  // }

  async inscribirUsuario(mat: Materia, alumno: Usuario){

    console.log("4");
    var documentoMateria = await this.obtenerDocumentoMateria(mat);

    this.actualizarAlumnosMateria(documentoMateria, mat);
  }

  async actualizarAlumnosMateria(doc: any, mat: Materia){

    var materia = this.afs.collection(this.dbPath).doc(doc);

    console.log("5");
    return materia.update({
      alumnos: mat.alumnos
    }).then(() => {
      Swal.fire({
        title: 'Inscripción exitosa'
      });
    }).catch((error) => {
      Swal.fire({
        title: error.code,
        text: error.message
      });
    });
  }

  // async actualizarDiasAtencion(documento: any, user: Usuario) {
  //     var usuario = this.afs.collection(this.dbPath).doc(documento);
  //     console.log(usuario);
  //     return usuario.update({
  //       horarioAtencion: user.horarioAtencion,
  //     })
  //       .then(() => {
  //         Swal.fire({
  //           title: 'Agregado de día de atención exitoso'
  //         });
  //       }).catch((error) => {
  //         Swal.fire({
  //           title: error.code,
  //           text: error.message
  //         });
  //       });
    
        //   console.log("Documento actualizado!");
        // })
        // .catch((error) => {
        //   console.error("Error en la actualizacion: ", error);
        // });
    // }
}
