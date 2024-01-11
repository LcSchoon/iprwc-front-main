import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProductModule} from "../../product/product.module";
import {ProductModel} from "../../shared/product.model";
import {Subscription} from "rxjs";
import {ProductService} from "../../product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingBasketService} from "../../shared/shopping-basket.service";

@Component({
  selector: 'app-shopping-basket-list',
  templateUrl: './shopping-basket-list.component.html',
  styleUrl: './shopping-basket-list.component.scss'
})
export class ShoppingBasketListComponent implements OnInit, OnDestroy{
  products: ProductModel[] = [];
  subscription!: Subscription;
  amountInBasket: number = 0;

  constructor(private  basketService: ShoppingBasketService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.basketService.basketChanged.subscribe(
      (products: ProductModel[]) => {
        this.products = products;
        this.amountInBasket = this.basketService.totalProductsInBasket()
      }
    )
    this.products = this.basketService.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
