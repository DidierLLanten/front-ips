import { Especialidad_medicos } from "./especialidades_medico";
import { Persona } from "./persona";

export class Medico{
    id_medico?: number;
    codigo_persona?: Persona = new Persona();
    especialidad?: Especialidad_medicos = new Especialidad_medicos();
    tarjeta_profesional?: string;
}