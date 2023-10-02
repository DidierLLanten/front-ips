import { Component } from '@angular/core';
import { Paciente } from 'src/app/modelos/paciente';

@Component({
  selector: 'app-indice-citas',
  templateUrl: './indice-citas.component.html',
  styleUrls: ['./indice-citas.component.css']
})
export class IndiceCitasComponent {

  idEspecialidad: number;

  validacion: boolean;

  paciente: Paciente;

  recibirIdEspecialidad(idEspecialidad: number){
    this.idEspecialidad = idEspecialidad;
  }

  recibirPaciente(paciente: Paciente){
    this.paciente = paciente;
  }
}
