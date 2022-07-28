import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../model/product';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  categories: Category[];
  product: Product;
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormGroup({
      id: new FormControl(),
      name: new FormControl()
    })
  });

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params.id);
    this.getProduct(id);
    this.getAllCategories();
  }

  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product => {
      this.productForm.patchValue(product);
    });
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  findCategoryById(id: number) {
    this.categoryService.findById(id).subscribe(category => {
      this.product.category.name = category.name;
      this.updateCategory();
    });
  }

  submit() {
    this.product = this.productForm.value;
    this.findCategoryById(this.product.category.id);
  }

  updateCategory() {
    this.productService.saveEditedProduct(this.product.id, this.product).subscribe(() => {
      console.log('cap nhat thanh cong');
      this.router.navigateByUrl('/');
    }, e => {
      console.log(e);
    });
  }
}
