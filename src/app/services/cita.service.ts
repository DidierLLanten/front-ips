import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

    obtenerPorEspecialidad(idEspecialidad: number):Observable<Cita[]>{
        return this.httpClient.get<Cita[]>(`${this.baseUrl}/cita_especialidad/${idEspecialidad}`);
    }

    actualizarPacienteCita(idCita: number, idPaciente: number){
        const data = new FormData();

        // @ts-ignore
        data.append("idPaciente", idPaciente);
        return this.httpClient.put(`${this.baseUrl}/${idCita}`,data);
    }

    crearCitaDoctor(datosCita: object): Observable<any> {        
        return this.httpClient.post(`${this.baseUrl}`, datosCita);
    }

    obtenerCitasPorDoctorFecha(idMedico: number, fecha: string):Observable<Cita[]>{
        return this.httpClient.get<Cita[]>(`${this.baseUrl}/medico/${idMedico}?fecha=${fecha}`);
    }

    obtenerCitas():Observable<Cita[]>{
        return this.httpClient.get<Cita[]>(`${this.baseUrl}`);
    }

    obtenerCitasPorCedulaYIdEstadoCita(cedula: string, idEstadoCita: number):Observable<Cita[]>{
        return this.httpClient.get<Cita[]>(`${this.baseUrl}/paciente/${cedula}/${idEstadoCita}`);
    }

    obtenerCitasConfirmadasYAssignadasPorCedula(cedula: string):Observable<Cita[]>{
        return this.httpClient.get<Cita[]>(`${this.baseUrl}/paciente/${cedula}`);
    }

    obtenerCitasByPacienteYMedicoYEstadoCitaYFecha(idMedico: number, idPaciente:number, fecha:string):Observable<Cita[]>{
        let params = new HttpParams();
        params = params.set('idMedico', idMedico);
        params = params.set('fecha', fecha);
        console.log("Datos",params, idPaciente);
        return this.httpClient.get<Cita[]>(`${this.baseUrl}/paciente_fecha/${idPaciente}`, { params: params });
    }
}