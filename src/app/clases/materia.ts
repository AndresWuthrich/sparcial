import { Usuario } from "./usuario";

export class Materia {
    descripcion: string = '';
    cuatrimestre: number = 0;
    cupoAlumnos: number = 0;
    anio: number = 0;
    profesor: Usuario | null = null;
    imagen: string = '';

    alumnos?: Usuario[] = [];
}
