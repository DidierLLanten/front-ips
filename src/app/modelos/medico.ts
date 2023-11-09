import { Especialidad_medicos } from "./especialidades_medico";
import { Persona } from "./persona";

export class Medico{
    id: number;
    persona: Persona = new Persona();
    especialidad: Especialidad_medicos = new Especialidad_medicos();
    tarjetaProfesional: string;
}