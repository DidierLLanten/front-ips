import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaCitasComponent } from './tabla-citas.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { CitaService } from 'src/app/services/cita.service';
import { of } from 'rxjs';

describe('TablaCitasComponent', () => {
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
    const cita ={
        id:3,
        paciente:paciente,
        medico: medico,
        fecha: new Date(),
        estadoCita : {
              id:1,
              nombre:"ASIGNADA"
         }   
    }
  let component: TablaCitasComponent;
  let fixture: ComponentFixture<TablaCitasComponent>;
  let mockCitaService: jasmine.SpyObj<CitaService>;

  beforeEach( () => {
    mockCitaService = jasmine.createSpyObj('CitaService', ['actualizarEstadoCita','actualizarPacienteCita','obtenerPorMedico','obtenerPorEspecialidad']);
     TestBed.configureTestingModule({
      declarations: [ TablaCitasComponent ],
      imports: [HttpClientModule, PrimeNGModule],
      providers:[
        {provider:CitaService, useValue:mockCitaService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockCitaService = TestBed.inject(CitaService) as jasmine.SpyObj<CitaService>;
  });

  it('should show dialog', () => {
    component.showDialog(cita);
    expect(component.visible).toBeTrue();
  });

  it('should confirmar cita',() => {
    spyOn(mockCitaService, 'actualizarEstadoCita').and.returnValue(of([]));
    spyOn(mockCitaService, 'actualizarPacienteCita').and.returnValue(of([]));
    spyOn(component, 'cargarTablaPorEspecialidades')
    component.citaSeleccionada = cita;
    component.paciente = paciente;
     component.confirmarCita();
    expect(mockCitaService.actualizarEstadoCita).toHaveBeenCalled();
    expect(mockCitaService.actualizarPacienteCita).toHaveBeenCalled();
    expect(component.visible).toBeFalse();
  });

  it('should buscar medico when exist the name', () => {
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
    component.nombreMedico = "Hernando";
    spyOn(mockCitaService, 'obtenerPorMedico').and.returnValue(of(citas));
    component.obtenerMedico();
    expect(mockCitaService.obtenerPorMedico).toHaveBeenCalled();
    expect(component.citas).toEqual(citas);
  });

  it('should cargar tabla por especialidades', () => {
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
    spyOn(mockCitaService, 'obtenerPorEspecialidad').and.returnValue(of(citas));
    component.cargarTabla();
    expect(mockCitaService.obtenerPorEspecialidad).toHaveBeenCalled();
    expect(component.citas).toEqual(citas);
  });

});