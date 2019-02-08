import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Show } from './constants';

const routes = <Routes>[
  {
    path: '',
    loadChildren: './restaurant-list/restaurant-list.module#RestaurantListPageModule',
    data: { show: Show.ALL }
  },
  {
    path: 'detail/:id',
    loadChildren: './restaurant-detail/restaurant-detail.module#RestaurantDetailPageModule',
    resolve: []
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class RestaurantRoutingModule {}
