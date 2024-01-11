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
import {ShoppingBasketItemComponent} from "./shopping-basket-list/shopping-basket-item/shopping-basket-item.component";
import {ShoppingBasketListComponent} from "./shopping-basket-list/shopping-basket-list.component";
import {ShoppingBasketComponent} from "./shopping-basket.component";
import {ShoppingBasketSummaryComponent} from "./shopping-basket-summary/shopping-basket-summary.component";
import {ProductOverviewComponent} from "../product/product-overview/product-overview.component";

@NgModule({
  declarations: [
    ShoppingBasketItemComponent,
    ShoppingBasketListComponent,
    ShoppingBasketComponent,
    ShoppingBasketSummaryComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ShoppingBasketComponent }
    ]),],

  exports: [
    ShoppingBasketItemComponent,
    ShoppingBasketListComponent,
    ShoppingBasketComponent,
    ShoppingBasketSummaryComponent
  ]
})
export class ShoppingBasketModule {}
