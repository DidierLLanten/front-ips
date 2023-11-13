import { Rol } from './rol';
import { Nombre_rol } from './nombre_rol';

describe('Rol Class', () => {
  it('should create an instance', () => {
    const rol = new Rol();
    expect(rol).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const rol = new Rol();

    expect(rol.codigo).toBeUndefined();
    expect(rol.nombreRol).toBeTruthy();
  });

  it('should set properties with provided values', () => {
    const codigo = 1;
    const nombreRol = new Nombre_rol(); 

    const rol = new Rol();
    rol.codigo = codigo;
    rol.nombreRol = nombreRol;

    expect(rol.codigo).toEqual(codigo);
    expect(rol.nombreRol).toEqual(nombreRol);
  });

});