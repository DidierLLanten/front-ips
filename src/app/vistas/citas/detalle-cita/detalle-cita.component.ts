import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cita } from 'src/app/modelos/cita';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css'],
  providers: [MessageService],
})
export class DetalleCitaComponent {
  constructor(
    private citaService: CitaService,
    private messageService: MessageService
  ) {}

  citaEncontrada: Cita;
  cedula: string;

  buscarCitaPorCedula() {
    console.log('Buscada');
    this.citaService
      .obtenerCitasPorCedulaYIdEstadoCita(this.cedula, 3)
      .subscribe((dato) => {
        console.log('Citas: ', dato);
        this.citaEncontrada = dato[0];
        if (dato.length == 0) {
          this.messageService.add({
            severity: 'info',
            summary: 'No encontrada',
            detail: 'El paciente no tiene citas asignadas',
            life: 3000,
          });
        }
      });

    // this.citaEncontrada = {
    //   codigo: 4,
    //   paciente: {
    //     idPaciente: 8,
    //     persona: {
    //       codigo: 11,
    //       nombre: 'Kelwin',
    //       apellido: 'Durrington',
    //       tipo_identificacion: {
    //         codigo: 2,
    //         tipo: 'Tarjeta de identidad',
    //       },
    //       numero_documento: '6498439841',
    //       telefono: '3519980861',
    //       correo: 'kdurrington1@nymag.com',
    //     },
    //     eps: {
    //       id: 3,
    //       nombre: 'Coomeva',
    //       nit: '56465466',
    //     },
    //   },
    //   medico: {
    //     idMedico: 14,
    //     persona: {
    //       codigo: 109,
    //       nombre: 'Kylie',
    //       apellido: 'Fricke',
    //       tipo_identificacion: {
    //         codigo: 1,
    //         tipo: 'Cedula de ciudadania',
    //       },
    //       numero_documento: '1153708701',
    //       telefono: '9314201571',
    //       correo: 'kfricke2r@ask.com',
    //     },
    //     especialidadMedico: {
    //       id: 2,
    //       nombre: 'NUTRICIONISTA',
    //     },
    //     tarjetaProfesional: '77640',
    //   },
    //   fecha: new Date('2023-09-28T19:30:00'),
    //   estadoCita: {
    //     id: 3,
    //     nombre: 'ASIGNADA',
    //   },
    // };
  }

  getColorTagEstado(estado: string | undefined): string {
    switch (estado) {
      case 'DISPONIBLE':
        return 'success';
      case 'CANCELADA':
        return 'danger';
      case 'ASIGNADA':
        return 'warning';
      case 'CONFIRMADA':
        return 'info';
      default:
        return 'danger';
    }
  }
}
