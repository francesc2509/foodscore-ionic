import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PictureService } from '../../services/picture.service';

@Component({
  selector: 'fs-gallery-button',
  templateUrl: './gallery-button.component.html',
  styleUrls: ['./gallery-button.component.scss']
})
export class GalleryButtonComponent implements OnInit {
  private image: string;
  @Output() imageChange = new EventEmitter<string>();

  constructor(private service: PictureService) {}

  ngOnInit() {}

  pickPhoto() {
    this.service.pickFromGallery().subscribe(
      data => {
        this.image = data;
        this.imageChange.emit(this.image);
      },
      err => console.log(err),
    );
  }
}
