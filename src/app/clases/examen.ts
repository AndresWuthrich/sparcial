import { Materia } from "./materia";
import { Usuario } from "./usuario";

export class Examen {
    profesor: Usuario | null = null;
    materia: Materia | null = null;
    fechaExamen: Date | null = null;
    nota: number = 0;
    alumno: Usuario | null = null;
}
