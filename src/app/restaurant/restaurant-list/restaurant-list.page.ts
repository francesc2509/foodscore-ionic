import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models';
import { RestaurantService } from '../services';
import { ActivatedRoute } from '@angular/router';
import { Show } from '../constants';
import { of } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurant-list.page.html',
  styleUrls: ['./restaurant-list.page.scss'],
})
export class RestaurantListPage implements OnInit {

  loading = false;
  restaurants: Restaurant[] = [];
  orderByName = false;
  showOpen = false;
  search = '';

  constructor(
    private service: RestaurantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const show = this.route.snapshot.data.show;

    let restaurants$;
    switch (show) {
      case Show.ALL:
        restaurants$ = this.service.getAll();
        break;
      case Show.MINE:
        restaurants$ = this.service.getMine();
        break;
      case Show.USER:
        const id = Math.floor(Number(this.route.snapshot.params['id']));

        if (isNaN(id) || id < 1) {
          throw new Error(`'Id' must be a positive number`);
        }
        restaurants$ = this.service.getByUser(id);
        break;
      default:
        restaurants$ = of([]);
        break;
    }

    this.loading = true;
    restaurants$.subscribe(
      res => {
        this.restaurants = res;
      },
      err => {
        this.loading = false;
        console.log(err);
      },
      () => {
        this.loading = false;
      }
    );
  }

  addRestaurant(newRest: Restaurant): void {
    this.restaurants = this.restaurants.concat([newRest]);
  }

  deleteRestaurant(restaurant: Restaurant) {
    this.restaurants = this.restaurants.filter(rest => rest !== restaurant);
  }

  showOpenHandler(event: Event) {
    this.showOpen = !this.showOpen;
    event.preventDefault();
  }

  orderByNameHandler(event: Event) {
    this.orderByName = !this.orderByName;
    event.preventDefault();
  }

  headerFn(record, recordIndex, records) {
    if (recordIndex % 20 === 0) {
      return `From ${recordIndex + 1} to ${recordIndex + 20}`;
    }
    return null;
  }
}
