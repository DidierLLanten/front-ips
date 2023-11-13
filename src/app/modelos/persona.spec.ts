import { Persona } from './persona';
import { Tipos_identificacion } from './tipo_identeficacion';
import { Rol } from './rol';

describe('Persona Class', () => {
  it('should create an instance', () => {
    const persona = new Persona();
    expect(persona).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const persona = new Persona();
    
    expect(persona.codigo).toBeUndefined();
    expect(persona.nombre).toBeUndefined();
    expect(persona.apellido).toBeUndefined();
    expect(persona.tipoIdentificacion).toBeTruthy(); 
    expect(persona.numeroDocumento).toBeUndefined();
    expect(persona.telefono).toBeUndefined();
    expect(persona.correo).toBeUndefined();
    expect(persona.rol).toBeTruthy(); 
  });

  it('should set properties with provided values', () => {
    const codigo = 1;
    const nombre = 'John';
    const apellido = 'Doe';
    const tipoIdentificacion = new Tipos_identificacion();
    const numeroDocumento = '123456789';
    const telefono = '987654321';
    const correo = 'john.doe@example.com';
    const rol = new Rol();

    const persona = new Persona();
    persona.codigo = codigo;
    persona.nombre = nombre;
    persona.apellido = apellido;
    persona.tipoIdentificacion = tipoIdentificacion;
    persona.numeroDocumento = numeroDocumento;
    persona.telefono = telefono;
    persona.correo = correo;
    persona.rol = rol;

    expect(persona.codigo).toEqual(codigo);
    expect(persona.nombre).toEqual(nombre);
    expect(persona.apellido).toEqual(apellido);
    expect(persona.tipoIdentificacion).toEqual(tipoIdentificacion);
    expect(persona.numeroDocumento).toEqual(numeroDocumento);
    expect(persona.telefono).toEqual(telefono);
    expect(persona.correo).toEqual(correo);
    expect(persona.rol).toEqual(rol);
  });
});