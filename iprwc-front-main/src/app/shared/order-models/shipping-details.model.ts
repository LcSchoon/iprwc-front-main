export class ShippingDetailsModel {
  firstName!: string;
  lastName!: string;
  street!: string;
  housenumber!: string;
  zipCode!: string;
  id: string = "id" + Math.random().toString(16).slice(2);
}
