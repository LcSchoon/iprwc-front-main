import {Endpoint} from "../shared/data-storage/endpoint.enum";
import {catchError, map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ProductModel} from "../shared/product.model";
import {ProductService} from "./product.service";
import {HeaderSetupService} from "../shared/header-setup.service";

@Injectable({providedIn: "root"})
export class ProductDataService {
  constructor(private router: Router,private http: HttpClient, private header: HeaderSetupService) {
  }

  postProduct(product: ProductModel){
    return this.http.post(Endpoint.PRODUCTS,
      {
        name:  product.name,
        price: product.price,
        description: product.description,
        imagePath: product.imagePath
      }, {headers: this.header.setUpHeader()}).pipe(tap(resData => {

    }));
  }

  putProduct(product: ProductModel, productId: string){
    return this.http.put(Endpoint.PRODUCTS,
      {
        name:  product.name,
        price: product.price,
        id: productId,
        description: product.description,
        imagePath: product.imagePath
      }, {headers: this.header.setUpHeader()}).pipe(tap(resData => {

    }));
  }

  deleteProduct(product: ProductModel){
    return this.http.delete(Endpoint.PRODUCTS + '/' + product.id,
      {headers: this.header.setUpHeader()}).pipe(tap(resData => {

    }));
  }

  getProducts(){
    return this.http.get<ProductModel[]>(Endpoint.PRODUCTS);
  }
}
