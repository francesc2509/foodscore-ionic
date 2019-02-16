import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models';
import { ActivatedRoute } from '@angular/router';
import { RestaurantStateService } from '../services';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.page.html',
  styleUrls: ['./restaurant-info.page.scss'],
})
export class RestaurantInfoPage implements OnInit {
  restaurant: Restaurant;

  constructor(
    private stateService: RestaurantStateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.stateService.getRestaurant().subscribe(
      res => this.restaurant = res,
      err => console.log(err),
    );
  }

}
