import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ChangePasswordDTO } from 'src/app/modelos/changePasswordDTO';
import { Persona } from 'src/app/modelos/persona';
import { Tipos_identificacion } from 'src/app/modelos/tipo_identeficacion';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PersonaService } from 'src/app/services/persona.service';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  cedula: string;

  rol: string;

  tipos_identificacion: Tipos_identificacion[] = [];

  submitted: boolean = false;

  disabledType: boolean = false;

  editar: boolean = false;

  persona: Persona = new Persona();

  typeSelected: Tipos_identificacion;

  contrasenaActual: string;

  contrasenaNueva: string;

  changePassword: ChangePasswordDTO;

  showFormulario: boolean = false;

  constructor(
    private seguridadService: SeguridadService,
    private tipos_identificacionService: TipoIdentificacionService,
    private personaService: PersonaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.rol = this.seguridadService.obtenerRol();
    this.cedula = this.seguridadService.obtenerCampoJWT('sub');
    this.obtenerYCargarTiposIdentificacion();

    this.personaService
      .obtenerPersonaPorNumeroDocumento(this.cedula)
      .subscribe({
        next: (personaBuscada) => {
          this.persona = personaBuscada;
          this.typeSelected = personaBuscada.tipoIdentificacion;
        },
      });
  }

  guardarActualizacionPerfil(): void {
    const personaActualizada: Persona =
      this.actualizarAtributosEditablesPersona(this.persona);
    this.personaService
      .actualizarPersonaPorNumeroDocumento(personaActualizada)
      .subscribe((dato) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Los datos personales han sido modificados correctamente.',
          life: 3000,
        });
      });
  }

  cambiarContrasena(): void {
    this.changePassword = {
      currentPassword: this.contrasenaActual,
      newPassword: this.contrasenaNueva,
    };

    this.personaService
      .cambiarPassword(this.persona.numeroDocumento, this.changePassword)
      .subscribe({
        next: (dato) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'La contraseña ha sido cambiada correctamente.',
            life: 3000,
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Cambiar contraseña',
            detail: 'La contraseña actual incorrecta, por favor verifiquela.',
            life: 3000,
          });
        },
      });
  }

  obtenerYCargarTiposIdentificacion() {
    this.tipos_identificacionService
      .obtenerListaTiposIdentificacion()
      .subscribe((dato) => {
        this.tipos_identificacion = dato;
      });
  }

  actualizarAtributosEditablesPersona(personaOriginal: Persona): Persona {
    const personaActualizada: Persona = new Persona();
    personaActualizada.nombre = personaOriginal.nombre;
    personaActualizada.apellido = personaOriginal.apellido;
    personaActualizada.tipoIdentificacion = personaOriginal.tipoIdentificacion;
    personaActualizada.numeroDocumento = personaOriginal.numeroDocumento;
    personaActualizada.telefono = personaOriginal.telefono;
    personaActualizada.correo = personaOriginal.correo;

    return personaActualizada;
  }

  mostrarFormulario(): boolean {
    return (this.showFormulario = !this.showFormulario);
  }
}
