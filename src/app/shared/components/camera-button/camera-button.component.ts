import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PictureService } from '../../services/picture.service';

@Component({
  selector: 'fs-camera-button',
  templateUrl: './camera-button.component.html',
  styleUrls: ['./camera-button.component.scss']
})
export class CameraButtonComponent implements OnInit {
  private image: string;
  @Output() imageChange = new EventEmitter<string>();

  constructor(private service: PictureService) {}

  ngOnInit() {}

  takePhoto() {
    this.service.takePhoto().subscribe(
      data => {
        this.image = data;
        this.imageChange.emit(this.image);
      },
      err => console.log(err),
    );
  }
}
