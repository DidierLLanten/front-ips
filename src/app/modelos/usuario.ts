import { Persona } from "./persona";

export class Usuario{
    id: number;
    cuentaBancaria: string;
    persona: Persona = new Persona();
}