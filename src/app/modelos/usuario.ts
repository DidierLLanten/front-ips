import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario{
    id_usuario?: number;
    codigo_persona?: Persona = new Persona();
    rol?: Rol = new Rol();
}