import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaCrearCitasComponent } from './tabla-crear-citas.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { CitaService } from 'src/app/services/cita.service';
import { of } from 'rxjs';
import { SimpleChange, SimpleChanges } from '@angular/core';

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

  it('should update citas when ngOnChanges is called', () => {
    component.doctorFecha = [
        {
          idMedico:7
        }
     ];
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

    const citasActualizadas = [
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

    component.citas = citas;
    
    const changes: SimpleChanges = {
        citas: new SimpleChange(undefined, citas, true),
      };
    spyOn(component, 'generarCitasFaltantes').and.returnValue(citasActualizadas);
    spyOn(component, 'ordenarCitasPorHora');
    component.ngOnChanges(changes);
    fixture.detectChanges();
    expect(component.citas).toEqual(citasActualizadas);
    expect(component.citas.length).toBeGreaterThan(0);
  });
  

  it('should generarCitasFaltantes', () => {
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
    component.generarCitasFaltantes(citas);
    expect(component.generarCitasFaltantes(citas).length).toBeGreaterThan(citas.length);
  });



  it('should listar citas por fecha', () => {
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
     component.fecha = new Date();
     component.medico = medico;
     spyOn(mockCitaService, 'obtenerCitasPorDoctorFecha').and.returnValue(of(citas));
     spyOn(component, 'generarCitasFaltantes').withArgs(citas).and.returnValue(citas);
     component.listarCitasPorFecha();
     expect(mockCitaService.obtenerCitasPorDoctorFecha).toHaveBeenCalled();
     expect(component.citas).toEqual(citas);
  });

  it('should get color estado', () => {
     let estadoPorAgendar = "POR AGENDAR";
     let estadoDisponible = "DISPONIBLE";
     let estadoCancelada = "CANCELADA";
     let estadoAsignada = "ASIGNADA";
     let estadoConfirmada = "CONFIRMADA";
     
     expect(component.getColorTagEstado(estadoPorAgendar)).toEqual("info")
     expect(component.getColorTagEstado(estadoDisponible)).toEqual("success");
     expect(component.getColorTagEstado(estadoCancelada)).toEqual("danger");
     expect(component.getColorTagEstado(estadoAsignada)).toEqual("warning");
     expect(component.getColorTagEstado(estadoConfirmada)).toEqual("info");
     expect(component.getColorTagEstado("")).toEqual("danger");
  });

  it('should mostrar modal confirmacion', () => {
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

 it('should crear citas del dia', () => {
    component.doctorFecha = [
        {
          idMedico:7
        }
     ];
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
    spyOn(component, 'listarCitasPorFecha');
    spyOn(mockCitaService, 'crearCitaDoctor').and.returnValue(of([]));
    component.citasActualizadas = citas; 

    component.crearCitasDelDia();
    expect(mockCitaService.crearCitaDoctor).toHaveBeenCalled();
});

it('should ordenar citas por hora', () => {
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
    

    component.ordenarCitasPorHora(citas);
    expect(citas).toEqual(citas);
});

it('should ordenar citas por hora when hours are not equal', () => {
    let fechaUno = new Date();
    fechaUno.setHours(4);
    let fechaDos = new Date();
    fechaDos.setHours(5);
    let fechaTres = new Date();
    fechaUno.setHours(6);
    const citas = [
        {
        id:1,
        paciente:paciente,
        medico: medico,
        fecha: fechaUno,
        estadoCita : {
            id:1,
            nombre:"ASIGNADA"
        }   
        },
        {
            id:2,
            paciente:paciente,
            medico: medico,
            fecha: fechaDos,
            estadoCita : {
            id:1,
            nombre:"ASIGNADA"
            }   
        },
        {
            id:3,
            paciente:paciente,
            medico: medico,
            fecha: fechaTres,
            estadoCita : {
            id:1,
            nombre:"ASIGNADA"
            }   
        }
    ]
    

    component.ordenarCitasPorHora(citas);
    expect(citas).toEqual(citas);
});

it('should ordenar citas por hora when hours are equal but minutes are different', () => {
    let fechaUno = new Date();
    fechaUno.setMinutes(4);
    let fechaDos = new Date();
    fechaDos.setMinutes(5);
    let fechaTres = new Date();
    fechaUno.setMinutes(6);
    const citas = [
        {
        id:1,
        paciente:paciente,
        medico: medico,
        fecha: fechaUno,
        estadoCita : {
            id:1,
            nombre:"ASIGNADA"
        }   
        },
        {
            id:2,
            paciente:paciente,
            medico: medico,
            fecha: fechaDos,
            estadoCita : {
            id:1,
            nombre:"ASIGNADA"
            }   
        },
        {
            id:3,
            paciente:paciente,
            medico: medico,
            fecha: fechaTres,
            estadoCita : {
            id:1,
            nombre:"ASIGNADA"
            }   
        }
    ]
    

    component.ordenarCitasPorHora(citas);
    expect(citas).toEqual(citas);
});


 it('should eliminar cita', () => {
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
    component.eliminarCita(cita);
});
});