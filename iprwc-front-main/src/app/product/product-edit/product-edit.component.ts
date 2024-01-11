import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit{
  id!: number;
  productId!: string;
  editMode = false;
  productForm!: FormGroup;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        })
  }

  private initForm(){
    let productName = '';
    let productImagePath = '';
    let productDescription = '';
    let productPrice: number = 0;
    if (this.editMode) {
      const product = this.productService.getProduct(this.id);
      productName = product.name;
      productImagePath = product.imagePath;
      productDescription = product.description;
      productPrice = product.price;
      this.productId = product.id;
    }

    this.productForm = new FormGroup({
      'name': new FormControl(productName, Validators.required),
      'imagePath': new FormControl(productImagePath, Validators.required),
      'description': new FormControl(productDescription, Validators.required),
      'price': new FormControl(productPrice, Validators.required)
    });
  }

  onSubmit(){
    if (this.editMode){
      this.productService.updateProduct(this.productForm.value, this.productId);
    } else
      this.productService.addProduct(this.productForm.value);
    this.onCancel();
  }


  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
