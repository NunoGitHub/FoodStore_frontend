import { CartService } from './../../../services/cart.service';
import { FoodService } from './../../../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!:Food;

  constructor(activatedRoute:ActivatedRoute, foodService:FoodService, private cartService:CartService, private router:Router) {
    activatedRoute.params.subscribe((params) =>{
      const id =params['id'];
      if (id) {
        this.food = foodService.getFoodByID(id);
      }
    })
  }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);

    this.router.navigateByUrl('/cart-page');
  }

}
