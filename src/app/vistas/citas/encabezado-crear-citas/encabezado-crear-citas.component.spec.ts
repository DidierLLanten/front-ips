import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncabezadoCrearCitasComponent } from './encabezado-crear-citas.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';
import { of } from 'rxjs';
import { Medico } from 'src/app/modelos/medico';
import { MedicoService } from 'src/app/services/medico.service';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/modelos/cita';
import { MessageService } from 'primeng/api';

describe('EncabezadoCrearCitasComponent', () => {
    const personas:any[] = [
        {
            codigo: 1,
            nombre: "Juan Camilo",
            apellido: "Torres Beltran",
            tipo_identificacion:{
                codigo: 1,
                tipo: "Cedula de ciudadania"
            },
            numero_documento:"15184685622",
            telefono:"3546654625",
            correo:"camilo@gmail.com"
        },
        {
            codigo: 2,
            nombre: "Didier Andres",
            apellido: "Llanten Saldariaga",
            tipo_identificacion:{
                codigo: 1,
                tipo: "Cedula de ciudadania"
            },
            numero_documento:"6546646464",
            telefono:"3546166198",
            correo:"didier@gmail.com"
        },
        {
            codigo: 3,
            nombre: "Luis Alejandro",
            apellido: "Piedrahita Gomez",
            tipo_identificacion:{
                codigo: 1,
                tipo: "Tarjeta de identidad"
            },
            numero_documento:"94561511665",
            telefono:"3848744546",
            correo:"luis@gmail.com"
        }
      ]
  let component: EncabezadoCrearCitasComponent;
  let fixture: ComponentFixture<EncabezadoCrearCitasComponent>;
  let mockEspecialidadesService: jasmine.SpyObj<EspecialidadService>;
  let mockMedicoService: jasmine.SpyObj<MedicoService>;
  let mockCitaService: jasmine.SpyObj<CitaService>;

  beforeEach(async () => {
    mockEspecialidadesService = jasmine.createSpyObj('EspecialidadService', ['obtenerListaEspecialidad']);
    mockMedicoService = jasmine.createSpyObj('MedicoService', ['obtenerMedicosPorIdEspecialidad']);
    mockCitaService = jasmine.createSpyObj('CitaService', ['obtenerCitasPorDoctorFecha']);
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoCrearCitasComponent],
      imports:[HttpClientModule, PrimeNGModule],
      providers: [
        MessageService,
        {provider:EspecialidadService, useValue:mockEspecialidadesService},
        {provider:MedicoService, useValue: mockMedicoService},
        {provider:CitaService, useValue: mockCitaService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoCrearCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockCitaService = TestBed.inject(CitaService) as jasmine.SpyObj<CitaService>;
    mockEspecialidadesService = TestBed.inject(EspecialidadService) as jasmine.SpyObj<EspecialidadService>;
    mockMedicoService = TestBed.inject(MedicoService) as jasmine.SpyObj<MedicoService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cargar especialidades', () => {
    const mockEspecialidades= [
        {
          id:1,
          especialidad:"ODONTOLOGIA"
        },
        {
           id:2,
           especialidad:"ORTOPEDIA"
        },
        {
            id:3,
            especialidad:"MEDICINA GENERAL"
        }
    ]
    spyOn(mockEspecialidadesService, 'obtenerListaEspecialidad').and.returnValue(of(mockEspecialidades));
    component.cargarEspecialidades();
    expect(mockEspecialidadesService.obtenerListaEspecialidad).toHaveBeenCalled();
    expect(component.especialidades).toEqual(mockEspecialidades);
  });

  it('should filtrar por especialidad', () => {
    const especializadSeleccionada= {
        id:1,
        especialidad:"ODONTOLOGIA"
    }
    component.especialidadSeleccionada = especializadSeleccionada;
    component.filtrarPorEspecialidad();
    expect(component.medicoSeleccionado).toEqual(new Medico());
    expect(component.fechaSeleccionada).toEqual(undefined);
  });

  it('should cargar medicos por especialidad', () => {
    const especializadSeleccionada= {
        id:1,
        especialidad:"ODONTOLOGIA"
    }

    const medicos = [
        {
            id:1,
            apellidoNombre:"Llanten Saldariaga Didier Andres",
            persona: personas[1],
            especialidad: especializadSeleccionada,
            tarjetaProfesional:"46546665641"
        },
        {
            id:2,
            apellidoNombre:"Torres Beltran Juan Camilo",
            persona: personas[0],
            especialidad: especializadSeleccionada,
            tarjetaProfesional:"44556546565"
        },
        {
            id:3,
            apellidoNombre:"Piedrahita Gomez Luis Alejandro",
            persona: personas[2],
            especialidad: especializadSeleccionada,
            tarjetaProfesional:"564654653665"
        }
    ]
    component.especialidadSeleccionada = especializadSeleccionada;
    spyOn(mockMedicoService, 'obtenerMedicosPorIdEspecialidad').and.returnValue(of(medicos));
    component.cargarMedicosPorEspecialidad();
    expect(mockMedicoService.obtenerMedicosPorIdEspecialidad).toHaveBeenCalled();
    expect(component.medicosEspecialistasOriginal).toEqual(medicos);
  });

  it('should listar citas', () => {
    const especialidad= {
        id:1,
        nombre:"ODONTOLOGIA"
    }
    const medico:any = {
        idMedico:2,
        persona: personas[0],
        especialidadMedico: especialidad,
        tarjetaProfesional:"44556546565"
    }
    const paciente:any = {
        idPaciente:1,
        persona:personas[2],
        eps:{
           id:1,
           nombre:"COLSANITAS",
           nit:"15256466564" 
        }     
     }
    const citas = [
        {
          id:1,
          paciente:paciente,
          medico: medico,
          fecha: new Date(),
          estadoCita : {
            id:1,
            nombre:"ASIGNADA"
          }   
        },
        {
            id:2,
            paciente:paciente,
            medico: medico,
            fecha: new Date(),
            estadoCita : {
              id:1,
              nombre:"ASIGNADA"
            }   
          },
          {
            id:3,
            paciente:paciente,
            medico: medico,
            fecha: new Date(),
            estadoCita : {
              id:1,
              nombre:"ASIGNADA"
            }   
          }
    ]
    component.medicoSeleccionado = medico;
    let emmit:Cita[] = [];
    component.citas.subscribe((value) => (emmit = value));
    component.fechaSeleccionada = new Date();
    spyOn(mockCitaService, 'obtenerCitasPorDoctorFecha').and.returnValue(of(citas));
    component.listarCitas();
    expect(component.citasCargadas).toEqual(citas);
    expect(emmit).toEqual(component.citasCargadas);
  });

  it('should enviar medico fecha citas', () => {
    const especialidad= {
        id:1,
        nombre:"ODONTOLOGIA"
    }
    const medico:any = {
        idMedico:2,
        persona: personas[0],
        especialidadMedico: especialidad,
        tarjetaProfesional:"44556546565"
    }
     component.fechaSeleccionada = new Date();
     component.medicoSeleccionado = medico;
     let emmit:Object[] = [];
     component.doctorFecha.subscribe((value) => (emmit = value)); 
     component.enviarMedicoFechaCitas();
     expect(emmit.length).toEqual(2);
  });
});