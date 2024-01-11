import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from "../../shared/product.model";
import {Subscription} from "rxjs";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss'
})
export class ProductOverviewComponent implements OnInit, OnDestroy{
  products: ProductModel[] = [];
  subscription!: Subscription;

  constructor(private  productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.productService.productsChanged.subscribe(
      (products: ProductModel[]) => {
        this.products = products;
      }
    )
    this.products = this.productService.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
