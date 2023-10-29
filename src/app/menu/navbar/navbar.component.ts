import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../../styles.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private seguridadService: SeguridadService) {}

  opcionesNavBar: MenuItem[] | undefined;
  private rolActivo: string;

  ngOnInit() {
    this.rolActivo = this.seguridadService.obtenerRol();

    if (this.rolActivo === 'Admin') {
      this.opcionesNavBar = [
        {
          label: 'Doctores',
          icon: 'pi pi-fw pi-shield',
          routerLink: 'doctores',
          styleClass: 'color-texto color-icono',
        },
        {
          label: 'Encargados',
          icon: 'pi pi-fw pi-building',
          routerLink: 'encargados',
          styleClass: 'color-texto color-icono',
        },
        {
          label: 'Pacientes',
          icon: 'pi pi-fw pi-users',
          routerLink: 'pacientes',
          styleClass: 'color-texto color-icono',
        },
        {
          label: 'Citas',
          icon: 'pi pi-fw pi-calendar',
          styleClass: 'color-icono-calendar color-texto-calendar',
          items: [
            {
              label: 'Crear',
              icon: 'pi pi-calendar-plus',
              routerLink: 'crear-cita',
              styleClass: 'color-texto color-icono',
            },
            {
              label: 'Agendar',
              icon: 'pi pi-book',
              routerLink: 'agendar-cita',
              styleClass: 'color-texto color-icono',
            },
            {
              label: 'Detalle',
              icon: 'pi pi-search',
              routerLink: 'detalle-cita',
              styleClass: 'color-texto color-icono',
            },
            {
              label: 'Historial',
              icon: 'pi pi-history',
              routerLink: 'historial',
              styleClass: 'color-texto color-icono',
            },
          ],
        },
      ];
    } else if (this.rolActivo === 'Encargado') {
      this.opcionesNavBar = [
        {
          label: 'Pacientes',
          icon: 'pi pi-fw pi-users',
          routerLink: 'pacientes',
          styleClass: 'color-texto color-icono',
        },
        {
          label: 'Citas',
          icon: 'pi pi-fw pi-calendar',
          styleClass: 'color-icono-calendar color-texto-calendar',
          items: [
            {
              label: 'Crear',
              icon: 'pi pi-calendar-plus',
              routerLink: 'crear-cita',
              styleClass: 'color-texto color-icono',
            },
            {
              label: 'Agendar',
              icon: 'pi pi-book',
              routerLink: 'agendar-cita',
              styleClass: 'color-texto color-icono',
            },
            {
              label: 'Detalle',
              icon: 'pi pi-search',
              routerLink: 'detalle-cita',
              styleClass: 'color-texto color-icono',
            },
            {
              label: 'Historial',
              icon: 'pi pi-history',
              routerLink: 'historial',
              styleClass: 'color-texto color-icono',
            },
          ],
        },
      ];
    } else if (this.rolActivo === 'Paciente') {
      this.opcionesNavBar = [
        {
          label: 'Citas',
          icon: 'pi pi-fw pi-calendar',
          styleClass: 'color-icono-calendar color-texto-calendar',
          items: [
            {
              label: 'Agendar',
              icon: 'pi pi-book',
              routerLink: 'agendar-cita',
              styleClass: 'color-texto color-icono',
            },
            {
              label: 'Detalle',
              icon: 'pi pi-search',
              routerLink: 'detalle-cita',
              styleClass: 'color-texto color-icono',
            },
            {
              label: 'Historial',
              icon: 'pi pi-history',
              routerLink: 'historial',
              styleClass: 'color-texto color-icono',
            },
          ],
        },
      ];
    }
  }
}
