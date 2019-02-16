import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Restaurant } from '../models';
import { RestaurantStateService } from '../services';

import {catchError} from 'rxjs/internal/operators';
import { NavController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class RestaurantResolver implements Resolve<Restaurant> {
    constructor(
        private service: RestaurantStateService,
        private router: NavController
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Restaurant> {
        return this.service.getRestaurant(route.params['id']).pipe(
            catchError(err => {
                console.log(err);
                this.router.navigateBack(['/restaurants']);
                return of(null);
            })
        );
    }
}
