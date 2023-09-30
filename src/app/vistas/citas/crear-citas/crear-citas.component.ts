import { Component } from '@angular/core';
import { Cita } from 'src/app/modelos/cita';

@Component({
  selector: 'app-crear-citas',
  templateUrl: './crear-citas.component.html',
  styleUrls: ['./crear-citas.component.css'],
})
export class CrearCitasComponent {
  doctorFecha: any[];
  citas: Cita[];

  recibirDoctorFecha(doctorFecha: any[]) {
    this.doctorFecha = doctorFecha;
  }

  recibirCitas(citas: Cita[]) {
    this.citas = citas;
  }
}
