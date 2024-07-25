import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  ratingValue: number = 3;

  constructor(private foodService: FoodService, activatedRoute:ActivatedRoute) {
    //listening the route
    //so enytime the params change this function is called because of the subscribe, is a listener
    activatedRoute.params.subscribe((params) =>{
      const term = params['searchTerm'];
      const tag = params['tag'];
      if(term){
        this.foods = foodService.getAllFoodsBySearchTerm(term);
      }
      else if(tag){
        this.foods = foodService.getAllFoodsByTag(tag);
      }
      else{
        this.foods = foodService.getAll();
      }
    });

  }

  ngOnInit(): void{

  }

}