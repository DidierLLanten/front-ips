import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cita } from 'src/app/modelos/cita';
import { CitaService } from 'src/app/services/cita.service';
import { EncabezadoCitasComponent } from '../encabezado-citas/encabezado-citas.component';
import { Paciente } from 'src/app/modelos/paciente';

@Component({
  selector: 'app-tabla-citas',
  templateUrl: './tabla-citas.component.html',
  styleUrls: ['./tabla-citas.component.css'],
  providers: [MessageService],
})
export class TablaCitasComponent implements OnInit, OnChanges {
  
  @ViewChild("encabezado")
  public encabezado:EncabezadoCitasComponent;
  
  @Input()
  idEspecialidad: number;

  @Input()
  paciente: Paciente;

  citaSeleccionada: Cita;

  citas: Cita[];

  nombreMedico: string;

  cita: any;

  visible: boolean = false;

  constructor(
    private citaService: CitaService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.cargarTablaPorEspecialidades();
  }

  ngOnInit() {
    
  }

  showDialog(cita: Cita) {
    console.log(this.paciente);
    this.visible = true;
    this.citaSeleccionada = cita;
  }

  confirmarCita(){    
    this.citaService.actualizarEstadoCita(this.citaSeleccionada.codigo, this.idEspecialidad).subscribe(dato =>{
      this.citaService.actualizarPacienteCita(this.citaSeleccionada.codigo, this.paciente.idPaciente).subscribe(dato => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Cita confirmada',
          life: 1000,
        });
        this.cargarTablaPorEspecialidades();
      })      
    })
    this.visible = false;
  }

  buscarMedico(){
    if(this.nombreMedico != "" && this.nombreMedico != undefined){
      this.citaService.obtenerPorMedico(this.idEspecialidad, this.nombreMedico).subscribe(dato =>{
        this.citas = dato;
      })
    }else{
      this.cargarTablaPorEspecialidades();
    }
  }

  cargarTablaPorEspecialidades(){
    this.citaService.obtenerPorEspecialidad(this.idEspecialidad).subscribe(dato =>{
      this.citas = dato;
    })
  }
}
