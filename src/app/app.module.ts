import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PrimeNGModule } from './prime-ng/prime-ng.module';
import { NavbarComponent } from './menu/navbar/navbar.component';
import { IndicePacientesComponent } from './vistas/pacientes/indice-pacientes/indice-pacientes.component';
import { IndiceDoctoresComponent } from './vistas/doctores/indice-doctores/indice-doctores.component';
import { IndiceEncargadosComponent } from './vistas/encargados/indice-encargados/indice-encargados.component';
import { IndiceCitasComponent } from './vistas/citas/indice-citas/indice-citas.component';
import { EncabezadoCitasComponent } from './vistas/citas/encabezado-citas/encabezado-citas.component';
import { TablaCitasComponent } from './vistas/citas/tabla-citas/tabla-citas.component';
import { EncabezadoCrearCitasComponent } from './vistas/citas/encabezado-crear-citas/encabezado-crear-citas.component';
import { CrearCitasComponent } from './vistas/citas/crear-citas/crear-citas.component';
import { TablaCrearCitasComponent } from './vistas/citas/tabla-crear-citas/tabla-crear-citas.component';

import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es-ES');

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndicePacientesComponent,
    IndiceDoctoresComponent,
    IndiceEncargadosComponent,
    IndiceCitasComponent,
    TablaCitasComponent,
    EncabezadoCitasComponent,
    EncabezadoCrearCitasComponent,
    CrearCitasComponent,
    TablaCrearCitasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimeNGModule,
  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
