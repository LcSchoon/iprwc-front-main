import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductItemComponent} from "./product-list/product-item/product-item.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ProductRoutingModule} from "./product-routing.module";
import {ProductComponent} from "./product.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ProductComponent,
    ProductEditComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule],

  exports: [
    ProductComponent,
    ProductEditComponent,
    ProductItemComponent,
    ProductListComponent,
    ProductDetailsComponent
  ]
})
export class ProductModule {}
