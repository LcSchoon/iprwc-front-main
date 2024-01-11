import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../auth/auth.guard";
import {CheckoutComponent} from "./checkout.component";
import {PurchaseCompleteComponent} from "./purchase-complete/purchase-complete.component";

const routes: Routes = [
  { path: '',
    component: CheckoutComponent,
    canActivate: [AuthGuard]},
  { path: 'purchase-complete',
    component: PurchaseCompleteComponent,
    canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)
export class CheckoutRoutingModule {

}
