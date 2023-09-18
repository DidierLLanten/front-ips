import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Medico } from '../modelos/medico';

@Injectable({
    providedIn: 'root'
  })
export class MedicoService{

    private baseUrl="http://localhost:8070/api/v1/medico";

    constructor(private httpClient:HttpClient) { }

    createMedico(medico:Medico):Observable<any>{
        return this.httpClient.post(`${this.baseUrl}`,medico)
    }

    obtenerListaMedico():Observable<Medico[]>{
        return this.httpClient.get<Medico[]>(`${this.baseUrl}`)
    }
    
    actualizarMedico(id:number, medico:Medico):Observable<Object>{
        return this.httpClient.put(`${this.baseUrl}/${id}`,medico)
    }
    
    eliminarMedico(id:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }
    
    obtenerMedicoPorId(id:number):Observable<Medico>{
        return this.httpClient.get<Medico>(`${this.baseUrl}/${id}`)
    }
}