import { Tipos_identificacion } from "./tipo_identeficacion";
import { Rol } from "./rol";

export class Persona{
    codigo:number;
    nombre: string;
    apellido: string;
    tipoIdentificacion: Tipos_identificacion = new Tipos_identificacion();
    numeroDocumento: string;
    telefono: string;
    correo: string
    rol: Rol = new Rol();
}