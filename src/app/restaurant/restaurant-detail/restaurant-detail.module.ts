import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantDetailPage } from './restaurant-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantDetailPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'info'},
      {
        path: 'info',
        loadChildren: '../restaurant-info/restaurant-info.module#RestaurantInfoPageModule',
      },
      {
        path: 'location',
        loadChildren: '../restaurant-location/restaurant-location.module#RestaurantLocationPageModule',
      },
      {
        path: 'comments',
        loadChildren: '../restaurant-comment-list/restaurant-comment-list.module#RestaurantCommentListPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [RestaurantDetailPage]
})
export class RestaurantDetailPageModule {}
