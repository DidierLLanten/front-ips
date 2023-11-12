import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cita } from 'src/app/modelos/cita';
import { CitaService } from 'src/app/services/cita.service';
import { EncabezadoCitasComponent } from '../encabezado-citas/encabezado-citas.component';
import { Paciente } from 'src/app/modelos/paciente';
import Swal from 'sweetalert2';
import { HistorialCitaService } from 'src/app/services/historialCita.service';
import { HistorialCita } from 'src/app/modelos/historialCita';
import { Estado_cita } from 'src/app/modelos/estado_cita';

@Component({
  selector: 'app-tabla-citas',
  templateUrl: './tabla-citas.component.html',
  styleUrls: ['./tabla-citas.component.css'],
  providers: [MessageService],
})
export class TablaCitasComponent implements OnInit, OnChanges {
  @ViewChild('encabezado')
  public encabezado: EncabezadoCitasComponent;

  @Input()
  idEspecialidad: number;

  @Input()
  paciente: Paciente;

  citaSeleccionada: Cita;

  citas: Cita[];

  nombreMedico: string;

  cita: any;

  visible: boolean = false;

  historialCita: HistorialCita = new HistorialCita();

  estadoCita: Estado_cita = new Estado_cita();

  constructor(
    private citaService: CitaService,
    private messageService: MessageService,
    private historialCitaService: HistorialCitaService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.cargarTablaPorEspecialidades();
  }

  ngOnInit() {}

  showDialog(cita: Cita) {
    console.log(this.paciente);
    this.visible = true;
    this.citaSeleccionada = cita;
  }

  confirmarCita() {
    let cita = new Cita();
    cita.id = this.citaSeleccionada.id;
    this.estadoCita.id = 3;
    this.historialCita.cambio = 'CAMBIO_ESTADO';
    this.historialCita.cita = cita;
    this.historialCita.estadoActual = this.estadoCita;
    this.historialCita.estadoAnterior = this.citaSeleccionada.estadoCita;
    this.historialCita.fechaModificacion = '';
    this.historialCita.horaModificacion = '';
    this.historialCitaService
      .crearHistorialCita(this.historialCita)
      .subscribe((dato) => {
        console.log('Me registro el historial', dato);
      });
    this.citaService
      .actualizarEstadoCita(this.citaSeleccionada.id, 3)
      .subscribe((dato) => {
        this.citaService
          .actualizarPacienteCita(this.citaSeleccionada.id, this.paciente.id)
          .subscribe((dato2) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Cita confirmada',
              life: 1000,
            });
            this.cargarTablaPorEspecialidades();
          });
      });
    this.visible = false;
  }

  buscarMedico() {
    let timerInterval: any;
    Swal.fire({
      title: 'Por favor espere mientras\n' + 'cargamos las citas',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()!.querySelector('b');
        if (this.nombreMedico != '' && this.nombreMedico != undefined) {
          console.log(this.nombreMedico);
          this.citaService
            .obtenerPorMedico(this.idEspecialidad, this.nombreMedico)
            .subscribe((dato) => {
              this.citas = dato;
              console.log(this.citas);
            });
        } else {
          this.cargarTablaPorEspecialidades();
        }
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

  cargarTablaPorEspecialidades() {
    let timerInterval: any;
    Swal.fire({
      title: 'Por favor espere mientras\n' + 'cargamos las citas',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()!.querySelector('b');
        this.citaService
          .obtenerPorEspecialidad(this.idEspecialidad)
          .subscribe((dato) => {
            this.citas = dato;
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
}
