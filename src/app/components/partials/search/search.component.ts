import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm='';

  constructor(activatedRoute:ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe((params) =>{
      const search= params['searchTerm'];
      if(search) this.searchTerm= search;

    })
   }

  ngOnInit(): void {
  }

  //just to find the route of the search foods
  search(term:string):void{
    if(term){
      this.router.navigateByUrl('/search/'+term);
    }
  }

}
