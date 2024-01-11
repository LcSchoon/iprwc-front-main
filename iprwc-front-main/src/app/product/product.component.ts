import { Component } from '@angular/core';
import {ProductThumbnailComponent} from "./product-overview/product-thumbnail/product-thumbnail.component";
import {ProductModel} from "../shared/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public products!: ProductModel[];

}
