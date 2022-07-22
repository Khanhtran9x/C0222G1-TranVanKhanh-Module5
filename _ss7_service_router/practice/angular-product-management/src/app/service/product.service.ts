import {Injectable} from '@angular/core';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [{
    id: 1,
    name: 'IPhone 12',
    price: 2400000,
    description: 'New'
  }, {
    id: 2,
    name: 'IPhone 11',
    price: 1560000,
    description: 'Like new'
  }, {
    id: 3,
    name: 'IPhone X',
    price: 968000,
    description: '97%'
  }, {
    id: 4,
    name: 'IPhone 8',
    price: 7540000,
    description: '98%'
  }, {
    id: 5,
    name: 'IPhone 11 Pro',
    price: 1895000,
    description: 'Like new'
  }];

  constructor() {
  }

  getAll() {
    return this.products;
  }

  saveProduct(product) {
    this.products.push(product);
  }

  findById(id: number): Product {
    return this.products.find(product => product.id === id);
  }

  findIndex(id: number): number {
    for (const index in this.products) {
      if (this.products[index].id === id) {
        return Number(index);
      }
    }
  }

  saveEditedProduct(product) {
    const index = this.findIndex(product.id);
    console.log(index);
    this.products.splice(index, 1, product);
  }

  deleteProduct(product) {
    const index = this.findIndex(product.id);
    this.products.splice(index, 1);
  }
}
