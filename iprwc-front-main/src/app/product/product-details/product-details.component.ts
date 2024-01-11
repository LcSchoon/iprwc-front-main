import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {ProductModel} from "../../shared/product.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product!: ProductModel;
  id!: number;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.product = this.productService.getProduct(this.id);
      }
    )
  }

  onEditProduct(){
    this.router.navigate(['edit'],  {relativeTo: this.route});
  }

  onDeleteProduct(){
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/product-list']);
  }
}
