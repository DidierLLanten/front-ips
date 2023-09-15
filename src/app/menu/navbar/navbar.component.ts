import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  itemsMenu: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  itemsBar: MenuItem[] | undefined;

  ngOnInit() {
    this.itemsMenu = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    ];

    this.activeItem = this.itemsMenu[0];

    this.itemsBar = [
      {
        label: 'Doctores',
        icon: 'pi pi-fw pi-shield',
      },
      {
        label: 'Encargados',
        icon: 'pi pi-fw pi-building',
      },
      {
        label: 'Pacientes',
        icon: 'pi pi-fw pi-users',
      },
      {
        label: 'Citas',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
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
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
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
