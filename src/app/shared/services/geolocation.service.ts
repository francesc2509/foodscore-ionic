import { Injectable } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {
    constructor(public geolocation: Geolocation) { }

    getLocation(): Observable<Coordinates> {
        return from(this.geolocation.getCurrentPosition().then(
            (data) => {
                return data.coords;
            }).catch((error) => {
                throw error;
            }
        ));
    }
}
