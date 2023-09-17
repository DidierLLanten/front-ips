import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario{
    idUsuario: number;
    persona: Persona = new Persona();
    rol: Rol = new Rol();
}