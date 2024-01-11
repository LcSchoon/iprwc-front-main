import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {ProductOverviewModule} from "./product/product-overview/product-overview.module";

const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: 'products', loadChildren: () => import('./product/product-overview/product-overview.module').then(m => m.ProductOverviewModule)},
  { path: 'product-list', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  { path: 'shopping-basket', loadChildren: () => import('./shopping-basket/shopping-basket.module').then(m => m.ShoppingBasketModule)},
  { path: 'check-out', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
