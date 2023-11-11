import { Estado_cita } from "./estado_cita";
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export class Cita{
    id: number;
    paciente: Paciente = new Paciente();
    medico: Medico = new Medico();
    fecha: Date = new Date();
    estadoCita: Estado_cita = new Estado_cita();
}