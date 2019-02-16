import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import {
  StarRatingComponent,
  MapboxComponent,
  GalleryButtonComponent,
  CameraButtonComponent
} from './components';

import { OneCheckedDirective } from './directives';

import { environment } from 'src/environments/environment';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment['mapbox-key']
    }),
  ],
  declarations: [
    StarRatingComponent,
    MapboxComponent,
    GalleryButtonComponent,
    CameraButtonComponent,
    OneCheckedDirective
  ],
  exports: [
    StarRatingComponent,
    MapboxComponent,
    GalleryButtonComponent,
    CameraButtonComponent,
    OneCheckedDirective
  ]
})
export class SharedModule {}
