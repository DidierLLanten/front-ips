import { Component, EventEmitter, Output } from '@angular/core';
import { Cita } from 'src/app/modelos/cita';
import { Especialidad_medicos } from 'src/app/modelos/especialidades_medico';
import { Medico } from 'src/app/modelos/medico';
import { CitaService } from 'src/app/services/cita.service';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-encabezado-crear-citas',
  templateUrl: './encabezado-crear-citas.component.html',
  styleUrls: ['./encabezado-crear-citas.component.css'],
})
export class EncabezadoCrearCitasComponent {
  constructor(
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private citaService: CitaService
  ) {}

  @Output()
  public doctorFecha = new EventEmitter<object[]>();

  @Output()
  citas = new EventEmitter<Cita[]>();

  ngOnInit() {
    this.cargarEspecialidades();
  }

  especialidades: Especialidad_medicos[] | undefined;
  especialidadSeleccionada: Especialidad_medicos;

  medicosEspecialistasOriginal: Medico[];
  medicoSeleccionado: Medico;

  fechaActual: Date = new Date();
  fechaSeleccionada: Date | undefined;

  citasCargadas: Cita[];

  cargarEspecialidades() {
    this.especialidadService.obtenerListaEspecialidad().subscribe((dato) => {
      this.especialidades = dato;
    });
  }

  filtrarPorEspecialidad() {
    this.medicoSeleccionado = new Medico();
    this.cargarMedicosPorEspecialidad();
    this.fechaSeleccionada = undefined;
    this.doctorFecha.emit();
  }

  cargarMedicosPorEspecialidad() {
    this.medicoService
      .obtenerMedicosPorIdEspecialidad(this.especialidadSeleccionada.id)
      .subscribe((medicos) => {
        this.medicosEspecialistasOriginal = medicos;
        this.medicosEspecialistasOriginal = medicos.map((medico) => ({
          ...medico,
          apellidoNombre: medico.persona.apellido + ' ' + medico.persona.nombre,
        }));
      });
  }

  listarCitas() {
    if (this.fechaSeleccionada) {
      const dateIsoString = this.fechaSeleccionada.toISOString().split('T')[0];
      this.citaService
        .obtenerCitasPorDoctorFecha(
          this.medicoSeleccionado.id,
          dateIsoString
        )
        .subscribe((dato) => {
          console.log('Citas Api: ', dato);
          if (dato === null) {
            this.citasCargadas = [];
          } else {
            this.citasCargadas = dato;
          }
          this.citas.emit(this.citasCargadas);
        });
    }
  }

  enviarMedicoFechaCitas() {
    if (this.fechaSeleccionada) {
      this.listarCitas();
      const medicoFecha: object[] = [
        this.medicoSeleccionado,
        this.fechaSeleccionada,
      ];
      this.doctorFecha.emit(medicoFecha);
    }
  }

  onMedicoSeleccionadoChange(event: any) {
    this.medicoSeleccionado = event.value;
  }
}
