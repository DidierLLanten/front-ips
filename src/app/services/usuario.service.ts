import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Usuario } from '../modelos/usuario';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService{

    private baseUrl="http://localhost:8070/api/v1/user";

    constructor(private httpClient:HttpClient) { }

    createUser(usuario:Usuario):Observable<any>{
        return this.httpClient.post(`${this.baseUrl}`,usuario)
    }

    obtenerListaUsuarios():Observable<Usuario[]>{
        return this.httpClient.get<Usuario[]>(`${this.baseUrl}`)
    }
    
    actualizarUsuarios(id:number, usuario:Usuario):Observable<Object>{
        return this.httpClient.put(`${this.baseUrl}/${id}`,usuario)
    }
    
    eliminarUsuario(id:number):Observable<Object>{
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }
    
    obtenerUsuarioPorId(id:number):Observable<Usuario>{
        return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`)
    }
}