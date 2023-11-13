import { Especialidad_medicos } from './especialidades_medico';

describe('Especialidad_medicos Class', () => {
  it('should create an instance', () => {
    const especialidadMedicos = new Especialidad_medicos();
    expect(especialidadMedicos).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    const especialidadMedicos = new Especialidad_medicos();
    
    expect(especialidadMedicos.id).toBeUndefined();
    expect(especialidadMedicos.especialidad).toBeUndefined();
  });

  it('should set properties with provided values', () => {
    const id = 1;
    const especialidadName = 'EspecialidadNombre';

    const especialidadMedicos = new Especialidad_medicos();
    especialidadMedicos.id = id;
    especialidadMedicos.especialidad = especialidadName;

    expect(especialidadMedicos.id).toEqual(id);
    expect(especialidadMedicos.especialidad).toEqual(especialidadName);
  });
});