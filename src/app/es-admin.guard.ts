import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from './seguridad/seguridad.service';

export const esAdminGuard: CanActivateFn = (route, state) => {

  const seguridadService = inject(SeguridadService);

  if (seguridadService.obtenerRol() === "ADMINISTRADOR") {
    return true;
  }

  const router = inject(Router);
  router.navigate(['/login']);
  return false;  
};
