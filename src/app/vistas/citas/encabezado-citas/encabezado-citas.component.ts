import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
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
    private pacienteService: PacienteService,
    private messageService: MessageService
  ) {}

  @Output()
  public filtrar = new EventEmitter<number>();

  @Output()
  public paciente = new EventEmitter<Paciente>();

  @Input()
  rol: string;

  cedula: string;
  especialidades: Especialidad_medicos[] | undefined;
  especialidadSeleccionada: Especialidad_medicos;

  pacienteAux?: Paciente;

  ngOnInit() {
    this.cargarEspecialidades();
  }

  buscarPacientePorCedula() {
    if (!this.cedula) {
      this.messageService.add({
        severity: 'error',
        summary: 'Número de documento',
        detail: 'Por favor ingrese un número de documento',
        life: 3000,
      });
      return;
    }
    this.pacienteService.obtenerPacientePorCedula(this.cedula).subscribe({
      next: (pacienteBuscado) => {
        this.pacienteAux = pacienteBuscado;
        this.enviarPersona();
      },
      error: (error) => {
        if (error.status === 404) {
          this.pacienteAux = undefined;
          this.messageService.add({
            severity: 'info',
            summary: 'No encontrado',
            detail:
              'No existe un paciente con el número de documento ' + this.cedula,
            life: 3000,
          });          
        } else {
          console.log('Ocurrió un error al buscar el paciente:', error);
        }
      },
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

  enviarPersona() {    
    this.paciente.emit(this.pacienteAux);
  }
}
