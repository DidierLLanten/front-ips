import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Cita } from '../modelos/cita';

@Injectable({
    providedIn: 'root'
  })
export class CitaService{

    private baseUrl="http://localhost:8070/api/v1/cita";

    constructor(private httpClient:HttpClient) { }

    obtenerPorMedico(idEspecialidad:number, nombre:string):Observable<Cita[]>{
        return this.httpClient.get<Cita[]>(`${this.baseUrl}/${idEspecialidad}/${nombre}`);
    }

    actualizarEstadoCita(idCita: number, idEstadoCita: number){
        const data = new FormData();
        
        // @ts-ignore
        data.append("idCita", idCita);
        // @ts-ignore
        data.append("idEstadoCita", idEstadoCita);
        return this.httpClient.put(`${this.baseUrl}`,data);
    }
}