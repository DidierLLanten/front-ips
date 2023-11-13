import { Cita } from './cita';
import { Paciente } from './paciente';
import { Medico } from './medico';
import { Estado_cita } from './estado_cita';

describe('Cita', () => {
  it('should create an instance', () => {
    const cita = new Cita();
    expect(cita).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const cita = new Cita();
    expect(cita.id).toBeUndefined();
    expect(cita.paciente instanceof Paciente).toBe(true);
    expect(cita.medico instanceof Medico).toBe(true);
    expect(cita.fecha instanceof Date).toBe(true);
    expect(cita.estadoCita instanceof Estado_cita).toBe(true);
  });
});