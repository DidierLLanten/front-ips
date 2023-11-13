import { Nombre_rol } from './nombre_rol';

describe('Nombre_rol Class', () => {
  it('should create an instance', () => {
    const nombreRol = new Nombre_rol();
    expect(nombreRol).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const nombreRol = new Nombre_rol();
    
    expect(nombreRol.id).toBeUndefined();
    expect(nombreRol.rol).toBeUndefined();
  });

  it('should set properties with provided values', () => {
    const id = 1;
    const rol = 'Admin';

    const nombreRol = new Nombre_rol();
    nombreRol.id = id;
    nombreRol.rol = rol;

    expect(nombreRol.id).toEqual(id);
    expect(nombreRol.rol).toEqual(rol);
  });

});