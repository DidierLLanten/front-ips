import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialidad_medicos } from 'src/app/modelos/especialidades_medico';
import { Paciente } from 'src/app/modelos/paciente';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-encabezado-citas',
  templateUrl: './encabezado-citas.component.html',
  styleUrls: ['./encabezado-citas.component.css'],
})
export class EncabezadoCitasComponent implements OnInit {
  constructor(
    private especialidadService: EspecialidadService,
    private pacienteService: PacienteService
  ) {}

  @Output()
  public filtrar = new EventEmitter<number>;

  @Input()
  rol: string;

  cedula: string;
  especialidades: Especialidad_medicos[] | undefined;
  especialidadSeleccionada: Especialidad_medicos;

  pacienteAux: Paciente;

  ngOnInit() {
    this.cargarEspecialidades();
  }

  buscarPacientePorCedula() {
    this.pacienteService
      .obtenerPacientePorCedula(this.cedula)
      .subscribe((pacienteBuscado) => {
        this.pacienteAux = pacienteBuscado;
      });
  }

  cargarEspecialidades() {
    this.especialidadService.obtenerListaEspecialidad().subscribe((dato) => {
      this.especialidades = dato;
    });
  }

  filtrarPorEspecialidad() {
    this.filtrar.emit(this.especialidadSeleccionada?.id);
  }
}
