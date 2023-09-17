import { Tipos_identificacion } from "./tipo_identeficacion";

export class Persona{
    codigo?:number;
    nombre?: string;
    apellido?: string;
    tipo_identificacion?: Tipos_identificacion = new Tipos_identificacion();
    numero_documento?: string;
    telefono?: string;
    correo?: string
}