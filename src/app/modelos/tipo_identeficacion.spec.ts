import { Tipos_identificacion } from './tipo_identeficacion';

describe('Tipos_identificacion Class', () => {
  it('should create an instance', () => {
    const tipoIdentificacion = new Tipos_identificacion();
    expect(tipoIdentificacion).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const tipoIdentificacion = new Tipos_identificacion();

    expect(tipoIdentificacion.codigo).toBeUndefined();
    expect(tipoIdentificacion.tipo).toBeUndefined();
  });

  it('should set properties with provided values', () => {
    const codigo = 1;
    const tipo = 'Cedula';

    const tipoIdentificacion = new Tipos_identificacion();
    tipoIdentificacion.codigo = codigo;
    tipoIdentificacion.tipo = tipo;

    expect(tipoIdentificacion.codigo).toEqual(codigo);
    expect(tipoIdentificacion.tipo).toEqual(tipo);
  });
});