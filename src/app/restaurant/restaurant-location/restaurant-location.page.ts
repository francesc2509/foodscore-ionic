import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models';
import { RestaurantStateService } from '../services';

@Component({
  selector: 'app-restaurant-location',
  templateUrl: './restaurant-location.page.html',
  styleUrls: ['./restaurant-location.page.scss'],
})
export class RestaurantLocationPage implements OnInit {
  private restaurant: Restaurant;
  position: { address: string, coords: Coordinates };

  constructor(private stateService: RestaurantStateService) { }

  ngOnInit() {
    this.stateService.getRestaurant().subscribe(
      res => {
        this.restaurant = res;
        if (this.restaurant) {
          this.position = {
            coords: <Coordinates>{
              latitude: this.restaurant.lat,
              longitude: this.restaurant.lng
            },
            address: this.restaurant.address,
          };
        }
      },
      err => console.log(err),
    );
  }

}
