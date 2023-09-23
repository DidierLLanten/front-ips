import { Component, Input, OnInit } from '@angular/core';
import { Especialidad_medicos } from 'src/app/modelos/especialidades_medico';
import { Paciente } from 'src/app/modelos/paciente';
import { Persona } from 'src/app/modelos/persona';
import { Tipos_identificacion } from 'src/app/modelos/tipo_identeficacion';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';

@Component({
  selector: 'app-encabezado-citas',
  templateUrl: './encabezado-citas.component.html',
  styleUrls: ['./encabezado-citas.component.css'],
})
export class EncabezadoCitasComponent implements OnInit {
  constructor(private especialidadService: EspecialidadService) {}

  @Input()
  rol: string;

  cedula: string | undefined;
  especialidades: Especialidad_medicos[] | undefined;
  especialidadSeleccionada: Especialidad_medicos | undefined;

  tipoIdAux: Tipos_identificacion = { codigo: 9, tipo: 'Cedula' };
  personaAux: Persona = {
    codigo: 1,
    nombre: 'Didier',
    apellido: 'LLanten',
    tipo_identificacion: this.tipoIdAux,
    numero_documento: '10823472872',
    telefono: '3124243829',
    correo: 'didiervelez@hotmail.com',
  };
  pacienteAux: Paciente = { idPaciente: 3, persona: this.personaAux };

  ngOnInit() {
    this.cargarEspecialidades();
  }

  searchUserByCedula() {
    console.log('Cedula a buscar: ', this.cedula);
  }

  cargarEspecialidades() {
    this.especialidadService.obtenerListaEspecialidad().subscribe((dato) => {
      this.especialidades = dato;
    });
  }

  filtrarPorEspecialidad() {
    console.log('Especialidad: ', this.especialidadSeleccionada);
  }
}
