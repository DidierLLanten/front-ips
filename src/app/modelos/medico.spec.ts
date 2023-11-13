import { Medico } from './medico';
import { Especialidad_medicos } from './especialidades_medico';
import { Persona } from './persona';

describe('Medico Class', () => {
  it('should create an instance', () => {
    const medico = new Medico();
    expect(medico).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const medico = new Medico();

    expect(medico.id).toBeUndefined();
    expect(medico.persona).toBeInstanceOf(Persona);
    expect(medico.especialidad).toBeInstanceOf(Especialidad_medicos);
    expect(medico.tarjetaProfesional).toBeUndefined();
  });

  it('should set properties with provided values', () => {
    const id = 1;
    const persona = new Persona();
    const especialidad = new Especialidad_medicos();
    const tarjetaProfesional = '123456789';

    const medico = new Medico();
    medico.id = id;
    medico.persona = persona;
    medico.especialidad = especialidad;
    medico.tarjetaProfesional = tarjetaProfesional;

    expect(medico.id).toEqual(id);
    expect(medico.persona).toEqual(persona);
    expect(medico.especialidad).toEqual(especialidad);
    expect(medico.tarjetaProfesional).toEqual(tarjetaProfesional);
  });

});