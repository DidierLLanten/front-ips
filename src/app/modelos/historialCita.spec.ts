import { HistorialCita } from './historialCita';
import { Cita } from './cita';
import { Estado_cita } from './estado_cita';

describe('HistorialCita Class', () => {
  it('should create an instance', () => {
    const historialCita = new HistorialCita();
    expect(historialCita).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const historialCita = new HistorialCita();
    
    expect(historialCita.id).toBeUndefined();
    expect(historialCita.cita).toBeUndefined();
    expect(historialCita.fechaModificacion).toBeUndefined();
    expect(historialCita.horaModificacion).toBeUndefined();
    expect(historialCita.estadoAnterior).toBeUndefined();
    expect(historialCita.estadoActual).toBeUndefined();
    expect(historialCita.cambio).toBeUndefined();
  });

  it('should set properties with provided values', () => {
    const id = 1;
    const cita = new Cita();
    const fechaModificacion = '2023-11-13';
    const horaModificacion = '12:34:56';
    const estadoAnterior = new Estado_cita();
    const estadoActual = new Estado_cita();
    const cambio = 'CAMBIO_ESTADO';

    const historialCita = new HistorialCita();
    historialCita.id = id;
    historialCita.cita = cita;
    historialCita.fechaModificacion = fechaModificacion;
    historialCita.horaModificacion = horaModificacion;
    historialCita.estadoAnterior = estadoAnterior;
    historialCita.estadoActual = estadoActual;
    historialCita.cambio = cambio;

    expect(historialCita.id).toEqual(id);
    expect(historialCita.cita).toEqual(cita);
    expect(historialCita.fechaModificacion).toEqual(fechaModificacion);
    expect(historialCita.horaModificacion).toEqual(horaModificacion);
    expect(historialCita.estadoAnterior).toEqual(estadoAnterior);
    expect(historialCita.estadoActual).toEqual(estadoActual);
    expect(historialCita.cambio).toEqual(cambio);
  });

});