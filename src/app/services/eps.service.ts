import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Eps } from '../modelos/eps';

@Injectable({
    providedIn: 'root'
  })

export class EPSService{

    private baseUrl="http://localhost:8070/api/v1/eps";

    constructor(private httpClient:HttpClient) { }

    obtenerListaEPS():Observable<Eps[]>{
        return this.httpClient.get<Eps[]>(`${this.baseUrl}`)
    }
}