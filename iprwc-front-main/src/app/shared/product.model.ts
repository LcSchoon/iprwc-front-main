export class ProductModel {
  private _id: string = '';
  name: string;
  price: number;
  private amountInBasket: number = 0;
  description: string;
  imagePath: string;

    constructor(name: string, price: number, description: string, imagePath: string) {
      this.name =  name;
      this.price = price;
      this.description = description;
      this.imagePath = imagePath;
      this._id = Math.floor(Math.random() * 100).toString();
    }

    public get id(){
      return this._id
    }

    public set id(id: string){
      this._id = id;
    }

    public set amount(amount: number){
      this.amountInBasket = amount;
    }

    public get amount(){
      return this.amountInBasket;
    }

    public removeFromAmount(){
      if (this.amountInBasket > 0){
        this.amountInBasket--;
      }
    }


}
