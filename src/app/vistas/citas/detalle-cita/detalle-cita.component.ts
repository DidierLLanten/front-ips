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

  citasEncontradas: Cita[] | undefined;
  cedula: string;
  estadosCita = {
    POR_AGENDAR: 1,
    DISPONIBLE: 2,
    ASIGNADA: 3,
    CONFIRMADA: 4,
    CANCELADA: 5,
  };

  buscarCitaPorCedula() {
    this.citaService
      .obtenerCitasPorCedulaYIdEstadoCita(this.cedula, this.estadosCita.ASIGNADA)
      .subscribe((dato) => {
        if (dato.length == 0) {
          this.citasEncontradas = undefined;
          this.messageService.add({
            severity: 'info',
            summary: 'No encontrada',
            detail: 'El paciente no tiene citas asignadas',
            life: 3000,
          });
        } else {
          this.citasEncontradas = dato;
        }
      });
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
