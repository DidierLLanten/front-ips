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
        routerLink: 'citas',
      },
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'History',
            icon: 'pi pi-fw pi-history',
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
          },
        ],
      },
    ];
  }
}
