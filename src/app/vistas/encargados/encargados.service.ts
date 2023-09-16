import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Encargado } from './encargadoDTO';

@Injectable({
  providedIn: 'root',
})
export class EncargadosService {
  constructor(private http: HttpClient) {}

  private products: Encargado[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1',
      code: 'ABC123',
      name: 'Producto 1',
      description: 'Descripción del Producto 1',
      image: 'imagen1.jpg',
      price: 19.99,
      category: 'Electrónicos',
      quantity: 10,
      inventoryStatus: 'En stock',
      rating: 4.5,
    },
    {
      id: '2',
      code: 'DEF456',
      name: 'Producto 2',
      description: 'Descripción del Producto 2',
      image: 'imagen2.jpg',
      price: 29.99,
      category: 'Ropa',
      quantity: 5,
      inventoryStatus: 'En stock',
      rating: 3.8,
    },      
  ];

  // getProducts(): Observable<Encargado[]> {  
  //   return of(this.products);
  // }

  getProducts(): Promise<Encargado[]> {
    return Promise.resolve(this.products);
  }
}
