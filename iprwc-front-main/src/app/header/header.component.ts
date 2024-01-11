import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {pipe, Subscription} from "rxjs";
import {ShoppingBasketService} from "../shared/shopping-basket.service";
import {AuthService} from "../auth/auth.service";
import {map, take} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private shoppingBasketSub!: Subscription;
  amountInBasket: number = 0;
  isAuthenticated = false;
  isAdmin = false;
  private userSub!: Subscription;

  constructor(private shoppingBasketService: ShoppingBasketService, private authService: AuthService) {
  }

  ngOnInit() {
    this.shoppingBasketSub = this.shoppingBasketService.basketChanged.subscribe(basket => {
      this.amountInBasket = this.shoppingBasketService.totalProductsInBasket();
    })
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated){
        this.authService.getRole().pipe(take(1), map(role => {
          this.isAdmin = !!role.role.match("ADMIN");
        })).subscribe();
      } else {
        this.isAdmin = false;
      }
    });
  }

  ngOnDestroy() {
    this.shoppingBasketSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
