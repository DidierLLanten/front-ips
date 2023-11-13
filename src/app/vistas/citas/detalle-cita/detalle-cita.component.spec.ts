import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleCitaComponent } from './detalle-cita.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { CitaService } from 'src/app/services/cita.service';
import { HistorialCitaService } from 'src/app/services/historialCita.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { of } from 'rxjs';

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


describe('DetalleCitaComponent', () => {
  let component: DetalleCitaComponent;
  let fixture: ComponentFixture<DetalleCitaComponent>;
  let mockSeguridadService: jasmine.SpyObj<SeguridadService>;
  let mockCitaService: jasmine.SpyObj<CitaService>;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;;
  let mockHistorialCitaService: jasmine.SpyObj<HistorialCitaService>;

  beforeEach(() => {
    confirmationService = jasmine.createSpyObj('ConfirmationService', ['confirm']);
    mockSeguridadService = jasmine.createSpyObj('SeguridadService',['obtenerCampoJWT']);
    mockHistorialCitaService = jasmine.createSpyObj('HistorialCitaService', ['crearHistorialCita']);
    mockCitaService = jasmine.createSpyObj('CitaService', ['actualizarEstadoCita','obtenerCitasConfirmadasYAssignadasPorCedula']);
    TestBed.configureTestingModule({
      declarations: [DetalleCitaComponent],
      imports:[HttpClientModule,PrimeNGModule, ConfirmDialogModule],
      providers:[
        MessageService,
        {provide:ConfirmationService, confirmationService},
        {provider:HistorialCitaService, useValue:mockHistorialCitaService},
        {provider:CitaService, useValue:mockCitaService},
        {provider:SeguridadService, useValue: mockSeguridadService}
      ]
    });
    fixture = TestBed.createComponent(DetalleCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockSeguridadService = TestBed.inject(SeguridadService) as jasmine.SpyObj<SeguridadService>;
    mockCitaService = TestBed.inject(CitaService) as jasmine.SpyObj<CitaService>;
    mockHistorialCitaService = TestBed.inject(HistorialCitaService) as jasmine.SpyObj<HistorialCitaService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm', () => {
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
  
    spyOn(component, 'cambiarEstadoCita');
    
    component.confirm(cita);
  });

  it('should confirm cancel', () => {
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
  
    spyOn(component, 'cambiarEstadoCita');
    
    component.confirmCancellation(cita);
  });

  it('should crear historial', () => {
    let idEstadoActual = 2
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
    spyOn(mockHistorialCitaService, 'crearHistorialCita').and.returnValue(of([]));
    component.crearHistorial(idEstadoActual,cita);
    expect(component.historialCita.fechaModificacion).toEqual('');
    expect(component.historialCita.horaModificacion).toEqual('');
    expect(component.historialCita.cambio).toEqual("CAMBIO_ESTADO");
    expect(component.historialCita.estadoActual.id).toEqual(idEstadoActual);
    expect(component.historialCita.estadoAnterior.id).toEqual(cita.estadoCita.id);

  });

  it('should obtenerCitasAsignadas y confirmadas when there are citas', () => {
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
    spyOn(mockCitaService, 'obtenerCitasConfirmadasYAssignadasPorCedula').and.returnValue(of(citas));
    component.obtenerCitasAsignadasYConfirmadas();
    expect(mockCitaService.obtenerCitasConfirmadasYAssignadasPorCedula).toHaveBeenCalled();
    expect(component.citasEncontradas).toEqual(citas);
  });


  it('should obtenerCitasAsignadas y confirmadas when there are not citas', () => {
    spyOn(mockCitaService, 'obtenerCitasConfirmadasYAssignadasPorCedula').and.returnValue(of([]));
    component.obtenerCitasAsignadasYConfirmadas();
    expect(mockCitaService.obtenerCitasConfirmadasYAssignadasPorCedula).toHaveBeenCalled();
    expect(component.citasEncontradas).toBeUndefined();
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

  it('should cambiar estado', () => {
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
     spyOn(component, 'buscarCitaPorCedula');
     spyOn(component, 'crearHistorial');
     spyOn(mockCitaService,'actualizarEstadoCita').and.returnValue(of([]));
     component.cambiarEstadoCita(cita, 4);
     expect(mockCitaService.actualizarEstadoCita).toHaveBeenCalled();
  });
});
