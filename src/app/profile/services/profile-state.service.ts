import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ProfileService } from './profile.service';
import { User } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class ProfileStateService {
  private profile: User;

  constructor(private profileService: ProfileService) {}

  getProfile(id: number = 0) {
    let profile$ = of(this.profile);

    if (!id) {
      if (this.profile && this.profile.me) {
        return of(this.profile);
      }
      profile$ = this.profileService.getMe();
    } else if (!this.profile || this.profile.id !== id) {
      profile$ = this.profileService.getById(id);
    }
    return profile$.pipe(
      map((restaurant: User) => {
        this.profile = restaurant;
        return this.profile;
      }),
    );
  }
}
