import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelos/persona';
import { Tipos_identificacion } from 'src/app/modelos/tipo_identeficacion';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(
    private seguridadService: SeguridadService,
    private tipos_identificacionService: TipoIdentificacionService,
    private pacienteService: PacienteService,
    private trabajadorService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.rol = this.seguridadService.obtenerRol();
    this.cedula = this.seguridadService.obtenerCampoJWT('sub');
    this.obtenerYCargarTiposIdentificacion();

    if (this.rol == 'PACIENTE') {
      this.pacienteService.obtenerPacientePorCedula(this.cedula).subscribe({
        next: (pacienteBuscado) => {
          this.persona = pacienteBuscado.persona;
          this.typeSelected = pacienteBuscado.persona.tipoIdentificacion;
          console.log(pacienteBuscado.persona);
        },
      });
    } else {
      // this.trabajadorService.obtenerPorCedula(this.cedula).subscribe({
      //   next: (trabajadorBuscado) => {
      //     this.personaActual = trabajadorBuscado;
      //   },
      // });
    }
  }

  guardarActualizacionPerfil(): void {
    const personaActualizada: Persona = this.actualizarAtributosEditablesPersona(this.persona);
    // this.pacienteService
    //   .actualizarPaciente(this.paciente.id, pacienteActualizado)
    //   .subscribe((dato) => {});
  }

  cambiarContrasena(): void {
    console.log(
      'Verificar si la contraseña actual es la correcta, y actualizar la contraseña' +
        this.contrasenaActual +
        ' >-< ' +
        this.contrasenaNueva
    );
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
}
