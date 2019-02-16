import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileResolver } from './resolvers';

const routes = <Routes>[
  {
    path: '',
    loadChildren: './profile-detail/profile-detail.module#ProfileDetailPageModule',
    resolve: {
      user: ProfileResolver
    }
  },
  // {
  //   path: ':id',
  //   loadChildren: './profile-detail/profile.detail.module#ProfileDetailPageModule'
  // },
  {
    path: 'edit',
    loadChildren: './profile-edit/profile-edit.module#ProfileEditPageModule',
    resolve: {
      user: ProfileResolver
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
export class ProfileRoutingModule {}
