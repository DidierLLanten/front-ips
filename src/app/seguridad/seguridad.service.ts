import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return false;
    }
    return true;
  }

  obtenerRol(): string {
    return this.obtenerCampoJWT('rol');
  }

  login(username: string, password: string): Observable<RespuestaToken> {
    var credenciales = {
      numberDocument: username,
      password: password,
    };
    return this.httpClient.post<RespuestaToken>(
      `${this.baseUrl}/login`,
      credenciales
    );
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  guardarToken(token: string) {
    localStorage.setItem(this.llaveToken, token);
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
    return '';
  }
}
