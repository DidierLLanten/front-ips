import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndiceEncargadosComponent } from './indice-encargados.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';
import { of } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/modelos/usuario';
import { Persona } from 'src/app/modelos/persona';
import { Rol } from 'src/app/modelos/rol';


describe('IndiceEncargadosComponent', () => {
  const roles:Rol[]=[
    {
      codigo: 1,
      nombreRol:{
        id: 1,
        rol: "ADMINISTRADOR"
      }
    },
    {
      codigo: 2,
      nombreRol:{
        id: 2,
        rol: "ENCARGADO"
      }
    }
  ]
  const personas:Persona[] = [
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
        correo:"camilo@gmail.com",
        rol:roles[1]
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
        correo:"didier@gmail.com",
        rol:roles[1]
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
        correo:"luis@gmail.com",
        rol:roles[1]
    }
  ]
  const usuarios:Usuario[]=[
    {
      id:1,
      persona:personas[2],
      cuentaBancaria:"55466265650"
    }
  ]
  let component: IndiceEncargadosComponent;
  let fixture: ComponentFixture<IndiceEncargadosComponent>;
  let mockTipoIdentificacionService: jasmine.SpyObj<TipoIdentificacionService>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>

  beforeEach(async () => {
    mockTipoIdentificacionService = jasmine.createSpyObj('TipoIdentificacionService', ['obtenerListaTiposIdentificacion']);
    mockUsuarioService = jasmine.createSpyObj('UsuarioService',['obtenerListaUsuarios','createUser','actualizarUsuarios','eliminarUsuario']);
    await TestBed.configureTestingModule({
      declarations: [ IndiceEncargadosComponent ],
      imports:[HttpClientModule, PrimeNGModule],
      providers:[
        {provider:TipoIdentificacionService, useValue:mockTipoIdentificacionService},
        {provider:UsuarioService, useValue:mockUsuarioService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndiceEncargadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockTipoIdentificacionService = TestBed.inject(TipoIdentificacionService ) as jasmine.SpyObj<TipoIdentificacionService>;
    mockUsuarioService = TestBed.inject(UsuarioService) as jasmine.SpyObj<UsuarioService>;
  });

  it('should create', () => {
    spyOn(component, 'obtenerUsuarios');
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

  it('should obtener usuarios', () =>{
    const spy = spyOn(mockUsuarioService,'obtenerListaUsuarios');
    spy.and.returnValue(of(usuarios));
    component.obtenerListaUsuarios();
    expect(mockUsuarioService.obtenerListaUsuarios).toHaveBeenCalled();
    //expect(component.usuarios).toEqual(usuarios);
  })

  it('should open new dialog', ()=>{
    component.openNew();
    expect(component.editar).toBeFalse();
    expect(component.usuario).toEqual(new Usuario());
    expect(component.submitted).toBeFalse();
    expect(component.productDialog).toBeTrue();
    expect(component.disabledType).toBeFalse();
 });

  it('should verificar campos and return false when the fields are empty', ()=>{
    component.verificarCampos();
    expect(component.verificarCampos()).toEqual(false);  
  });

  it('should verificar campos and return true when the fields are not empty', ()=>{
    component.usuario.persona= personas[0];
    component.verificarCampos();
    expect(component.verificarCampos()).toEqual(true);  
  });

  it('should guardar usuario (Crear un usuario nuevo)',()=>{
    component.editar= false;
    component.usuario.persona = personas[2];
    spyOn(component, 'verificarCampos').and.returnValue(true);
    spyOn(mockUsuarioService, 'createUser').and.returnValue(of(usuarios[0]));
    spyOn(component, 'obtenerUsuarios');
    component.guardarUsuario();
    expect(mockUsuarioService.createUser).toHaveBeenCalled();
    expect(component.usuario).toEqual(new Usuario());
    expect(component.productDialog).toBeFalse();
 });

  it('should guardar usuario (Editar usuario existente)',()=>{
    component.editar= true;
    component.usuarioEditado= usuarios[0];
    spyOn(component, 'verificarCampos').and.returnValue(true);
    spyOn(mockUsuarioService, 'actualizarUsuarios').and.returnValue(of(usuarios[0]));
    spyOn(component, 'obtenerUsuarios');
    component.guardarUsuario();
    expect(mockUsuarioService.actualizarUsuarios).toHaveBeenCalled();
    expect(component.productDialog).toBeFalse();
    expect(component.editar).toBeFalse();
  });

  it('should call editar usuario dialog',()=>{
    component.editarUsuario(usuarios[0]);
    expect(component.usuario).toEqual(usuarios[0]);
    expect(component.usuarioEditado).toEqual(usuarios[0]);
    expect(component.editar).toBeTrue();
    expect(component.disabledType).toBeTrue();
    expect(component.productDialog).toBeTrue();      
  });

  it('should eliminar usuario',()=>{
    spyOn(mockUsuarioService, 'eliminarUsuario').and.returnValue(of(usuarios[0])); 
    component.eliminarUsuario(usuarios[0]);      
  });

  it('should hide dialog',()=>{
    component.hideDialog();
    expect(component.productDialog).toBeFalse();
    expect(component.submitted).toBeFalse();
    expect(component.usuario).toEqual(new Usuario());
  });

  it('should find index by id', () =>{
    component.usuarios = usuarios;
    component.findIndexById(1);
    expect(component.findIndexById(1)).toEqual(0);
  });
});