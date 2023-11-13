import { Usuario } from './usuario';
import { Persona } from './persona';

describe('Usuario Class', () => {
  it('should create an instance', () => {
    const usuario = new Usuario();
    expect(usuario).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const usuario = new Usuario();
    
    expect(usuario.id).toBeUndefined();
    expect(usuario.cuentaBancaria).toBeUndefined();
    expect(usuario.persona instanceof Persona).toBeTruthy();
  });

  it('should set properties with provided values', () => {
    const id = 1;
    const cuentaBancaria = '123456789';
    const persona = new Persona();

    const usuario = new Usuario();
    usuario.id = id;
    usuario.cuentaBancaria = cuentaBancaria;
    usuario.persona = persona;

    expect(usuario.id).toEqual(id);
    expect(usuario.cuentaBancaria).toEqual(cuentaBancaria);
    expect(usuario.persona).toEqual(persona);
  });

});