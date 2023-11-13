import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Especialidad_medicos } from 'src/app/modelos/especialidades_medico';
import { Medico } from 'src/app/modelos/medico';
import { Persona } from 'src/app/modelos/persona';
import { Tipos_identificacion } from 'src/app/modelos/tipo_identeficacion';
import { EspecialidadService } from 'src/app/services/especialidad_medico.service';
import { MedicoService } from 'src/app/services/medico.service';
import { TipoIdentificacionService } from 'src/app/services/tipo_identificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indice-doctores',
  templateUrl: './indice-doctores.component.html',
  styleUrls: ['./indice-doctores.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class IndiceDoctoresComponent implements OnInit {
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

  delete: string = 'Eliminar';

  selectedProducts!: Medico[] | null;

  submitted: boolean = false;

  statuses!: any[];

  editar: boolean = false;
  medicoEditado: Medico;

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

  obtenerEspecialidades() {
    this.especialidadService.obtenerListaEspecialidad().subscribe((dato) => {
      this.especialidades_medicos = dato;
    });
  }

  obtenerTiposIdentificacion() {
    this.tipos_identificacionService
      .obtenerListaTiposIdentificacion()
      .subscribe((dato) => {
        this.tipos_identificacion = dato;
        this.tipos_identificacion = this.tipos_identificacion.filter(
          (tipo) => tipo.codigo != 2
        );
      });
  }

  obtenerMedicos() {
    let timerInterval: any;
    Swal.fire({
      title: 'Por favor espere mientras\n' + 'cargamos a los doctores',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()!.querySelector('b');
        timerInterval = setInterval(() => {
          if (timer) {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }
        }, 100);
        this.obtenerListaMedicos();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }

  obtenerListaMedicos(){
    this.medicoService.obtenerListaMedico().subscribe((dato) => {
      this.medicos = dato;
    });
  }

  openNew() {
    this.editar = false;
    this.medico = new Medico();
    this.submitted = false;
    this.productDialog = true;
    this.disabledType = false;
  }

  verificarCampos(): boolean {
    if (
      this.medico.persona.nombre &&
      this.medico.persona.apellido &&
      this.medico.persona.numeroDocumento &&
      this.medico.persona.telefono &&
      this.medico.persona.correo &&
      this.medico.tarjetaProfesional
    ) {
      return true;
    }
    return false;
  }

  guardarMedico() {
    this.submitted = true;
    if (this.editar) {
      this.medico = this.medicoEditado;
      const validarCampos = this.verificarCampos();
      if (validarCampos) {
        const medicoActualizado: Medico = this.actualizarAtributosEditablesMedico(this.medico);
        
        this.medicoService
          .actualizarMedico(this.medico.id, medicoActualizado)
          .subscribe((dato) => {
            this.obtenerMedicos();
          });
        this.editar = false;
        this.productDialog = false;
      }
    } else {
      const validarCampos = this.verificarCampos();
      if (validarCampos) {
        if (this.medico.persona.nombre.trim()) {
          if (this.medico.id) {
            this.medicos[this.findIndexById(this.medico.id)] = this.medico;
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Medico creado',
              life: 1000,
            });
          } else {
            this.medico.especialidad = this.especialidadSelected;
            this.medico.persona.tipoIdentificacion = this.typeSelected;
            this.medicoService.createMedico(this.medico).subscribe((dato) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Exitoso',
                detail: 'Medico creado',
                life: 1000,
              });
              this.obtenerMedicos();
              this.medico = new Medico();
            });
          }
          this.medico;
        }
        this.productDialog = false;
      }
    }
  }

  actualizarAtributosEditablesMedico(medicoOriginal: Medico): Medico {
    const medicoActualizado: Medico = new Medico();
    medicoActualizado.tarjetaProfesional = medicoOriginal.tarjetaProfesional;
    medicoActualizado.persona.nombre = medicoOriginal.persona.nombre;
    medicoActualizado.persona.apellido = medicoOriginal.persona.apellido;
    medicoActualizado.persona.telefono = medicoOriginal.persona.telefono;
    medicoActualizado.persona.correo = medicoOriginal.persona.correo;

    return medicoActualizado;
  }

  editarMedico(medico: Medico) {
    this.medico = medico;
    this.medicoEditado = medico;
    this.disabledType = true;
    this.editar = true;
    this.productDialog = true;
  }

  eliminarMedico(medico: Medico) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar a ' + medico.persona.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteMedico(medico);
      },
    });
  }

  deleteMedico(medico:Medico){
    this.medicoService.eliminarMedico(medico.id).subscribe((dato) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Medico eliminado',
        life: 1000,
      });
      this.obtenerMedicos();
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
      if (this.medicos[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
