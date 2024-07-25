import { CartItem } from './../../../shared/models/CartItem';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/Cart';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart!: Cart;
  quantities: number[] = [1, 2, 3, 4, 5];

  constructor(private cartService:CartService) {
    //update the cart each time we got a new value, and the observable do that
    cartService.getCartObservable().subscribe((cart) =>{
      this.cart =cart;
    })
  }

  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
