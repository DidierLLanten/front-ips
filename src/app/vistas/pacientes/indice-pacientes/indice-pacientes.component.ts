import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Eps } from 'src/app/modelos/eps';
import { Paciente } from 'src/app/modelos/paciente';
import { Tipos_identificacion } from 'src/app/modelos/tipo_identeficacion';
import { PacienteService } from 'src/app/services/paciente.service';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';
import { EPSService } from 'src/app/services/eps.service';

@Component({
  selector: 'app-indice-pacientes',
  templateUrl: './indice-pacientes.component.html',
  styleUrls: ['./indice-pacientes.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class IndicePacientesComponent implements OnInit{

  productDialog: boolean = false;

  pacientes: Paciente[] = [];

  tipos_identificacion: Tipos_identificacion[] = [];

  lista_eps: Eps[] = [];

  disabledType: boolean = false;

  typeSelected: Tipos_identificacion;

  typeSelected2: Eps;

  paciente: Paciente = new Paciente();

  delete: string = "Eliminar";

  selectedProducts!: Paciente[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private pacienteService: PacienteService,
    private tipos_identificacionService: TipoIdentificacionService,
    private epsService :EPSService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.obtenerPacientes();
    this.obtenerTiposIdentificacion();
    this.obtenerEPS();
  }

  obtenerTiposIdentificacion(){
    this.tipos_identificacionService.obtenerListaTiposIdentificacion().subscribe(dato=>{
      this.tipos_identificacion = dato;
    });
  }

  obtenerEPS(){
    this.epsService.obtenerListaEPS().subscribe(dato=>{
      this.lista_eps = dato;
      console.log(this.lista_eps);
    });
  }

  obtenerPacientes(){
    this.pacienteService.obtenerListaPacientes().subscribe(dato=>{
      this.pacientes = dato;
    });
  }

  openNew() {
    this.paciente;
    this.submitted = false;
    this.productDialog = true;
    this.disabledType = false;
  }

  guardarPaciente() {
    this.submitted = true;
    if (this.paciente.persona.nombre?.trim()) {
      if (this.paciente.idPaciente) {
        this.pacientes[this.findIndexById(this.paciente.idPaciente)] = this.paciente;
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Paciente creado',
          life: 1000,
        });
      } else {
        this.paciente.persona.tipo_identificacion = this.typeSelected;
        this.paciente.eps = this.typeSelected2 = this.typeSelected2;
        this.pacienteService.createPatient(this.paciente).subscribe(dato => {
          this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Paciente creado',
          life: 1000,
        });
        this.obtenerPacientes();
        this.paciente = new Paciente();
        })        
      }
      this.productDialog = false;
      this.paciente;
    }
  }

  editarPaciente(paciente: Paciente) {
    this.disabledType = true;
    this.paciente = {...paciente};
    this.pacienteService.actualizarPaciente(this.paciente.idPaciente, this.paciente).subscribe(dato => {
      this.obtenerPacientes();
    })    
    this.productDialog = true;
  }

  eliminarPaciente(paciente: Paciente) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar a ' + paciente.persona.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pacienteService.eliminarPaciente(paciente.idPaciente).subscribe(dato => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Paciente eliminado',
            life: 1000,
          });
          this.obtenerPacientes();
        })        
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.paciente = new Paciente();
  }  

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.pacientes.length; i++) {
      if (this.pacientes[i].idPaciente === id) {
        index = i;
        break;
      }
    }
    return index;
  }


}
