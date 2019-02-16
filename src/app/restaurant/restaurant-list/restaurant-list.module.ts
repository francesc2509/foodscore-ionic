import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { RestaurantFilterPipe } from '../pipes';

import { RestaurantCardModule } from '../restaurant-card/restaurant-card.module';

import { RestaurantListPage } from './restaurant-list.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RestaurantCardModule
  ],
  declarations: [RestaurantListPage, RestaurantFilterPipe]
})
export class RestaurantListPageModule {}
