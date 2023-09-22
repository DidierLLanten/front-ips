import { Especialidad_medicos } from "./especialidades_medico";
import { Persona } from "./persona";

export class Medico{
    idMedico: number;
    persona: Persona = new Persona();
    especialidadMedico: Especialidad_medicos = new Especialidad_medicos();
    tarjetaProfesional: string;
}