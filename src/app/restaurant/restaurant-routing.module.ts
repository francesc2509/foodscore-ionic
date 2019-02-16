import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Show } from './constants';
import { RestaurantResolver } from './resolvers';

const routes = <Routes>[
  {
    path: '',
    loadChildren: './restaurant-list/restaurant-list.module#RestaurantListPageModule',
    data: { show: Show.ALL }
  },
  {
    path: 'mine',
    loadChildren: './restaurant-list/restaurant-list.module#RestaurantListPageModule',
    data: { show: Show.MINE }
  },
  {
    path: 'user/:id',
    loadChildren: './restaurant-list/restaurant-list.module#RestaurantListPageModule',
    data: { show: Show.USER }
  },
  {
    path: 'detail/:id',
    loadChildren: './restaurant-detail/restaurant-detail.module#RestaurantDetailPageModule',
    resolve: {
      restaurant: RestaurantResolver,
    }
  },
  {
    path: 'new',
    loadChildren: './restaurant-form/restaurant-form.module#RestaurantFormPageModule'
  },
  {
    path: 'edit/:id',
    loadChildren: './restaurant-form/restaurant-form.module#RestaurantFormPageModule',
    resolve: {
      restaurant: RestaurantResolver,
    }
  },
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
