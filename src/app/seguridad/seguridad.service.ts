import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  constructor() {}

  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';

  // private autenticado: boolean;
  private autenticado = false;

  // private rol: string;
  private rol = 'Admin';
  // private rol = 'Encargado';
  // private rol = 'Paciente';

  estaLogueado(): boolean {
    return this.autenticado;
  }

  obtenerRol(): string {
    return this.rol;
  }
}
