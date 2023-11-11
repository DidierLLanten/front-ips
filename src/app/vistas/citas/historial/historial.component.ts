import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Especialidad_medicos } from 'src/app/modelos/especialidades_medico';
import { HistorialCita } from 'src/app/modelos/historialCita';
import { Medico } from 'src/app/modelos/medico';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';
import { HistorialCitaService } from 'src/app/services/historialCita.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {

  public numeroDocumento: string;

  public selectedDate: Date | undefined;
  public mostrarAlerta: boolean = false;

  public especialidades: Especialidad_medicos[] | undefined;
  public especialidadSeleccionada: Especialidad_medicos;

  public medicoOrigial: Medico[] = [];
  public selectedMedico: Medico;

  public selectedCambio: any;
  public cambios: SelectItem[];

  public historialCitasCargadas: HistorialCita[] = [];

  public formGroup!: FormGroup;
  public filtrado: boolean = false;
  public mostrarTabla: boolean = false;

  constructor(
    private fb: FormBuilder,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private historialCitaService: HistorialCitaService
  ) {}

  ngOnInit(): void {
    this.cambios = [
      {
        label: 'Reprogamación',
        value: 'REPROGRAMACION',
      },
      {
        label: 'Cambio de estado',
        value: 'CAMBIO_ESTADO',
      },
    ];
    this.selectedCambio = null;

    this.formGroup = this.fb.group({
      documento: [''],
      especialidad: ['', [Validators.required]],
      medico: [''],
      fecha: [''],
      cambio: [''],
    });
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.especialidadService.obtenerListaEspecialidad().subscribe((dato) => {
      this.especialidades = dato;
    });
  }

  cargarMedicosPorEspecialidad() {
    this.medicoService
      .obtenerMedicosPorIdEspecialidad(this.especialidadSeleccionada.id)
      .subscribe((medicos) => {
        this.medicoOrigial = medicos;
        this.medicoOrigial = medicos.map((medico) => ({
          ...medico,
          apellidoNombre: medico.persona.apellido + ' ' + medico.persona.nombre,
        }));
      });
  }

  filtrarPorEspecialidad() {
    this.selectedMedico = new Medico();
    this.cargarMedicosPorEspecialidad();
  }

  filtrarCitas() {
    if (this.verificarFiltros()) {
      let idMedico =
        this.selectedMedico != null ? this.selectedMedico.id : null;
      const dateIsoString =
        this.selectedDate != null
          ? this.selectedDate!.toISOString().split('T')[0]
          : null;
      if (this.formGroup.valid) {
        this.mostrarAlerta = false;
        this.filtrado = true;
        this.historialCitaService
          .obtenerListaHistorialCita(
            this.numeroDocumento,
            idMedico,
            this.selectedCambio,
            dateIsoString
          )
          .subscribe(
            (dato) => {
              this.historialCitasCargadas = dato;
              this.mostrarTabla = true;
            },
            (error) => {
              console.error('Error al obtener historial:', error);
            }
          );
      } else {
        this.mostrarAlerta = true;
      }
    } else {
      this.mostrarAlerta = true;
    }
  }

  verificarFiltros(): boolean {
    if (
      this.selectedMedico != null ||
      this.selectedMedico != undefined ||
      this.selectedCambio != null ||
      this.selectedCambio != undefined ||
      this.selectedDate != null ||
      this.selectedDate != undefined ||
      this.numeroDocumento != null ||
      this.numeroDocumento != undefined
    ) {
      return true;
    }
    return false;
  }

  obtenerCitas() {
    this.historialCitasCargadas = [];
    this.filtrado = false;
    this.formGroup.reset();
  }

  formatearHoraModificacion(hora: string): Date{
    let fecha = new Date();
    fecha.setHours(parseInt(hora.slice(0,2)));
    fecha.setMinutes(parseInt(hora.slice(3,5)));
    return fecha;
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

}
