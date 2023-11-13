import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndiceDoctoresComponent } from './indice-doctores.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';
import { of } from 'rxjs';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';
import { MedicoService } from 'src/app/services/medico.service';
import { Medico } from 'src/app/modelos/medico';


describe('IndiceDoctoresComponent', () => {
    
    let especialidades:any[]=[
        {
            id:1,
            especialidad:"Medico General"
        },
        {
            id:2,
            especialidad:"Cardiologo"
        }
    ]

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
    ]

    let medicos:any[]=[
        {
            id:1,
            persona:personas[0],
            especialidad:especialidades[0],
            tarjetaProfesional: "No se que tiene una tarjeta profesional"
        }
    ]
    let component: IndiceDoctoresComponent;
    let fixture: ComponentFixture<IndiceDoctoresComponent>;
    let mockEspecialidadesMedico: jasmine.SpyObj<EspecialidadService>
    let mockTipoIdentificacionService: jasmine.SpyObj<TipoIdentificacionService>;
    let mockMedicoService: jasmine.SpyObj<MedicoService>;

    beforeEach(async () => {
        mockEspecialidadesMedico = jasmine.createSpyObj('EspecialidadService',['obtenerListaEspecialidad']);
        mockTipoIdentificacionService = jasmine.createSpyObj('TipoIdentificacionService', ['obtenerListaTiposIdentificacion']);
        mockMedicoService = jasmine.createSpyObj('MedicoService', ['obtenerListaMedico']);
        await TestBed.configureTestingModule({
        declarations: [ IndiceDoctoresComponent ],
        imports:[HttpClientModule, PrimeNGModule],
        providers:[
            {provider:EspecialidadService, useValue:mockEspecialidadesMedico},
            {provider:TipoIdentificacionService, useValue:mockTipoIdentificacionService},
            {provider:MedicoService, useValue:mockMedicoService}
        ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(IndiceDoctoresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        mockEspecialidadesMedico = TestBed.inject(EspecialidadService) as jasmine.SpyObj<EspecialidadService>;
        mockTipoIdentificacionService = TestBed.inject(TipoIdentificacionService ) as jasmine.SpyObj<TipoIdentificacionService>;
        mockMedicoService = TestBed.inject(MedicoService) as jasmine.SpyObj<MedicoService>;
    });

    it('should create', () => {
        spyOn(component, 'obtenerMedicos');
        expect(component).toBeTruthy();
    });

    it('should obtener listado de especialidades', () =>{
        const spy = spyOn(mockEspecialidadesMedico, 'obtenerListaEspecialidad');
        spy.and.returnValue(of(especialidades));
        component.obtenerEspecialidades();
        expect(mockEspecialidadesMedico.obtenerListaEspecialidad).toHaveBeenCalled();
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

    it('should obtener listado de medicos', () =>{
        const spy = spyOn(mockMedicoService, 'obtenerListaMedico');
        spy.and.returnValue(of(medicos));
        component.obtenerListaMedicos();
        expect(mockMedicoService.obtenerListaMedico).toHaveBeenCalled();
    });

    it('should open new dialog', ()=>{
        component.openNew();
        expect(component.editar).toBeFalse();
        expect(component.medico).toEqual(new Medico());
        expect(component.submitted).toBeFalse();
        expect(component.productDialog).toBeTrue();
        expect(component.disabledType).toBeFalse();
    });

    it('should verificar campos and return false when the fields are empty', ()=>{
        component.verificarCampos();
        expect(component.verificarCampos()).toEqual(false);  
    });
    
    it('should verificar campos and return true when the fields are not empty', ()=>{
        component.medico.persona = personas[0];
        component.medico.tarjetaProfesional = "123123123342";
        component.verificarCampos();
        expect(component.verificarCampos()).toEqual(true);  
    });

    it('should guardar medico (Crear un medico nuevo)',()=>{
        component.editar= false;
        component.medico.persona = personas[0];
        spyOn(component, 'verificarCampos').and.returnValue(true);
        spyOn(mockMedicoService, 'createMedico').and.returnValue(of(medicos[0]));
        spyOn(component, 'obtenerMedicos');
        component.guardarMedico();
        expect(mockMedicoService.createMedico).toHaveBeenCalled();
        expect(component.productDialog).toBeFalse();
        expect(component.medico).toEqual(new Medico());
    });

    it('should guardar medico (Editar medico existente)',()=>{
        component.editar= true;
        component.medicoEditado= medicos[0];
        spyOn(component, 'verificarCampos').and.returnValue(true);
        spyOn(mockMedicoService, 'actualizarMedico').and.returnValue(of(medicos[0]));
        spyOn(component, 'obtenerMedicos');
        component.guardarMedico();
        expect(mockMedicoService.actualizarMedico).toHaveBeenCalled();
        expect(component.productDialog).toBeFalse();
        expect(component.editar).toBeFalse();
    });

    it('should call editar medico dialog',()=>{
        component.editarMedico(medicos[0]);
        expect(component.medico).toEqual(medicos[0]);
        expect(component.medicoEditado).toEqual(medicos[0]);
        expect(component.editar).toBeTrue();
        expect(component.disabledType).toBeTrue();
        expect(component.productDialog).toBeTrue();      
    });

    it('should eliminar medico',()=>{
        spyOn(component, 'obtenerMedicos');
        spyOn(mockMedicoService, 'eliminarMedico').and.returnValue(of(medicos[0])); 
        component.deleteMedico(medicos[0]);      
    });

    it('should hide dialog',()=>{
        component.hideDialog();
        expect(component.productDialog).toBeFalse();
        expect(component.submitted).toBeFalse();
        expect(component.medico).toEqual(new Medico());
    });

    it('should find index by id', () =>{
        component.medicos = medicos;
        component.findIndexById(1);
        expect(component.findIndexById(1)).toEqual(0);  
    });
});