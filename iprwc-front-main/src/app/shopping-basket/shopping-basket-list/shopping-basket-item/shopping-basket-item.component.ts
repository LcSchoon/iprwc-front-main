import {Component, Input} from '@angular/core';
import {ProductModel} from "../../../shared/product.model";
import {ShoppingBasketService} from "../../../shared/shopping-basket.service";

@Component({
  selector: 'app-shopping-basket-item',
  templateUrl: './shopping-basket-item.component.html',
  styleUrl: './shopping-basket-item.component.scss'
})
export class ShoppingBasketItemComponent {
  @Input() product!: ProductModel;
  @Input() index!: number;

  constructor(private basketService: ShoppingBasketService){  }



  decreaseAmount(){
    this.basketService.decreaseAmountByOne(this.product.id);
  }

  increaseAmount(){
    this.basketService.increaseAmountByOne(this.product.id);
  }

  deleteItem(){
    this.basketService.deleteAllFromBasket(this.product.id);
  }
}
