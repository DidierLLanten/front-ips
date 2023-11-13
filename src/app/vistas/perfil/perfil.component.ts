import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelos/persona';
import { Tipos_identificacion } from 'src/app/modelos/tipo_identeficacion';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  cedula: string;

  rol:string;

  tipos_identificacion: Tipos_identificacion[] = [];

  submitted: boolean = false;

  disabledType: boolean = false;

  editar: boolean = false;

  persona: Persona = new Persona();

  typeSelected: Tipos_identificacion;

  contrasenaActual: string;

  contrasenaNueva: string;

  constructor(){

  }

  ngOnInit(): void {
    
  }

}
