import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGModule } from "./prime-ng/prime-ng.module";
import { NavbarComponent } from './menu/navbar/navbar.component';
import { IndicePacientesComponent } from './vistas/pacientes/indice-pacientes/indice-pacientes.component';
import { IndiceDoctoresComponent } from './vistas/doctores/indice-doctores/indice-doctores.component';
import { IndiceEncargadosComponent } from './vistas/encargados/indice-encargados/indice-encargados.component';
import { IndiceCitasComponent } from './vistas/citas/indice-citas/indice-citas.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndicePacientesComponent,
    IndiceDoctoresComponent,
    IndiceEncargadosComponent,
    IndiceCitasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimeNGModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
