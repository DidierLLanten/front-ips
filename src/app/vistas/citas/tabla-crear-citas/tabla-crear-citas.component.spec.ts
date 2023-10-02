import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaCrearCitasComponent } from './tabla-crear-citas.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { CitaService } from 'src/app/services/cita.service';
import { of } from 'rxjs';

describe('TablaCrearCitasComponent', () => {
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
  let component: TablaCrearCitasComponent;
  let fixture: ComponentFixture<TablaCrearCitasComponent>;
  let datePipe: DatePipe;
  let mockCitaService: jasmine.SpyObj<CitaService>;

  beforeEach(async () => {
    mockCitaService = jasmine.createSpyObj('CitaService', ['actualizarEstadoCita','actualizarPacienteCita','obtenerPorMedico','obtenerPorEspecialidad','obtenerCitasPorDoctorFecha', 'crearCitaDoctor']);
    await TestBed.configureTestingModule({
      declarations: [ TablaCrearCitasComponent],
      imports: [HttpClientModule, PrimeNGModule],
      providers:[
        DatePipe, 
        {provider:CitaService, useValue:mockCitaService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaCrearCitasComponent);
    datePipe = TestBed.inject(DatePipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockCitaService = TestBed.inject(CitaService) as jasmine.SpyObj<CitaService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listar citas por fecha', () => {
        const citas = [
            {
            codigo:1,
            paciente:paciente,
            medico: medico,
            fecha: new Date(),
            estadoCita : {
                id:1,
                nombre:"ASIGNADA"
            }   
            },
            {
                codigo:2,
                paciente:paciente,
                medico: medico,
                fecha: new Date(),
                estadoCita : {
                id:1,
                nombre:"ASIGNADA"
                }   
            },
            {
                codigo:3,
                paciente:paciente,
                medico: medico,
                fecha: new Date(),
                estadoCita : {
                id:1,
                nombre:"ASIGNADA"
                }   
            }
        ]
     component.fecha = new Date();
     component.medico = medico;
     spyOn(mockCitaService, 'obtenerCitasPorDoctorFecha').and.returnValue(of(citas));
     spyOn(component, 'generarCitasFaltantes').withArgs(citas).and.returnValue(citas);
     component.listarCitasPorFecha();
     expect(mockCitaService.obtenerCitasPorDoctorFecha).toHaveBeenCalled();
     expect(component.citas).toEqual(citas);
  });

  it('should get color estado', () => {
     let estadoDisponible = "DISPONIBLE";
     let estadoCancelada = "CANCELADA";
     let estadoAsignada = "ASIGNADA";
     let estadoConfirmada = "CONFIRMADA";

     expect(component.getColorTagEstado(estadoDisponible)).toEqual("success");
     expect(component.getColorTagEstado(estadoCancelada)).toEqual("danger");
     expect(component.getColorTagEstado(estadoAsignada)).toEqual("warning");
     expect(component.getColorTagEstado(estadoConfirmada)).toEqual("info");
     expect(component.getColorTagEstado("")).toEqual("danger");
  });

  it('should mostrar modal confirmacion', () => {
    const cita ={
        codigo:3,
        paciente:paciente,
        medico: medico,
        fecha: new Date(),
        estadoCita : {
              id:1,
              nombre:"ASIGNADA"
         }   
    }
    component.mostrarModalConfirmacion(cita);
    expect(component.citaSeleccionada).toEqual(cita);
    expect(component.mostrarConfirmacion).toBeTrue();
 });

 it('should crear cita', () => {
     component.doctorFecha = [
        {
          idMedico:7
        }
     ];
     component.fecha = new Date();
     component.medico = medico;
     spyOn(mockCitaService, 'crearCitaDoctor').and.returnValue(of([]));
     component.crearCita(new Date());
     expect(mockCitaService.crearCitaDoctor).toHaveBeenCalled();
     expect(component.mostrarConfirmacion).toBeFalse();
 });

 it('should eliminar cita', () => {
    const cita ={
        codigo:3,
        paciente:paciente,
        medico: medico,
        fecha: new Date(),
        estadoCita : {
              id:1,
              nombre:"ASIGNADA"
         }   
    }
    spyOn(component, 'eliminarCita');
    component.eliminarCita(cita);
    expect(component.eliminarCita).toHaveBeenCalled();
});
});