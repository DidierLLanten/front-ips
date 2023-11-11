import { Cita } from "./cita";
import { Estado_cita } from "./estado_cita";

export class HistorialCita{
    id: number;
    cita: Cita;
    fechaModificacion: string;
    horaModificacion: string;
    estadoAnterior: Estado_cita;
    estadoActual: Estado_cita;
    cambio: string;
}