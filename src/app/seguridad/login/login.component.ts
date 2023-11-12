import { Component } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { Router } from '@angular/router';

interface RespuestaToken {
  token: string;  
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  username: string = '240220201013';
  password: string = 'abc123';

  login() {
    this.seguridadService.login(this.username, this.password)
      .subscribe((respuesta: RespuestaToken) => {        
        this.seguridadService.guardarToken(respuesta.token);
        this.router.navigateByUrl('/agendar-cita');        
      });
  }
}
