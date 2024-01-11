import {PaymentInfo} from "./payment-info";
import {ShippingDetailsModel} from "./shipping-details.model";
import {ProductModel} from "../product.model";

export class OrderModel {
  id: string = "id" + Math.random().toString(16).slice(2);
  constructor(public paymentInfo: PaymentInfo,
              public shippingDetails: ShippingDetailsModel,
              public shoppingBasket: ProductModel[]) {
  }

}
