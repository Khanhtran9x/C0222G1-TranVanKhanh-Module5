import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../model/product';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
  });

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private  router: Router) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    this.product = this.productService.findById(id);
    this.productForm.patchValue(this.product);
  }

  submit() {
    this.product = this.productForm.value;
    this.productService.saveEditedProduct(this.product);
    console.log(this.product);
    this.router.navigateByUrl('');
  }
}
