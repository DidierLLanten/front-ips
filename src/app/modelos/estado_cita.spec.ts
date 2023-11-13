import { Estado_cita } from './estado_cita';

describe('Estado_cita Class', () => {
  it('should create an instance', () => {
    const estadoCita = new Estado_cita();
    expect(estadoCita).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const estadoCita = new Estado_cita();
    
    expect(estadoCita.id).toBeUndefined();
    expect(estadoCita.estado).toBeUndefined();
  });

  it('should set properties with provided values', () => {
    const id = 1;
    const estadoName = 'EstadoNombre';

    const estadoCita = new Estado_cita();
    estadoCita.id = id;
    estadoCita.estado = estadoName;
    expect(estadoCita.id).toEqual(id);
    expect(estadoCita.estado).toEqual(estadoName);
  });

});