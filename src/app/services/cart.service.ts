import { Injectable } from '@angular/core';
import { Cart } from '../shared/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  //listener to update when wwe add something to the cart, update the components
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  addToCart(food: Food): void {
    //see if we already have the food, just to not insert a item that we already have
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) return;

    //new item
    this.cart.items.push(new CartItem(food));

    this.setCartToLocalStorage();
  }

  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items.filter(items => items.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) return;

    cartItem.quantity=quantity;
    cartItem.price = quantity * cartItem.food.price;

    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  //persistent data, to not delete when reload the page
  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum+currentItem.price,0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum+currentItem.quantity,0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    //as the cart has been modified, the observable should be notified, so the page show the new chnages
    this.cartSubject.next(this.cart);
  }


  private getCartFromLocalStorage():Cart{
    const carJson = localStorage.getItem('Cart');
    return carJson ? JSON.parse(carJson) : new Cart();
  }
}
