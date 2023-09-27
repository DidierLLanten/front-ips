import { Component, EventEmitter, Output } from '@angular/core';
import { Especialidad_medicos } from 'src/app/modelos/especialidades_medico';
import { Medico } from 'src/app/modelos/medico';
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
    private medicoService: MedicoService
  ) {}

  @Output()
  public doctorFecha = new EventEmitter<object[]>();

  ngOnInit() {
    this.cargarEspecialidades();
  }

  especialidades: Especialidad_medicos[] | undefined;
  especialidadSeleccionada: Especialidad_medicos;

  medicosEspecialistasOriginal: Medico[];
  medicoSeleccionado: Medico;

  fechaActual: Date = new Date();
  fechaSeleccionada: Date;

  cargarEspecialidades() {
    this.especialidadService.obtenerListaEspecialidad().subscribe((dato) => {
      this.especialidades = dato;
    });
  }

  filtrarPorEspecialidad() {
    this.cargarMedicos();
  }

  cargarMedicos() {
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

  enviarMedicoFecha() {
    const medicoFecha: object[] = [
      this.medicoSeleccionado,
      this.fechaSeleccionada,
    ];

    this.doctorFecha.emit(medicoFecha);
  }
}
