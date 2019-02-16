import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';

import { RestaurantCardComponent } from './restaurant-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    SharedModule
  ],
  declarations: [RestaurantCardComponent],
  exports: [RestaurantCardComponent]
})
export class RestaurantCardModule {}
