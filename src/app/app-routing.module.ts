import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutActivateGuard, LoginActivateGuard } from './shared/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [ LogoutActivateGuard ]
  },
  {
    path: 'restaurants',
    loadChildren: './restaurant/restaurant.module#RestaurantModule',
    canActivate: [ LoginActivateGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
