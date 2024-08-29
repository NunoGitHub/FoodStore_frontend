import { OrderService } from './../../../services/order.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  order:Order = new Order();

  checkoutForm!:FormGroup;

  constructor(cartService:CartService, private formBuilder:FormBuilder, private userService:UserService, private messageService: MessageService, private orderService:OrderService, private router:Router) {

    const cart = cartService.getCart();
    this.order.items= cart.items;
    this.order.totalPrice= cart.totalPrice;

   }

  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address:[address, Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.messageService.add({severity:'warning', summary: "Please fill the inputs", detail: 'Invalid Inputs'});
      return;
    }

    //make the user select a location
    if(!this.order.addressLatLng){
      this.messageService.add({severity:'warning', summary: "Please select your location on the map", detail: 'Location'});
      return;
    }

    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    this.orderService.create(this.order).subscribe({
      next: () =>{
        this.router.navigateByUrl('/payment');
      },
        error:(errorResponse)=>{
          this.messageService.add({severity:'error', summary: errorResponse.error, detail: 'Cart'});
          console.log(errorResponse);
        }
    })

  }

}
