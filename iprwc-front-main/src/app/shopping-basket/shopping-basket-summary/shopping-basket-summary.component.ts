import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ProductModel} from "../../shared/product.model";
import {Subscription} from "rxjs";
import {ShoppingBasketService} from "../../shared/shopping-basket.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shopping-basket-summary',
  templateUrl: './shopping-basket-summary.component.html',
  styleUrl: './shopping-basket-summary.component.scss'
})
export class ShoppingBasketSummaryComponent implements OnInit, OnDestroy{
  subscription!: Subscription;
  priceInBasket: number = 0;

  constructor(private  basketService: ShoppingBasketService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.basketService.basketChanged.subscribe(
      (products: ProductModel[]) => {
        this.priceInBasket = this.basketService.totalPriceInBasket();
      }
    )
    this.priceInBasket = this.basketService.totalPriceInBasket();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
