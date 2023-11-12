import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceCitasComponent } from './vistas/citas/indice-citas/indice-citas.component';
import { IndiceDoctoresComponent } from './vistas/doctores/indice-doctores/indice-doctores.component';
import { IndiceEncargadosComponent } from './vistas/encargados/indice-encargados/indice-encargados.component';
import { IndicePacientesComponent } from './vistas/pacientes/indice-pacientes/indice-pacientes.component';
import { CrearCitasComponent } from './vistas/citas/crear-citas/crear-citas.component';
import { DetalleCitaComponent } from './vistas/citas/detalle-cita/detalle-cita.component';
import { HistorialComponent } from './vistas/citas/historial/historial.component';
import { LoginComponent } from './seguridad/login/login.component';
import { esAdminGuard } from './es-admin.guard';

const routes: Routes = [
  { path: 'crear-cita', component: CrearCitasComponent },
  { path: 'agendar-cita', component: IndiceCitasComponent },
  { path: 'detalle-cita', component: DetalleCitaComponent },

  { path: 'doctores', component: IndiceDoctoresComponent, canActivate: [esAdminGuard] },

  { path: 'encargados', component: IndiceEncargadosComponent, canActivate: [esAdminGuard] }, 

  { path: 'pacientes', component: IndicePacientesComponent },

  { path: 'historial', component: HistorialComponent },

  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
