import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  itemsBar: MenuItem[] | undefined;

  ngOnInit() {
    this.itemsBar = [
      {
        label: 'Doctores',
        icon: 'pi pi-fw pi-shield',
        routerLink: 'doctores',
      },
      {
        label: 'Encargados',
        icon: 'pi pi-fw pi-building',
        routerLink: 'encargados',
      },
      {
        label: 'Pacientes',
        icon: 'pi pi-fw pi-users',
        routerLink: 'pacientes',
      },
      {
        label: 'Citas',
        icon: 'pi pi-fw pi-calendar',
        items: [
          { label: 'Crear', icon: 'pi pi-calendar-plus',  routerLink: 'crear-cita',},
          { label: 'Agendar', icon: 'pi pi-book', routerLink: 'agendar-cita',},
          { label: 'Detalle', icon: 'pi pi-search', routerLink: 'detalle-cita',},
          { label: 'Historial', icon: 'pi pi-history', routerLink: '*',},
        ],
      },
    ];
  }
}
