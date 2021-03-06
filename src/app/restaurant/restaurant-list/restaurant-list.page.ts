import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from '../models';
import { RestaurantService } from '../services';
import { ActivatedRoute } from '@angular/router';
import { Show } from '../constants';
import { of, Observable } from 'rxjs';
import { IonVirtualScroll } from '@ionic/angular';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurant-list.page.html',
  styleUrls: ['./restaurant-list.page.scss'],
})
export class RestaurantListPage implements OnInit {
  @ViewChild('virtualScroll', { read: IonVirtualScroll }) virtualScroll: IonVirtualScroll;

  loading = false;
  restaurants$: Observable<Restaurant[]>;
  restaurants: Restaurant[] = [];
  orderByName = false;
  showOpen = false;
  search = '';

  constructor(
    private service: RestaurantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const show = this.route.snapshot.data.show;

    switch (show) {
      case Show.ALL:
        this.restaurants$ = this.service.getAll();
        break;
      case Show.MINE:
        this.restaurants$ = this.service.getMine();
        break;
      case Show.USER:
        const id = Math.floor(Number(this.route.snapshot.params['id']));

        if (isNaN(id) || id < 1) {
          throw new Error(`'Id' must be a positive number`);
        }
        this.restaurants$ = this.service.getByUser(id);
        break;
      default:
        this.restaurants$ = of([]);
        break;
    }
    this.refresh();
   }

  ionViewWillEnter(): void {
    // this.refresh();
  }

  refresh(event?) {
    this.loading = true;
    this.restaurants$.pipe(
      map(res => {
        this.restaurants = res;
      }),
      catchError(err => {
        console.log(err);
        return of();
      })
    ).subscribe(
      () => {
        this.loading = false;

        if (event) {
          event.target.complete();
        }
      },
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
