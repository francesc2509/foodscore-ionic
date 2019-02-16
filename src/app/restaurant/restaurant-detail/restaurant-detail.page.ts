import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
})
export class RestaurantDetailPage implements OnInit {
  restaurant: Restaurant;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.restaurant = this.route.snapshot.data.restaurant;
  }

}
