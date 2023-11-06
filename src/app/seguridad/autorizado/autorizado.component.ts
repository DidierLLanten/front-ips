import { Component, Input } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css'],
})
export class AutorizadoComponent {
  constructor(private seguridadService: SeguridadService) {}

  @Input()
  rolPermitido: string;

  estaAutorizado(): boolean {
    if (this.rolPermitido) {
      return this.rolPermitido === this.seguridadService.obtenerRol();
    } else {
      return this.seguridadService.estaLogueado();
    }
  }
}
