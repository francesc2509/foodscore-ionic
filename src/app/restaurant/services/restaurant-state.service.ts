import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Restaurant, Comment, GetCommentResponse, GetCommentsResponse } from '../models';
import { environment } from '../../../environments/environment';
import { RestaurantService } from './restaurant.service';

@Injectable({
    providedIn: 'root'
})
export class RestaurantStateService {
  private restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService) {}

  getRestaurant(id: number = 0) {
    if (!id) {
      return of(this.restaurant);
    }

    if (!this.restaurant || this.restaurant.id !== id) {
      return this.restaurantService.getRestaurant(id).pipe(
        map((restaurant: Restaurant) => {
          this.restaurant = restaurant;
          return this.restaurant;
        }),
      );
    }
    return of(this.restaurant);
  }
}
