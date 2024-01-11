import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductThumbnailComponent} from "./product-thumbnail/product-thumbnail.component";
import {ProductOverviewComponent} from "./product-overview.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ProductOverviewComponent,
    ProductThumbnailComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductOverviewComponent }
    ]),
    SharedModule],

  exports: [
    ProductOverviewComponent,
    ProductThumbnailComponent
  ]
})
export class ProductOverviewModule {}
