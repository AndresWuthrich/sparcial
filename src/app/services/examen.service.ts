import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AuthService } from './auth.service';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Materia } from '../clases/materia';
import { Examen } from '../clases/examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private dbPath = '/examenes';
  private dbPathusu = '/usuarios';
  private dbPathmat = '/materias';

  // private downloadURL: Observable<string>;
  public itemsCollection: AngularFirestoreCollection<Examen>;
  public alumnosCollection: AngularFirestoreCollection<Usuario>;
  public materiasCollection: AngularFirestoreCollection<Materia>;

  public examenes: Observable<Examen[]>;
  public materias: Observable<Materia[]>;
  public alumnos: Observable<Usuario[]>;

  public usuarioLogueado: Usuario | null = null;
  public alumnosInscriptos: Usuario[] = [];

  constructor(private afs: AngularFirestore, public auth: AuthService) {

    this.itemsCollection = this.afs.collection(this.dbPath);
    this.examenes = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as Examen;
        return data;
      });
    }));

    this.materiasCollection = this.afs.collection(this.dbPathmat);
    this.materias = this.materiasCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as Materia;
        return data;
      });
    }));

    this.alumnosCollection = this.afs.collection(this.dbPathusu);
    this.alumnos = this.alumnosCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as unknown as Usuario;
        return data;
      });
    }));
   }

  agregarExamen(examen: Examen){

    return this.itemsCollection.add(JSON.parse(JSON.stringify(examen))).then(() => {
      Swal.fire({
        title: 'Alta exitosa'
      });
    }).catch((error) => {
      Swal.fire({
        title: error.code,
        text: error.message
      });
    });
  
  }

  // traerPacientes(){
  //   return this.usuarios.pipe(map(value => 
  //     { return value.filter(user => 
  //      { return user.perfil == "paciente"; });
  //   }));
  // }

  traerTodos(){
    return this.examenes;
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
}
