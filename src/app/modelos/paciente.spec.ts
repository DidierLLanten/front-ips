import { Paciente } from './paciente';
import { Eps } from './eps';
import { Persona } from './persona';

describe('Paciente Class', () => {
  it('should create an instance', () => {
    const paciente = new Paciente();
    expect(paciente).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const paciente = new Paciente();

    expect(paciente.id).toBeUndefined();
    expect(paciente.persona).toBeTruthy(); 
    expect(paciente.eps).toBeTruthy();
  });

  it('should set properties with provided values', () => {
    const id = 1;
    const persona = new Persona(); 
    const eps = new Eps(); 

    const paciente = new Paciente();
    paciente.id = id;
    paciente.persona = persona;
    paciente.eps = eps;

    expect(paciente.id).toEqual(id);
    expect(paciente.persona).toEqual(persona);
    expect(paciente.eps).toEqual(eps);
  });

});