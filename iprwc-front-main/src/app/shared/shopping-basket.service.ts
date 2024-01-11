import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {ProductModel} from "./product.model";
import {ProductService} from "../product/product.service";
import {OrderModel} from "./order-models/order.model";
import {OrderDataService} from "./order-data.service";

@Injectable({providedIn: 'root'})
export class ShoppingBasketService implements OnInit, OnDestroy{
  basketChanged = new Subject<ProductModel[]>();
  private products: ProductModel[] = [];
  subscription!: Subscription;

  private shoppingBasket: ProductModel[] = [];

  constructor(private productService: ProductService,
              private orderService: OrderDataService) {
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

  getProducts(){
    return this.shoppingBasket.slice();
  }

  addToBasket(product: ProductModel){
    this.products = this.productService.getProducts();
    const index = this.findItemInBasket(product.id);
    if (index != null){
      this.updateAmountInBasket(product.id, 1);
    } else {
      product.amount = 1;
      this.shoppingBasket.push(product);
      this.basketChanged.next(this.shoppingBasket.slice());
    }
  }

  updateAmountInBasket(productId: string, amount: number){
    const index = this.findItemInBasket(productId);
    if (index != null){
      this.shoppingBasket[index].amount = this.shoppingBasket[index].amount + amount;
      if (this.shoppingBasket[index].amount === 0){
        this.deleteAllFromBasket(productId);
        return;
      }
      this.basketChanged.next(this.shoppingBasket.slice());
    }
  }

  increaseAmountByOne(productId: string){
    this.updateAmountInBasket(productId, 1);
    this.basketChanged.next(this.shoppingBasket.slice());
  }

  decreaseAmountByOne(productId: string){
    this.updateAmountInBasket(productId, -1);
    this.basketChanged.next(this.shoppingBasket.slice());
  }

  deleteAllFromBasket(productId: string){
    const index = this.findItemInBasket(productId);
    if (index != null){
      this.shoppingBasket.splice(index, 1);
      this.basketChanged.next(this.shoppingBasket.slice());
    }
  }

  setBasket(products: ProductModel[]){
    this.shoppingBasket = products;
    this.basketChanged.next(this.shoppingBasket.slice());
  }

  totalProductsInBasket(){
    let amount = 0;
    for (let i = 0; i <  this.shoppingBasket.length; i++){
      amount = amount + this.shoppingBasket[i].amount;
    }
    return amount;
  }

  totalPriceInBasket(){
    let amount = 0;
    for (let i = 0; i <  this.shoppingBasket.length; i++){
      amount = amount + this.shoppingBasket[i].price * this.shoppingBasket[i].amount;
    }
    return amount;
  }

  placeOrder(order: OrderModel){
    this.orderService.postOrder(order);
    this.shoppingBasket = [];
    this.basketChanged.next(this.shoppingBasket.slice());
  }

  private findItemInBasket(id: string){
    if (this.shoppingBasket.length > 0){
      for (let i = 0; i <  this.shoppingBasket.length; i++){
        if (this.shoppingBasket[i].id.match(id)){
          return i;
        }
      }
    }
    return null;
  }
}
