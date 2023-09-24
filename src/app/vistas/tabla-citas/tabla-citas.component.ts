import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tabla-citas',
  templateUrl: './tabla-citas.component.html',
  styleUrls: ['./tabla-citas.component.css'],
  providers: [MessageService],
})
export class TablaCitasComponent implements OnInit {
  agendas: any[];

  nombreMedico: string;

  cita: any;

  visible: boolean = false;

  constructor(
    //private agendaService: AgendaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.agendas = [
      {
        fecha: '2023-09-23 12:30',
        nombreDoctor: 'Luis',
        nombrePersona: 'Pedro',
      },
      {
        fecha: '2023-09-23 2:30',
        nombreDoctor: 'Didier',
        nombrePersona: 'otavio',
      },
      {
        fecha: '2023-09-23 11:30',
        nombreDoctor: 'Camilo',
        nombrePersona: 'Ernesto',
      },
    ];
    this.cita = {
      fecha: '2023-09-23 12:30',
      nombreDoctor: 'Luis',
      nombrePersona: 'Pedro',
    };
    /*this.agendaService.getProductsMini().then(dato => {
      this.agendas = data;
    });*/
  }
  showDialog() {
    this.visible = true;
  }

  selectAgenda(agenda: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Agenda Selected',
      detail: agenda.nombre,
    });
  }

  buscarMedico(){
    console.log(this.nombreMedico);
  }
}
