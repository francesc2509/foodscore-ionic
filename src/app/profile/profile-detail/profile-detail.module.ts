import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileDetailPage } from './profile-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'info',
      },
      {
        path: 'info',
        loadChildren: '../profile-info/profile-info.module#ProfileInfoPageModule',
      },
      {
        path: 'location',
        loadChildren: '../profile-location/profile-location.module#ProfileLocationPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileDetailPage]
})
export class ProfileDetailPageModule {}
