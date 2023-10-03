import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cita } from 'src/app/modelos/cita';
import { Medico } from 'src/app/modelos/medico';
import { CitaService } from 'src/app/services/cita.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  public citas: Cita[] = [];
  public selectedDate: Date;
  public mostrarAlerta: boolean = false;
  public filtrado: boolean = false;
  public selectedMedico: Medico;
  public medicos:Medico[]= [];
  public formGroup!: FormGroup;

  constructor(private fb: FormBuilder,private citaService:CitaService,private medicoService:MedicoService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.obtenerCitas();
    this.obtenerMedicos();

    this.formGroup = this.fb.group({
      medico: ['',[Validators.required]],
      fecha: ['', [Validators.required]]
    });
  }

  obtenerCitas(){
    this.filtrado = false;
    this.citaService.obtenerCitas().subscribe((response)=>{
      this.citas = response;
    });
  }

  obtenerMedicos(){
    this.medicoService.obtenerListaMedico().subscribe((response)=>{
      this.medicos =response;
    });
  }

  filtrarCitas(){
    if(this.formGroup.valid){
      this.mostrarAlerta= false;
      this.filtrado = true;
      const dateIsoString = this.selectedDate.toISOString().split('T')[0];
      this.citaService.obtenerCitasPorDoctorFecha(this.selectedMedico.idMedico, dateIsoString)
      .subscribe((response)=>{
        this.citas = response;
      });
      this.formGroup.reset();
    }else{
      this.mostrarAlerta = true;
    }
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
