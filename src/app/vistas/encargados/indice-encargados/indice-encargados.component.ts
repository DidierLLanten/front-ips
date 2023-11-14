import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Nombre_rol } from 'src/app/modelos/nombre_rol';
import { Rol } from 'src/app/modelos/rol';
import { Tipos_identificacion } from 'src/app/modelos/tipo_identeficacion';
import { Usuario } from 'src/app/modelos/usuario';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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

  delete: string = 'Eliminar';

  selectedProducts!: Usuario[] | null;

  submitted: boolean = false;

  statuses!: any[];

  editar: boolean = false;
  usuarioEditado: Usuario;

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

  obtenerTiposIdentificacion() {
    this.tipos_identificacionService
      .obtenerListaTiposIdentificacion()
      .subscribe((dato) => {
        this.tipos_identificacion = dato;
        this.tipos_identificacion = this.tipos_identificacion.filter(
          (tipo) => tipo.codigo != 2
        );
      });
  }

  obtenerUsuarios() {
    let timerInterval: any;
    Swal.fire({
      title: 'Por favor espere mientras\n' + 'cargamos a los encargados',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()!.querySelector('b');
        timerInterval = setInterval(() => {
          if (timer) {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }
        }, 100);
        this.obtenerListaUsuarios();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {        
      }
    });
  }

  obtenerListaUsuarios(){
    this.usuarioService.obtenerListaUsuarios().subscribe((dato) => {
      this.usuarios = dato;
      this.usuarios = this.usuarios.filter(
      (trabajador) => trabajador.persona.rol.nombreRol.rol === 'ENCARGADO'
      );
    });
  }

  openNew() {
    this.editar = false;
    this.usuario = new Usuario();
    this.submitted = false;
    this.productDialog = true;
    this.disabledType = false;
  }

  verificarCampos(): boolean {
    if (
      this.usuario.persona.nombre &&
      this.usuario.persona.apellido &&
      this.usuario.persona.numeroDocumento &&
      this.usuario.persona.telefono &&
      this.usuario.persona.correo
    ) {
      return true;
    }
    return false;
  }

  guardarUsuario() {
    this.submitted = true;
    if (this.editar) {
      this.usuario = this.usuarioEditado;
      const validarCampos = this.verificarCampos();
      if (validarCampos) {
        const encargadoActualizado: Usuario = this.actualizarAtributosEditablesEncargado(this.usuario);

        this.usuarioService
          .actualizarUsuarios(this.usuario.id, encargadoActualizado)
          .subscribe((dato) => {
            this.obtenerUsuarios();
          });
        this.editar = false;
        this.productDialog = false;
      }
    } else {
      const validarCampos = this.verificarCampos();
      if (validarCampos) {
        if (this.usuario.persona.nombre?.trim()) {
          if (this.usuario.id) {
            this.usuarios[this.findIndexById(this.usuario.id)] =
              this.usuario;
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Encargado creado',
              life: 1000,
            });
          } else {
            this.rol.codigo = 2;
            this.usuario.persona.rol = this.rol;
            this.usuario.persona.tipoIdentificacion = this.typeSelected;
            this.usuarioService.createUser(this.usuario).subscribe((dato) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Exitoso',
                detail: 'Encargado creado',
                life: 1000,
              });
              this.obtenerUsuarios();
              this.usuario = new Usuario();
            });
          }
          this.usuario;
        }
        this.productDialog = false;
      }
    }
  }

  actualizarAtributosEditablesEncargado(encargadoOriginal: Usuario): Usuario {
    const encargadoActualizado: Usuario = new Usuario();
    encargadoActualizado.cuentaBancaria = encargadoOriginal.cuentaBancaria;
    encargadoActualizado.persona.nombre = encargadoOriginal.persona.nombre;
    encargadoActualizado.persona.apellido = encargadoOriginal.persona.apellido;
    encargadoActualizado.persona.telefono = encargadoOriginal.persona.telefono;
    encargadoActualizado.persona.correo = encargadoOriginal.persona.correo;

    return encargadoActualizado;
  }

  editarUsuario(usuario: Usuario) {
    this.usuario = usuario;
    this.usuarioEditado = usuario;
    this.editar = true;
    this.disabledType = true;
    this.productDialog = true;
  }

  eliminarUsuario(usuario: Usuario) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar a ' + usuario.persona.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService
          .eliminarUsuario(usuario.id)
          .subscribe((dato) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Encargado eliminado',
              life: 1000,
            });
            this.obtenerUsuarios();
          });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.usuario = new Usuario();
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
