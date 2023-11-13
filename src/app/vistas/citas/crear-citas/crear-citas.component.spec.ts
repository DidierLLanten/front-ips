import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CrearCitasComponent } from "./crear-citas.component";
import { HttpClientModule } from "@angular/common/http";
import { PrimeNGModule } from "src/app/prime-ng/prime-ng.module";
import { EncabezadoCrearCitasComponent } from "../encabezado-crear-citas/encabezado-crear-citas.component";
import { TablaCrearCitasComponent } from "../tabla-crear-citas/tabla-crear-citas.component";
import { MockComponents } from 'ng-mocks';

describe("CrearCitasComponent", () => {
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
    const citas:any[]=[
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

    let component: CrearCitasComponent;
    let fixture: ComponentFixture<CrearCitasComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [CrearCitasComponent, MockComponents(EncabezadoCrearCitasComponent, TablaCrearCitasComponent)],
        imports: [HttpClientModule, PrimeNGModule],
        }).compileComponents();
         
        fixture = TestBed.createComponent(CrearCitasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it('should recibir fecha medico', () =>{
        const fechas:any[]=[];
        component.recibirDoctorFecha(fechas);
        expect(component.doctorFecha).toEqual([]);
    })

    it('should recibir cita', () =>{        
        component.recibirCitas(citas[0]);
        expect(component.citas).toEqual(citas[0]);
    })
});


