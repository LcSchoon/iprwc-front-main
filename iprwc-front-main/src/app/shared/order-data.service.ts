import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {HeaderSetupService} from "./header-setup.service";
import {ProductModel} from "./product.model";
import {Endpoint} from "./data-storage/endpoint.enum";
import {tap} from "rxjs/operators";
import {OrderModel} from "./order-models/order.model";
import {ShippingDetailsModel} from "./order-models/shipping-details.model";
import {resolve} from "@angular/compiler-cli";

@Injectable({providedIn: "root"})
export class OrderDataService {
  constructor(private router: Router,private http: HttpClient, private header: HeaderSetupService) {
  }

  postOrder(order: OrderModel){
    this.postShippingDetails(order.shippingDetails).subscribe(res => {});
  }

  private postProducts(products: ProductModel[]){
    return this.http.post(Endpoint.ORDERS + "/products", products, {headers: this.header.setUpHeader()});
  }

  private postOrderDetails(id: string, orderDetailsId: string){
    return this.http.post(Endpoint.ORDERS + "/order", {
        id: id,
        orderDetailsId: orderDetailsId
    }, {headers: this.header.setUpHeader()});
  }

  private postShippingDetails(shippingDetails: ShippingDetailsModel){
    return this.http.post(Endpoint.ORDERS + "/shipping-details",
      {
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        street: shippingDetails.street,
        houseNumber: shippingDetails.housenumber,
        zipCode: shippingDetails.zipCode,
        id: shippingDetails.id
      }, {headers: this.header.setUpHeader()});
  }
}
