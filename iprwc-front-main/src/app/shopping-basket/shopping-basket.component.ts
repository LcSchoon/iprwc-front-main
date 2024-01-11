import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingBasketService} from "../shared/shopping-basket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductModel} from "../shared/product.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrl: './shopping-basket.component.scss'
})
export class ShoppingBasketComponent implements OnInit, OnDestroy{
  amountInBasket: number = 0;
  subscription!: Subscription;

  constructor(private  basketService: ShoppingBasketService) {
  }

  ngOnInit() {
    this.subscription = this.basketService.basketChanged.subscribe(
      (products: ProductModel[]) => {
        this.amountInBasket = this.basketService.totalProductsInBasket();
      }
    )
    this.amountInBasket = this.basketService.totalProductsInBasket()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
