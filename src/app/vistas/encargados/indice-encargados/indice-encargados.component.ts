import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Nombre_rol } from 'src/app/modelos/nombre_rol';
import { Rol } from 'src/app/modelos/rol';
import { Tipos_identificacion } from 'src/app/modelos/tipo_identeficacion';
import { Usuario } from 'src/app/modelos/usuario';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-indice-encargados',
  templateUrl: './indice-encargados.component.html',
  styleUrls: ['./indice-encargados.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class IndiceEncargadosComponent implements OnInit {

  productDialog: boolean = false;

  usuarios: Usuario[] = [];

  tipos_identificacion: Tipos_identificacion[] = [];

  disabledType: boolean = false;

  typeSelected: Tipos_identificacion;

  nombreRol: Nombre_rol = new Nombre_rol();

  rol: Rol = new Rol();

  usuario: Usuario = new Usuario();

  delete: string = "Eliminar";

  selectedProducts!: Usuario[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private usuarioService: UsuarioService,
    private tipos_identificacionService: TipoIdentificacionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerTiposIdentificacion();
  }

  obtenerTiposIdentificacion(){
    this.tipos_identificacionService.obtenerListaTiposIdentificacion().subscribe(dato=>{
      this.tipos_identificacion = dato;
      this.tipos_identificacion = this.tipos_identificacion.filter((tipo) => tipo.codigo != 2);
    });
  }

  obtenerUsuarios(){
    this.usuarioService.obtenerListaUsuarios().subscribe(dato=>{
      this.usuarios = dato;
      this.usuarios = this.usuarios.filter((usuario) => usuario.rol.codigo == 2);
    });
  }

  openNew() {
    this.usuario;
    this.submitted = false;
    this.productDialog = true;
    this.disabledType = false;
  }

  guardarUsuario() {
    this.submitted = true;
    if (this.usuario.persona.nombre?.trim()) {
      if (this.usuario.idUsuario) {
        this.usuarios[this.findIndexById(this.usuario.idUsuario)] = this.usuario;
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Encargado creado',
          life: 1000,
        });
      } else {
        this.rol.codigo = 2;
        this.usuario.rol = this.rol;
        this.usuario.persona.tipo_identificacion = this.typeSelected;
        this.usuarioService.createUser(this.usuario).subscribe(dato => {
          this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Encargado creado',
          life: 1000,
        });
        this.obtenerUsuarios();
        this.usuario = new Usuario();
        })        
      }
      this.productDialog = false;
      this.usuario;
    }
  }

  editarUsuario(usuario: Usuario) {
    this.disabledType = true;
    this.usuario = {...usuario};
    this.usuarioService.actualizarUsuarios(this.usuario.idUsuario, this.usuario).subscribe(dato => {
      this.obtenerUsuarios();
    })    
    this.productDialog = true;
  }

  eliminarUsuario(usuario: Usuario) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar a ' + usuario.persona.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.eliminarUsuario(usuario.idUsuario).subscribe(dato => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Encargado eliminado',
            life: 1000,
          });
          this.obtenerUsuarios();
        })        
      },
    });
  }

  /*deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarios = this.usuarios.filter(
          (val) => !this.selectedProducts?.includes(this.usuario)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }*/  

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.usuario = new Usuario();
  }  

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].idUsuario === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
