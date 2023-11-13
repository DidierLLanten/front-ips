import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncabezadoCitasComponent } from './encabezado-citas.component';
import { HttpClientModule } from '@angular/common/http';
import { PacienteService } from 'src/app/services/paciente.service';
import { of } from 'rxjs';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';
import { MessageService } from 'primeng/api';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';

describe('EncabezadoCitasComponent', () => {
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
       
  let component: EncabezadoCitasComponent;
  let fixture: ComponentFixture<EncabezadoCitasComponent>;
  let mockPacienteService : jasmine.SpyObj<PacienteService>;
  let mockEspecialidadesService: jasmine.SpyObj<EspecialidadService>;

  beforeEach(async () => {
    mockEspecialidadesService = jasmine.createSpyObj('EspecialidadService', ['obtenerListaEspecialidad']);
    mockPacienteService = jasmine.createSpyObj('PacienteService', ['obtenerPacientePorCedula']);
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoCitasComponent ],
      imports: [HttpClientModule, PrimeNGModule],
      providers: [
        MessageService,
        {provider:PacienteService, useValue: mockPacienteService},
        {provider:EspecialidadService, useValue: mockEspecialidadesService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockPacienteService = TestBed.inject(PacienteService) as jasmine.SpyObj<PacienteService>;
    mockEspecialidadesService = TestBed.inject(EspecialidadService) as jasmine.SpyObj<EspecialidadService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should buscar paciente por cedula', () => {
    const paciente:any = {
        idPaciente:1,
        persona:personas[2],
        eps:{
           id:1,
           nombre:"COLSANITAS",
           nit:"15256466564" 
        }     
    }
    component.cedula = "123";
    spyOn(mockPacienteService, 'obtenerPacientePorCedula').and.returnValue(of(paciente));
    component.buscarPacientePorCedula();
    expect(mockPacienteService.obtenerPacientePorCedula).toHaveBeenCalled();
    expect(component.pacienteAux).toEqual(paciente);
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
    const especialidadSeleccionada = {
        id:1,
        especialidad:"ODONTOLOGIA"
    }
    let id = 1;
    component.especialidadSeleccionada = especialidadSeleccionada;
    component.filtrar.subscribe((value) => (id = value));
    component.filtrarPorEspecialidad();
    expect(id).toEqual(component.especialidadSeleccionada.id);
  });

  it('should enviar persona', () => {
    let paciente:any = {
        idPaciente:1,
        persona:personas[2],
        eps:{
           id:1,
           nombre:"COLSANITAS",
           nit:"15256466564" 
        }     
    }
    component.pacienteAux = paciente;
    component.paciente.subscribe((value) => (paciente = value));
    component.filtrarPorEspecialidad();
    expect(paciente).toEqual(component.pacienteAux);
  });

});
