import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { HistorialCita } from "../modelos/historialCita";

@Injectable({
    providedIn: 'root'
  })

export class HistorialCitaService{

    private baseUrl="http://localhost:8070/api/v1/historialCita";

    constructor(private httpClient:HttpClient) { }

    crearHistorialCita(historialCIta: object):Observable<any>{
        return this.httpClient.post(`${this.baseUrl}`, historialCIta);
    }

    obtenerListaHistorialCita(idMedico: number | null, cambio: string | null, fecha: string | undefined | null): Observable<HistorialCita[]> {
        let params = new HttpParams();
      
        if (idMedico != null) {
          params = params.set('idMedico', idMedico.toString());
        }
        if (cambio != null) {
          params = params.set('cambio', cambio);
        }
        if (fecha != null) {
          params = params.set('fechaCita', fecha);
        }
      
        return this.httpClient.get<HistorialCita[]>(`${this.baseUrl}/historial`, { params: params });
      }
}