import { Eps } from "./eps";
import { Persona } from "./persona";

export class Paciente{
    id_paciente?: number;
    codigo_persona?: Persona = new Persona();
    eps?: Eps = new Eps();
}