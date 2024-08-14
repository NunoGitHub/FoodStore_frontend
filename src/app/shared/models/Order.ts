import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";

export class Order{
  id!:number;
  items!: CartItem[];
  name!:string;
  address!:string;
  addressLatLng!:LatLng;
  paymentIs!:string;
  createdAt!:string;
  status!:string;
  totalPrice!:number;
}
