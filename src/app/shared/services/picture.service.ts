import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  image = '';

  constructor(private camera: Camera) { }

  takePhoto() {
    const options: CameraOptions = {
      targetWidth: 640, // max width 640px
      targetHeight: 640, // max height 640px
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL // Base64
    };

    return this.getPicture(options);
  }

  pickFromGallery() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 640, // max width 640px
      targetHeight: 640, // max height 640px
      destinationType: this.camera.DestinationType.DATA_URL // Base64
    };

    return this.getPicture(options);
  }

  private getPicture(options: CameraOptions) {
    return from(this.camera.getPicture(options)).pipe(
      map(data => {
        return `data:image/jpeg;base64,${data}`;
      })
    );
  }
}
