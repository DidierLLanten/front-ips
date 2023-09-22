import { Estado_cita } from "./estado_cita";
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export class Cita{
    codigo?: number;
    id_paciente?: Paciente = new Paciente();
    id_medico?: Medico = new Medico();
    fecha?: Date;
    id_estado_cita?: Estado_cita = new Estado_cita();
}