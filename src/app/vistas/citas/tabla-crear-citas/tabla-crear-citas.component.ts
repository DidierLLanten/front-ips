import { Component, Input, SimpleChanges } from '@angular/core';
import { Cita } from 'src/app/modelos/cita';
import { Medico } from 'src/app/modelos/medico';
import { Paciente } from 'src/app/modelos/paciente';
import { CitaService } from 'src/app/services/cita.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tabla-crear-citas',
  templateUrl: './tabla-crear-citas.component.html',
  styleUrls: ['./tabla-crear-citas.component.css'],
  providers: [MessageService],
})
export class TablaCrearCitasComponent {
  constructor(
    private citaService: CitaService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {}

  @Input()
  doctorFecha: any[];
  @Input()
  citas: Cita[];

  citasActualizadas: any;

  medico: Medico;
  fecha: Date;

  citaSeleccionada: Cita;
  mostrarConfirmacion: boolean;

  medicoAux: Medico = new Medico();

  ngOnChanges(changes: SimpleChanges): void {
    this.medico = this.doctorFecha[0];
    this.fecha = this.doctorFecha[1];
    if (this.citas.length < 24) {
      this.citasActualizadas = this.generarCitasFaltantes(this.citas);
      this.ordenarCitasPorHora(this.citasActualizadas);
      this.citas = this.citasActualizadas;
    }
  }

  listarCitasPorFecha(): void {
    const dateIsoString = this.fecha.toISOString().split('T')[0];

    this.citaService
      .obtenerCitasPorDoctorFecha(this.medico.idMedico, dateIsoString)
      .subscribe((dato) => {
        this.citas = dato;
        this.citasActualizadas = this.generarCitasFaltantes(this.citas);
        this.ordenarCitasPorHora(this.citasActualizadas);
        this.citas = this.citasActualizadas;
      });
  }

  // Función para generar citas faltantes en un rango de tiempo
  generarCitasFaltantes(citas: Cita[]) {
    const horaInicioManana = 8 * 60; // 8:00 AM en minutos
    const horaFinManana = 12 * 60; // 12:00 PM en minutos
    const horaInicioTarde = 14 * 60; // 2:00 PM en minutos
    const horaFinTarde = 18 * 60; // 6:00 PM en minutos
    const duracionCita = 20; // Duración de cada cita en minutos

    // Crear un objeto de citas disponibles para el rango de tiempo de la mañana
    const citasManana = [];
    for (
      let hora = horaInicioManana;
      hora < horaFinManana;
      hora += duracionCita
    ) {
      const fechaCita = new Date(this.fecha);
      fechaCita.setHours(Math.floor(hora / 60), hora % 60, 0, 0);

      // Verificar si la cita ya existe en el arreglo original de citas
      const citaExistente = citas.find((cita) => {
        cita.fecha = new Date(cita.fecha);
        const horaCitaExistente = cita.fecha.getHours();
        const minutoCitaExistente = cita.fecha.getMinutes();
        return (
          horaCitaExistente === fechaCita.getHours() &&
          minutoCitaExistente === fechaCita.getMinutes()
        );
      });

      //agregarCita al arreglo de citas
      if (!citaExistente) {
        citasManana.push({
          paciente: new Paciente(),
          medico: this.medico,
          fecha: fechaCita,
          estadoCita: {
            id: 1,
            nombre: 'DISPONIBLE',
          },
        });
      }
    }

    // Repetir el proceso para el rango de tiempo de la tarde
    const citasTarde = [];
    for (
      let hora = horaInicioTarde;
      hora < horaFinTarde;
      hora += duracionCita
    ) {
      const fechaCita = new Date(this.fecha);
      fechaCita.setHours(Math.floor(hora / 60), hora % 60, 0, 0);

      const citaExistente = citas.find((cita) => {
        // cita.fecha = new Date(cita.fecha);
        const horaCitaExistente = cita.fecha.getHours();
        const minutoCitaExistente = cita.fecha.getMinutes();
        return (
          horaCitaExistente === fechaCita.getHours() &&
          minutoCitaExistente === fechaCita.getMinutes()
        );
      });

      //agregar cita al arreglo de citas
      if (!citaExistente) {
        citasTarde.push({
          // codigo: citasTarde.length + 1, // Puedes ajustar la lógica para asignar códigos únicos
          paciente: new Paciente(),
          medico: this.medico,
          fecha: fechaCita,
          estadoCita: {
            id: 1,
            nombre: 'DISPONIBLE',
          },
        });
      }
    }

    // Combinar las citas generadas con las citas originales y devolver el resultado
    return [...citas, ...citasManana, ...citasTarde];
  }

  // Definición de la función para ordenar citas por hora
  ordenarCitasPorHora(citas: Cita[]) {
    // Utilizamos la función sort con un comparador personalizado
    citas.sort((citaA, citaB) => {
      // Obtenemos las horas y minutos de cada cita

      const horaA = citaA.fecha.getHours();
      const minutoA = citaA.fecha.getMinutes();
      const horaB = citaB.fecha.getHours();
      const minutoB = citaB.fecha.getMinutes();

      // Comparamos las horas y, si son iguales, comparamos los minutos
      if (horaA < horaB) {
        return -1;
      } else if (horaA > horaB) {
        return 1;
      } else {
        // Las horas son iguales, comparamos los minutos
        if (minutoA < minutoB) {
          return -1;
        } else if (minutoA > minutoB) {
          return 1;
        } else {
          return 0; // Las citas tienen la misma hora y minutos
        }
      }
    });
  }

  getColorTagEstado(estado: string): string {
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

  mostrarModalConfirmacion(cita: Cita) {
    this.mostrarConfirmacion = true;
    this.citaSeleccionada = cita;
  }

  crearCita(fecha: Date) {
    const fechaFormateada = this.datePipe.transform(
      fecha,
      'yyyy-MM-ddTHH:mm:ss'
    );

    const datosCita = {
      medico: {
        idMedico: this.doctorFecha[0].idMedico,
      },
      fecha: fechaFormateada,
      estadoCita: {
        id: 1,
      },
    };

    this.citaService.crearCitaDoctor(datosCita).subscribe((dato) => {
      this.listarCitasPorFecha();
      this.messageService.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Cita creada',
        life: 3000,
      });
      this.mostrarConfirmacion = false;
    });
  }

  eliminarCita(cita: Cita) {
    alert(
      'Trabajando en la implementacion de esta FUNCIONALIDAD para las citas. ' +
        '\n\n' +
        'Cita Seleccionada: ' +
        '\n' +
        cita.fecha
    );
  }
}
