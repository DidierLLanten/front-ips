import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndiceCitasComponent } from '../../citas/indice-citas/indice-citas.component';
import { IndicePacientesComponent } from './indice-pacientes.component';
import { HttpClientModule } from '@angular/common/http';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';
import { of } from 'rxjs';
import { EPSService } from 'src/app/services/eps.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/modelos/paciente';
import { ConfirmationService } from 'primeng/api';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';


describe('IndicePacientesComponent', () => {
  const personas:any[] = [
    {
        codigo: 1,
        nombre: "Juan Camilo",
        apellido: "Torres Beltran",
        tipoIdentificacion:{
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
        tipoIdentificacion:{
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
        tipoIdentificacion:{
            codigo: 1,
            tipo: "Tarjeta de identidad"
        },
        numeroDocumento:"94561511665",
        telefono:"3848744546",
        correo:"luis@gmail.com"
    }
  ]

  let component: IndicePacientesComponent;
  let fixture: ComponentFixture<IndicePacientesComponent>;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;
  let mockTipoIdentificacionService: jasmine.SpyObj<TipoIdentificacionService>;
  let mockEpsService: jasmine.SpyObj<EPSService>;
  let mockPacienteService: jasmine.SpyObj<PacienteService>;

  beforeEach(async () => {
    confirmationService = jasmine.createSpyObj('ConfirmationService', ['confirm']);
    mockTipoIdentificacionService = jasmine.createSpyObj('TipoIdentificacionService', ['obtenerListaTiposIdentificacion']);
    mockEpsService = jasmine.createSpyObj('EPSService', ['obtenerListaEPS']);
    mockPacienteService = jasmine.createSpyObj('PacienteService',['obtenerListaPacientes','createPatient','actualizarPaciente','eliminarPaciente']);
    await TestBed.configureTestingModule({
      declarations: [ IndiceCitasComponent],
      imports:[HttpClientModule, PrimeNGModule],
      providers:[
        {provide:ConfirmationService, useValue:confirmationService},
        {provider:TipoIdentificacionService, useValue:mockTipoIdentificacionService},
        {provider:EPSService, useValue: mockEpsService},
        {provider:PacienteService, useValue:mockPacienteService},
    ],
    })
    .compileComponents();
    
    confirmationService = TestBed.inject(ConfirmationService) as jasmine.SpyObj<ConfirmationService>;
    fixture = TestBed.createComponent(IndicePacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockTipoIdentificacionService = TestBed.inject(TipoIdentificacionService ) as jasmine.SpyObj<TipoIdentificacionService>;
    mockEpsService = TestBed.inject(EPSService) as jasmine.SpyObj<EPSService>;
    mockPacienteService = TestBed.inject(PacienteService) as jasmine.SpyObj<PacienteService>;
  });

  it('should create', () => {
    spyOn(component, 'obtenerPacientes');
    expect(component).toBeTruthy();
  });

  it('should obtener tipos de identificacion', () =>{
    const mockTiposIdentificacion =[
        {
            codigo:1,
            tipo:"Cedula de ciudadania"
        }
    ]
    const spy = spyOn(mockTipoIdentificacionService, 'obtenerListaTiposIdentificacion');
    spy.and.returnValue(of(mockTiposIdentificacion));
    component.obtenerTiposIdentificacion();
    expect(mockTipoIdentificacionService.obtenerListaTiposIdentificacion).toHaveBeenCalled();
    expect(component.tipos_identificacion).toEqual(mockTiposIdentificacion);
  });

  it('should obtener EPS', () =>{
    const mockEps =[
      {
        id:1,
        eps:"COLSANITAS",
        nit:"15256466564"
      },
      {
        id:2,
        eps:"COLSALUD",
        nit:"56565466546"
      }
    ]
    const spy = spyOn(mockEpsService, 'obtenerListaEPS');
    spy.and.returnValue(of(mockEps));
    component.obtenerEPS();
    expect(mockEpsService.obtenerListaEPS).toHaveBeenCalled();
    expect(component.lista_eps).toEqual(mockEps);
    expect(component.lista_eps.length).toEqual(mockEps.length);
  });

  it('should obtener pacientes', () =>{
    const mockPacientes =[
      {
        id:1,
        persona:personas[0],
        eps:{
            id:1,
            eps:"COLSANITAS",
            nit:"15256466564" 
        }
      },
      {
        id:2,
        persona:personas[1],
        eps:{
            id:2,
            eps:"COLSALUD",
            nit:"56565466546" 
        }
      }
    ]
    const spy = spyOn(mockPacienteService, 'obtenerListaPacientes');
    spy.and.returnValue(of(mockPacientes));
    component.obtenerListaPacientes();
    expect(mockPacienteService.obtenerListaPacientes).toHaveBeenCalled();
    expect(component.pacientes).toEqual(mockPacientes);
    expect(component.pacientes.length).toEqual(mockPacientes.length);
  });

  it('should open new dialog', ()=>{
     component.openNew();
     expect(component.editar).toBeFalse();
     expect(component.paciente).toEqual(new Paciente());
     expect(component.submitted).toBeFalse();
     expect(component.productDialog).toBeTrue();
     expect(component.disabledType).toBeFalse();
  });

  it('should verificar campos and return false when the fields are empty', ()=>{
    component.verificarCampos();
    expect(component.verificarCampos()).toEqual(false);  
  });

  it('should verificar campos and return true when the fields are not empty', ()=>{
    component.paciente.persona= personas[0];
    component.verificarCampos();
    expect(component.verificarCampos()).toEqual(true);  
  });

  it('should guardar paciente (Crear un paciente nuevo)',()=>{
     const paciente:any = {
        idPaciente:1,
        persona:personas[2],
        eps:{
           id:1,
           nombre:"COLSANITAS",
           nit:"15256466564" 
        }     
     }
     component.editar= false;
     component.paciente.persona = personas[2];
     spyOn(component, 'verificarCampos').and.returnValue(true);
     spyOn(mockPacienteService, 'createPatient').and.returnValue(of(paciente));
     spyOn(component, 'obtenerPacientes');
     component.guardarPaciente();
     expect(mockPacienteService.createPatient).toHaveBeenCalled();
     expect(component.productDialog).toBeFalse();
     expect(component.paciente).toEqual(new Paciente());
  });

  it('should guardar paciente (Editar paciente existente)',()=>{
    const paciente:any = {
       idPaciente:1,
       persona:personas[2],
       eps:{
          id:1,
          nombre:"COLSANITAS",
          nit:"15256466564" 
       }     
    }
    component.editar= true;
    component.pacienteEditado= paciente;
    spyOn(component, 'verificarCampos').and.returnValue(true);
    spyOn(mockPacienteService, 'actualizarPaciente').and.returnValue(of(paciente));
    spyOn(component, 'obtenerPacientes');
    component.guardarPaciente();
    expect(mockPacienteService.actualizarPaciente).toHaveBeenCalled();
    expect(component.productDialog).toBeFalse();
    expect(component.editar).toBeFalse();
  });

  it('should call editar paciente dialog',()=>{
      const paciente:any = {
          idPaciente:1,
          persona:personas[2],
          eps:{
            id:1,
            nombre:"COLSANITAS",
            nit:"15256466564" 
          }     
      }
      component.editarPaciente(paciente);
      expect(component.paciente).toEqual(paciente);
      expect(component.pacienteEditado).toEqual(paciente);
      expect(component.editar).toBeTrue();
      expect(component.disabledType).toBeTrue();
      expect(component.productDialog).toBeTrue();      
  });

  it('should eliminar paciente',()=>{
      const paciente:any = {
          idPaciente:1,
          persona:personas[2],
          eps:{
            id:1,
            nombre:"COLSANITAS",
            nit:"15256466564" 
          }     
      }
      spyOn(mockPacienteService, 'eliminarPaciente').and.returnValue(of(paciente)); 
      component.eliminarPaciente(paciente);      
  });

  it('should hide dialog',()=>{
      component.hideDialog();
      expect(component.productDialog).toBeFalse();
      expect(component.submitted).toBeFalse();
      expect(component.paciente).toEqual(new Paciente());
  });

  it('should find index by id', () =>{
      const mockPacientes =[
          {
            id:1,
            persona:personas[0],
            eps:{
                id:1,
                eps:"COLSANITAS",
                nit:"15256466564" 
            }
          },
          {
            id:2,
            persona:personas[1],
            eps:{
                id:2,
                eps:"COLSALUD",
                nit:"56565466546" 
            }
          }
        ]
        component.pacientes = mockPacientes;
        component.findIndexById(2);
        expect(component.findIndexById(2)).toEqual(1);

  });
});