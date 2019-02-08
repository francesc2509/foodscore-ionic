import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes = <Routes>[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
