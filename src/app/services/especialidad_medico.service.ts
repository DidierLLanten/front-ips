import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Especialidad_medicos } from '../modelos/especialidades_medico';

@Injectable({
    providedIn: 'root'
  })
export class EspecialidadService{

    private baseUrl="http://localhost:8070/api/v1/especialidad";

    constructor(private httpClient:HttpClient) { }

    obtenerListaEspecialidad():Observable<Especialidad_medicos[]>{
        return this.httpClient.get<Especialidad_medicos[]>(`${this.baseUrl}`)
    }
}