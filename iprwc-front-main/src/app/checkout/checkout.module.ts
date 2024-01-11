import {NgModule} from "@angular/core";
import {ProductComponent} from "../product/product.component";
import {ProductEditComponent} from "../product/product-edit/product-edit.component";
import {ProductItemComponent} from "../product/product-list/product-item/product-item.component";
import {ProductListComponent} from "../product/product-list/product-list.component";
import {ProductDetailsComponent} from "../product/product-details/product-details.component";
import {RouterModule} from "@angular/router";
import {ProductRoutingModule} from "../product/product-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {CheckoutComponent} from "./checkout.component";
import {CheckoutRoutingModule} from "./checkout-routing.module";
import {PurchaseCompleteComponent} from "./purchase-complete/purchase-complete.component";

@NgModule({
  declarations: [
    CheckoutComponent,
    PurchaseCompleteComponent
  ],
  imports: [
    RouterModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    SharedModule],

  exports: [
    CheckoutComponent,
    PurchaseCompleteComponent
  ]
})
export class CheckoutModule{}
