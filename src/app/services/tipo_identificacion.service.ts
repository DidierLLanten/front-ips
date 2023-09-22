import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Tipos_identificacion } from '../modelos/tipo_identeficacion';

@Injectable({
    providedIn: 'root'
  })
export class TipoIdentificacionService{

    private baseUrl="http://localhost:8070/api/v1/tipo-identificacion";

    constructor(private httpClient:HttpClient) { }

    obtenerListaTiposIdentificacion():Observable<Tipos_identificacion[]>{
        return this.httpClient.get<Tipos_identificacion[]>(`${this.baseUrl}`)
    }
}