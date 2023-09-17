import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-indice-encargados',
  templateUrl: './indice-encargados.component.html',
  styleUrls: ['./indice-encargados.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class IndiceEncargadosComponent implements OnInit {
  productDialog: boolean = false;

  usuarios!: Usuario[];

  usuario!: Usuario;

  delete: string = "Eliminar";

  selectedProducts!: Usuario[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    /*private productService: EncargadosService,*/
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    //this.productService.getProducts().then((data) => (this.usuarios = data));
  }

  openNew() {
    this.usuario = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarios = this.usuarios.filter(
          (val) => !this.selectedProducts?.includes(this.usuario)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(usuario: Usuario) {
    this.usuario = { ...usuario };
    this.productDialog = true;
  }

  deleteProduct(usuario: Usuario) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + usuario.codigo_persona?.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarios = this.usuarios.filter((val) => val.id_usuario !== usuario.id_usuario);
        this.usuario = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.usuario.codigo_persona?.nombre?.trim()) {
      if (this.usuario.id_usuario) {
        this.usuarios[this.findIndexById(this.usuario.id_usuario)] = this.usuario;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.usuario.codigo_persona.codigo =  this.createId();
        this.usuarios.push(this.usuario);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.usuarios = [...this.usuarios];
      this.productDialog = false;
      this.usuario = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].codigo_persona?.codigo === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): number {
    let id = 0;
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += Math.floor(Math.random() * chars.length);
    }
    return id;
  }
}
