import { Component, OnInit } from '@angular/core';
import { ProfileStateService } from '../services';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.page.html',
  styleUrls: ['./profile-location.page.scss'],
})
export class ProfileLocationPage implements OnInit {
  position: { coords: Coordinates, address?: string };

  constructor(private service: ProfileStateService) { }

  ngOnInit() {
    this.service.getProfile().subscribe(
      user => {
        this.position = {
          coords: <Coordinates>{
              latitude: user.lat, longitude: user.lng
          },
        };
      },
      err => console.log(err)
    );
  }

}
