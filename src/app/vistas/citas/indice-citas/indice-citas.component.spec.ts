import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndiceCitasComponent } from './indice-citas.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { TablaCitasComponent } from '../tabla-citas/tabla-citas.component';
import { EncabezadoCitasComponent } from '../encabezado-citas/encabezado-citas.component';
import { MockComponents } from 'ng-mocks';

describe('IndiceCitasComponent', () => {
    let component: IndiceCitasComponent;
    let fixture: ComponentFixture<IndiceCitasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ IndiceCitasComponent, MockComponents(TablaCitasComponent, EncabezadoCitasComponent) ],
        imports:[HttpClientModule, PrimeNGModule]
        })
        .compileComponents();

        fixture = TestBed.createComponent(IndiceCitasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('shoul recibir especialidad', () =>{
        const especialidad= {
            id:1,
            nombre:"ODONTOLOGIA"
        }
        component.recibirIdEspecialidad(especialidad.id);
        expect(component.idEspecialidad).toEqual(especialidad.id);
    });

    it('should recibir paciente', () =>{
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
        const paciente:any = {
            idPaciente:1,
            persona:personas[2],
            eps:{
            id:1,
            nombre:"COLSANITAS",
            nit:"15256466564" 
            }     
        }
        component.recibirPaciente(paciente);
        expect(component.paciente).toEqual(paciente);
    })
});