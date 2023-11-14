import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../modelos/persona';
import { Observable } from 'rxjs';
import { ChangePasswordDTO } from '../modelos/changePasswordDTO';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private baseUrl = 'http://localhost:8070/api/v1/persona';

  constructor(private httpClient: HttpClient) {}

  obtenerPersonaPorNumeroDocumento(numeroDocumento: string): Observable<Persona> {
    return this.httpClient.get<Persona>(`${this.baseUrl}/${numeroDocumento}`);
  }

  actualizarPersonaPorNumeroDocumento(persona: Persona): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}`, persona);
  }

  cambiarPassword(numeroDocumento: string, changePasswordDTO: ChangePasswordDTO): Observable<Object> {    
    return this.httpClient.put(`${this.baseUrl}/changePassword/${numeroDocumento}`, changePasswordDTO);
  }
}
