import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { ProfileService, ProfileStateService } from '../services';

import {catchError} from 'rxjs/internal/operators';
import { User } from '../../shared/models';
import { NavController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<User> {
    constructor(
        private service: ProfileStateService,
        private router: NavController
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        let id = route.params['id'];

        if (id) {
            id = Number(id);

            if (isNaN(id) || id < 1) {
                throw new Error('Invalid id');
            }
        }

        return this.service.getProfile(id).pipe(
            catchError(err => {
                console.log(err);
                this.router.navigateRoot(['/restaurants']);
                return of(null);
            })
        );
    }
}
