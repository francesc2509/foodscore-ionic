import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantCardModule } from '../restaurant-card/restaurant-card.module';
import { RestaurantInfoPage } from './restaurant-info.page';
import { RestaurantResolver } from '../resolvers';

const routes: Routes = [
  {
    path: '',
    component: RestaurantInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    RestaurantCardModule
  ],
  declarations: [RestaurantInfoPage]
})
export class RestaurantInfoPageModule {}
