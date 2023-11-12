import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Cita } from 'src/app/modelos/cita';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { CitaService } from 'src/app/services/cita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css'],
  providers: [MessageService],
})
export class DetalleCitaComponent implements OnInit {
  constructor(
    private citaService: CitaService,
    private messageService: MessageService,
    private seguridadService: SeguridadService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.rol = this.seguridadService.obtenerCampoJWT('rol')
     if(this.rol == "PACIENTE"){
       this.cedula = this.seguridadService.obtenerCampoJWT('sub');
       this.buscarCitaPorCedula();
     }
  }
  rol: string;
  citasEncontradas: Cita[] | undefined;
  cedula: string;
  estadosCita = {
    POR_AGENDAR: 1,
    DISPONIBLE: 2,
    ASIGNADA: 3,
    CONFIRMADA: 4,
    CANCELADA: 5,
  };
  
  confirmCancellation(cita:Cita) {
    this.confirmationService.confirm({
      message: '¿Deseas cancelar esta cita?',
      header: 'Cancelar cita',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          console.log(cita);
          this.messageService.add({ severity: 'success', summary: 'Cancelada', detail: 'Esta cita se ha cancelado' });
      },
    });
  }

  confirm(cita:Cita) {
    this.confirmationService.confirm({
      message: '¿Deseas confirmar esta cita?',
      header: 'Confirmar cita',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          console.log(cita);
          this.messageService.add({ severity: 'success', summary: 'Confirmada', detail: 'La cita de este paciente se ha confirmado' });
      },
    });
  }




  buscarCitaPorCedula() {
    let timerInterval: any;
    Swal.fire({
      title: 'Por favor espere mientras\n' + 'cargamos los detalles\n'+ 'de la cita',
      html: 'Tiempo restante: <b></b>',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()!.querySelector('b');
        timerInterval = setInterval(() => {
          timer!.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
        this.citaService
          .obtenerCitasPorCedulaYIdEstadoCita(
            this.cedula,
            this.estadosCita.ASIGNADA
          )
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
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
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
