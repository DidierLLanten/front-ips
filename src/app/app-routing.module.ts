import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceCitasComponent } from './vistas/citas/indice-citas/indice-citas.component';
import { IndiceDoctoresComponent } from './vistas/doctores/indice-doctores/indice-doctores.component';
import { IndiceEncargadosComponent } from './vistas/encargados/indice-encargados/indice-encargados.component';
import { IndicePacientesComponent } from './vistas/pacientes/indice-pacientes/indice-pacientes.component';
import { CrearCitasComponent } from './vistas/citas/crear-citas/crear-citas.component';

const routes: Routes = [
  { path: 'crearCita', component: CrearCitasComponent },
  { path: 'agendarCita', component: IndiceCitasComponent },

  { path: 'doctores', component: IndiceDoctoresComponent },

  { path: 'encargados', component: IndiceEncargadosComponent },

  { path: 'pacientes', component: IndicePacientesComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
