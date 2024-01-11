import {Injectable, OnInit} from "@angular/core";
import {ProductModel} from "../shared/product.model";
import {Subject} from "rxjs";
import {ProductDataService} from "./product-data.service";

@Injectable({providedIn: 'root'})
export class ProductService{
  productsChanged = new Subject<ProductModel[]>();

  private products: ProductModel[] = [];

  constructor(private dataService: ProductDataService) {
    this.fetchFromApi();
  }

  private fetchFromApi(){
    this.dataService.getProducts().subscribe((resData: ProductModel[]) => {
      this.setProduct(resData);
    });
  }

  getProducts(){
    return this.products.slice();
  }

  getProduct(index: number){
    return this.products.slice()[index];
  }

  addProduct(product: ProductModel){
    this.dataService.postProduct(product).subscribe(resData => {
      this.fetchFromApi();
    });
  }

  updateProduct(newProduct: ProductModel, productId: string){
    this.dataService.putProduct(newProduct, productId).subscribe(resData => {
      this.fetchFromApi();
    });
  }

  deleteProduct(index: number){
    this.dataService.deleteProduct(this.products[index]).subscribe(resData => {
      this.fetchFromApi();
    });
  }

  setProduct(products: ProductModel[]){
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }
}
