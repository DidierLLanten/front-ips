import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Especialidad_medicos } from 'src/app/modelos/especialidades_medico';
import { Medico } from 'src/app/modelos/medico';
import { Persona } from 'src/app/modelos/persona';
import { Tipos_identificacion } from 'src/app/modelos/tipo_identeficacion';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';
import { MedicoService } from 'src/app/services/medico.service';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';

@Component({
  selector: 'app-indice-doctores',
  templateUrl: './indice-doctores.component.html',
  styleUrls: ['./indice-doctores.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class IndiceDoctoresComponent implements OnInit{

  productDialog: boolean = false;

  medicos: Medico[] = [];

  medico: Medico = new Medico();

  persona: Persona = new Persona();

  especialidad: Especialidad_medicos = new Especialidad_medicos();

  tipos_identificacion: Tipos_identificacion[] = [];

  especialidades_medicos: Especialidad_medicos[] = [];

  disabledType: boolean = false;

  typeSelected: Tipos_identificacion;

  especialidadSelected: Especialidad_medicos;

  delete: string = "Eliminar";

  selectedProducts!: Medico[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private tipos_identificacionService: TipoIdentificacionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.obtenerMedicos();
    this.obtenerEspecialidades();
    this.obtenerTiposIdentificacion();
  }

  obtenerEspecialidades(){
    this.especialidadService.obtenerListaEspecialidad().subscribe(dato=>{
      this.especialidades_medicos = dato;
      console.log(this.especialidades_medicos);
    });
  }

  obtenerTiposIdentificacion(){
    this.tipos_identificacionService.obtenerListaTiposIdentificacion().subscribe(dato=>{
      this.tipos_identificacion = dato;
      this.tipos_identificacion = this.tipos_identificacion.filter((tipo) => tipo.codigo != 2);
    });
  }

  obtenerMedicos(){
    this.medicoService.obtenerListaMedico().subscribe(dato=>{
      this.medicos = dato;
      console.log(this.medicos);
    });
  }

  openNew() {
    this.medico = new Medico();
    this.submitted = false;
    this.productDialog = true;
    this.disabledType = false;
  }

  guardarMedico() {
    this.submitted = true;
    if (this.medico.persona.nombre.trim()) {
      if (this.medico.idMedico) {
        this.medicos[this.findIndexById(this.medico.idMedico)] = this.medico;
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Medico creado',
          life: 1000,
        });
      } else {
        this.medico.especialidadMedico = this.especialidadSelected;
        this.medico.persona.tipo_identificacion = this.typeSelected;
        this.medicoService.createMedico(this.medico).subscribe(dato => {
          this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Medico creado',
          life: 1000,
        });
        this.obtenerMedicos();
        this.medico = new Medico();
        })        
      }
      this.productDialog = false;
      this.medico;
    }
  }

  editarMedico(medico: Medico) {
    this.disabledType = true;
    this.medico = {...medico};
    this.medicoService.actualizarMedico(this.medico.idMedico, this.medico).subscribe(dato => {
      this.obtenerMedicos();
    })    
    this.productDialog = true;
  }

  eliminarMedico(medico: Medico) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar a ' + medico.persona.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.medicoService.eliminarMedico(medico.idMedico).subscribe(dato => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Medico eliminado',
            life: 1000,
          });
          this.obtenerMedicos();
        })        
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.medico = new Medico();
  }  

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.medicos.length; i++) {
      if (this.medicos[i].idMedico === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
