import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cita } from 'src/app/modelos/cita';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-tabla-citas',
  templateUrl: './tabla-citas.component.html',
  styleUrls: ['./tabla-citas.component.css'],
  providers: [MessageService],
})
export class TablaCitasComponent implements OnInit {

  citaSeleccionada: Cita;

  citas: Cita[];

  nombreMedico: string;

  idEspecialidad: number = 3;

  cita: any;

  visible: boolean = false;

  constructor(
    private citaService: CitaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {

  }

  showDialog(cita: Cita) {
    this.visible = true;
    this.citaSeleccionada = cita;
  }

  confirmarCita(){
    this.citaService.actualizarEstadoCita(this.citaSeleccionada.codigo, 3).subscribe(dato =>{
      this.messageService.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Cita confirmada',
        life: 1000,
      });
    })
    this.visible = false;
  }

  buscarMedico(){
    this.citaService.obtenerPorMedico(this.idEspecialidad, this.nombreMedico).subscribe(dato =>{
      this.citas = dato;
      console.log(this.citas);
    })
  }
}
