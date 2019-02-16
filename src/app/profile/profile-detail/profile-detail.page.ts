import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.scss'],
})
export class ProfileDetailPage implements OnInit {

  user: User;
  position: { address?: string, coords: Coordinates };

  constructor(
    private service: ProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;

    this.position = {
      coords: <Coordinates>{
        latitude: this.user.lat, longitude: this.user.lng
      }
    };
  }

}
