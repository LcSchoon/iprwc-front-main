import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductModel} from "../../../shared/product.model";
import {Subscription} from "rxjs";
import {ProductService} from "../../product.service";
import {ShoppingBasketService} from "../../../shared/shopping-basket.service";

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrl: './product-thumbnail.component.scss'
})
export class ProductThumbnailComponent {
  @Input() public product!: ProductModel;
  @Input() public index!: number;


  constructor(private shoppingBasketService: ShoppingBasketService) {
  }

  public onAddToCart(): void{
    this.shoppingBasketService.addToBasket(this.product);
  }
}
