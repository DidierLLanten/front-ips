import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceCitasComponent } from './vistas/citas/indice-citas/indice-citas.component';
import { IndiceDoctoresComponent } from './vistas/doctores/indice-doctores/indice-doctores.component';
import { IndiceEncargadosComponent } from './vistas/encargados/indice-encargados/indice-encargados.component';
import { IndicePacientesComponent } from './vistas/pacientes/indice-pacientes/indice-pacientes.component';
import { TablaCitasComponent } from './vistas/tabla-citas/tabla-citas.component';

const routes: Routes = [
  { path: 'citas', component: TablaCitasComponent },

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
