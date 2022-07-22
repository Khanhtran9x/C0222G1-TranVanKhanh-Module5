import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;
  products: Product[] = [];

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.products = this.productService.getAll();
  }

  deleteProduct(id: number) {
    this.product = this.productService.findById(id);
    this.productService.deleteProduct(this.product);
    this.router.navigateByUrl('');
  }
}
