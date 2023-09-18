import { Eps } from "./eps";
import { Persona } from "./persona";

export class Paciente{
    idPaciente: number;
    persona: Persona = new Persona();
    eps?: Eps = new Eps();
}