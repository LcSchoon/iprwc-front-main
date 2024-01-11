import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductComponent} from "./product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ProductStartComponent} from "./product-start/product-start.component";
import {AuthGuard} from "../auth/auth.guard";
import {AdminAuthGuard} from "../auth/admin-auth.guard";

const routes: Routes = [
  { path: '',
    component: ProductComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
    children: [
      { path: '', component: ProductStartComponent},
      { path: 'new', component: ProductEditComponent },
      { path: ':id', component: ProductDetailsComponent},// resolve: [ProductEditComponent]},
      { path: ':id/edit', component: ProductEditComponent},// resolve: [ProductEditComponent]}
    ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)
export class ProductRoutingModule {}
