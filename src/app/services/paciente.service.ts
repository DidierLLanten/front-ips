import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Paciente } from '../modelos/paciente';

@Injectable({
    providedIn: 'root'
  })

export class PacienteService{

    private baseUrl="http://localhost:8070/api/v1/paciente";

    constructor(private httpClient:HttpClient) { }

    createPatient(paciente:Paciente):Observable<any>{
        return this.httpClient.post(`${this.baseUrl}`,paciente)
    }

    obtenerListaPacientes():Observable<Paciente[]>{
        return this.httpClient.get<Paciente[]>(`${this.baseUrl}`)
    }
    
    actualizarPaciente(id:number, paciente:Paciente):Observable<Object>{
        return this.httpClient.put(`${this.baseUrl}/${id}`,paciente)
    }
    
    eliminarPaciente(id:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }
    
    obtenerPacientePorId(id:number):Observable<Paciente>{
        return this.httpClient.get<Paciente>(`${this.baseUrl}/${id}`)
    }
}