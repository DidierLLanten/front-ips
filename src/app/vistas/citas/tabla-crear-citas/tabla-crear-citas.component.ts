import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tabla-crear-citas',
  templateUrl: './tabla-crear-citas.component.html',
  styleUrls: ['./tabla-crear-citas.component.css'],
})
export class TablaCrearCitasComponent {
  @Input()
  doctorFecha: object;
}
