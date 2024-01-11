import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShoppingBasketService} from "../shared/shopping-basket.service";
import {ProductModel} from "../shared/product.model";
import {Subscription} from "rxjs";
import {PaymentInfo} from "../shared/order-models/payment-info";
import {ShippingDetailsModel} from "../shared/order-models/shipping-details.model";
import {OrderModel} from "../shared/order-models/order.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy{
  subscription!: Subscription;
  priceInBasket: number = 0;
  checkOutForm!: FormGroup;
  products: ProductModel[] = [];
  constructor(private fb: FormBuilder,
              private cartService: ShoppingBasketService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit() {
    this.initForm();
    this.subscription = this.cartService.basketChanged.subscribe(
      (products: ProductModel[]) => {
        this.products = this.cartService.getProducts();
        this.priceInBasket = this.cartService.totalPriceInBasket();
      }
    )
    this.products = this.cartService.getProducts();
    this.priceInBasket = this.cartService.totalPriceInBasket();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initForm(){
    this.checkOutForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName:  ["", Validators.required],
      street: ["", Validators.required],
      houseNumber: ["", Validators.required],
      zipCode:  ["", Validators.required],
      city:  ["", Validators.required],
      creditCardNumber: ["", Validators.required],
      expirationDate:  ["", Validators.required],
      ccv:  ["", Validators.required]
    })
  }

  onSubmit(){
    if(this.checkOutForm.valid && this.products.length > 0){
      const paymentInfo = new PaymentInfo()
      paymentInfo.cardNumber = this.checkOutForm.value.creditCardNumber;
      paymentInfo.expirationDate = this.checkOutForm.value.expirationDate;
      paymentInfo.ccv = this.checkOutForm.value.ccv;

      const shippingDetails = new ShippingDetailsModel();
      shippingDetails.firstName = this.checkOutForm.value.firstName;
      shippingDetails.lastName = this.checkOutForm.value.lastName
      shippingDetails.street = this.checkOutForm.value.street;
      shippingDetails.zipCode = this.checkOutForm.value.zipCode;
      shippingDetails.housenumber = this.checkOutForm.value.houseNumber;

      const order = new OrderModel(paymentInfo, shippingDetails, this.products);

      this.cartService.placeOrder(order);
      this.router.navigate(['purchase-complete'], {relativeTo: this.route})
   }
  }
}
