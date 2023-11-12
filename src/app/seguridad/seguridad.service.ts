import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
interface RespuestaToken {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = 'http://localhost:8070/api/v1/auth';

  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private numeroDocumento:string = "hola";

  private rolSubject = new BehaviorSubject<string>(this.obtenerRol());
  rolObservable = this.rolSubject.asObservable();

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return false;
    }
    return true;
  }

  obtenerNumeroDocumento():string{
     return this.numeroDocumento;
  }

  obtenerRol(): string {
    return this.obtenerCampoJWT('rol');
  }

  login(username: string, password: string): Observable<RespuestaToken> {
    var credenciales = {
      numberDocument: username,
      password: password,
    };
    this.numeroDocumento = username;
    console.log(this.numeroDocumento);
    return this.httpClient.post<RespuestaToken>(
      `${this.baseUrl}/login`,
      credenciales
    );
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    this.rolSubject.next(this.obtenerRol());
  }

  guardarToken(token: string) {
    localStorage.setItem(this.llaveToken, token);
    this.rolSubject.next(this.obtenerRol());
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return '';
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    console.log('Data token: ', dataToken);
    if (campo === 'rol' && token) {
      console.log('Data tokken: ', dataToken[campo][0].authority);
      return dataToken[campo][0].authority;
    }
    if(campo === 'sub' && token){
      return dataToken[campo];
    }
    return '';
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }
}
