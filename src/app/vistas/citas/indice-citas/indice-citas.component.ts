import { Component } from '@angular/core';

@Component({
  selector: 'app-indice-citas',
  templateUrl: './indice-citas.component.html',
  styleUrls: ['./indice-citas.component.css']
})
export class IndiceCitasComponent {

  idEspecialidad: number;

  validacion: boolean;

  recibirIdEspecialidad(idEspecialidad: number){
    this.idEspecialidad = idEspecialidad;
  }
}
