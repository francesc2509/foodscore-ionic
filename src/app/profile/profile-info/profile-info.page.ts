import { Component, OnInit } from '@angular/core';
import { ProfileStateService } from '../services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
})
export class ProfileInfoPage implements OnInit {
  user: User;

  constructor(private service: ProfileStateService) { }

  ngOnInit() {
    this.service.getProfile().subscribe(
      user => {
        this.user = user;
      },
      err => console.log(err)
    );
  }

}
