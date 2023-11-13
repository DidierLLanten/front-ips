import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialComponent } from './historial.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialCitaService } from 'src/app/services/historialCita.service';
import { MedicoService } from 'src/app/services/medico.service';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';
import { of } from 'rxjs';
import { Medico } from 'src/app/modelos/medico';
import { HistorialCita } from 'src/app/modelos/historialCita';

let especialidades:any[]=[
  {
      id:1,
      especialidad:"Medico General"
  },
  {
      id:2,
      especialidad:"Cardiologo"
  }
];

const personas:any[] = [
  {
      codigo: 1,
      nombre: "Juan Camilo",
      apellido: "Torres Beltran",
      tipo_identificacion:{
          codigo: 1,
          tipo: "Cedula de ciudadania"
      },
      numeroDocumento:"15184685622",
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
      numeroDocumento:"6546646464",
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
      numeroDocumento:"94561511665",
      telefono:"3848744546",
      correo:"luis@gmail.com"
  }
];

const medico:any = {
  idMedico:2,
  persona: personas[0],
  especialidadMedico: especialidades[0],
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

let medicos:any[]=[
  {
      id:1,
      persona:personas[0],
      especialidad:especialidades[0],
      tarjetaProfesional: "No se que tiene una tarjeta profesional"
  }
]

let historialCitas:HistorialCita[] = [
  {
    id:1,
    cita:cita,
    fechaModificacion:'2023-08-22',
    horaModificacion:'10:22',
    estadoAnterior:{
      id:3,
      estado:"ASIGNADA"
    },
    estadoActual:{
      id:1,
      estado:"DISPONIBLE"
    },
    cambio: "CAMBIO_ESTADO"

  }
]

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;
  let mockHistorialCitaService: jasmine.SpyObj<HistorialCitaService>;
  let mockMedicoService: jasmine.SpyObj<MedicoService>;
  let mockEspecialidadService: jasmine.SpyObj<EspecialidadService>; 

  beforeEach(() => {
    mockHistorialCitaService = jasmine.createSpyObj('HistorialCitaService', ['crearHistorialCita']);
    mockMedicoService =  jasmine.createSpyObj('MedicoService', ['obtenerMedicosPorIdEspecialidad']);
    mockEspecialidadService = jasmine.createSpyObj('EspecialidadService', ['obtenerListaEspecialidad']);
    TestBed.configureTestingModule({
      declarations: [HistorialComponent],
      imports:[HttpClientModule, PrimeNGModule, FormsModule, ReactiveFormsModule],
      providers: [
        {provider:EspecialidadService, useValue:mockEspecialidadService},
        {provider:HistorialCitaService, useValue:mockHistorialCitaService},
        {provider:MedicoService, useValue:mockMedicoService}
      ]
    });
    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockHistorialCitaService = TestBed.inject(HistorialCitaService) as jasmine.SpyObj<HistorialCitaService>;
    mockMedicoService = TestBed.inject(MedicoService) as jasmine.SpyObj<MedicoService>;
    mockEspecialidadService = TestBed.inject(EspecialidadService) as jasmine.SpyObj<EspecialidadService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should obtener citas', () => {
     component.obtenerCitas();
     expect(component.historialCitasCargadas).toEqual([]);
  });

  it('should verificar filtros when the filters are good', () => {
    component.selectedMedico = medico;
    component.selectedCambio = "CAMBIO_ESTADO";
    component.selectedDate = new Date();
    component.verificarFiltros();
    expect(component.verificarFiltros()).toEqual(true);
 });

 it('should verificar filtros when the filters are not good', () => {
  component.verificarFiltros();
  expect(component.verificarFiltros()).toEqual(false);
});


  it('should cargar especialidades', () => {
    spyOn(mockEspecialidadService, 'obtenerListaEspecialidad').and.returnValue(of(especialidades));
    component.cargarEspecialidades();
    expect(mockEspecialidadService.obtenerListaEspecialidad).toHaveBeenCalled();
    expect(component.especialidades).toEqual(especialidades);
  });

  it('should cargar medicos por especialidad', () => {
    let medicosFormateador:any[]=[
      {
          id:1,
          persona:personas[0],
          apellidoNombre:personas[0].apellido + ' ' + personas[0].nombre,
          especialidad:especialidades[0],
          tarjetaProfesional: "No se que tiene una tarjeta profesional"
      }
    ]
    component.especialidadSeleccionada = especialidades[0];
    spyOn(mockMedicoService, 'obtenerMedicosPorIdEspecialidad').and.returnValue(of(medicos));
    component.cargarMedicosPorEspecialidad();
    expect(mockMedicoService.obtenerMedicosPorIdEspecialidad).toHaveBeenCalled();
    expect(component.medicoOrigial).toEqual(medicosFormateador);
  });

  it('should filtrar por especialidad', () => {
    spyOn(component, 'cargarMedicosPorEspecialidad');
    component.filtrarPorEspecialidad();
    expect(component.selectedMedico).toEqual(new Medico());
    expect(component.cargarMedicosPorEspecialidad).toHaveBeenCalled();
  });

  it('should filtrarCitas when is valid', () => {
    component.formGroup.patchValue({
      especialidad: especialidades[0],
    });
    spyOn(mockHistorialCitaService, 'obtenerListaHistorialCita').and.returnValue(of(historialCitas));
    spyOn(component, 'verificarFiltros').and.returnValue(true);
    component.filtrarCitas();
    expect(mockHistorialCitaService.obtenerListaHistorialCita).toHaveBeenCalled();
    expect(component.mostrarTabla).toBeTrue();
    expect(component.filtrado).toBeTrue();
    expect(component.mostrarAlerta).toBeFalse();
    expect(component.historialCitasCargadas).toEqual(historialCitas);
  });

  it('should filtrarCitas when verificar filtros return false', () => {
    spyOn(component, 'verificarFiltros').and.returnValue(false);
    component.filtrarCitas();
    expect(component.mostrarAlerta).toBeTrue();
  });

  it('should filtrarCitas when the form is invalid', () => {
    spyOn(component, 'verificarFiltros').and.returnValue(true);
    component.filtrarCitas();
    expect(component.mostrarAlerta).toBeTrue();
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
});
