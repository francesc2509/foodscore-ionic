import { Component, OnInit } from '@angular/core';
import { RestaurantService, RestaurantStateService } from '../services';
import { Restaurant, Comment } from '../models';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-restaurant-comment-list',
  templateUrl: './restaurant-comment-list.page.html',
  styleUrls: ['./restaurant-comment-list.page.scss'],
})
export class RestaurantCommentListPage implements OnInit {
  private restaurant: Restaurant;

  comments: Comment[];
  commentForm: FormGroup;

  constructor(
    private service: RestaurantService,
    private stateService: RestaurantStateService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.stateService.getRestaurant().subscribe(
      res => {
        this.restaurant = res;
        if (this.restaurant) {
          this.commentForm = this.fb.group({
            text: ['', [Validators.required]],
            stars: [0, [Validators.required]]
          });

          this.service.getComments(this.restaurant.id).subscribe(
            data => {
              this.comments = data;
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
  }

  sendComment(event) {
    event.preventDefault();

    if (this.commentForm) {
      const newComment = <Comment>{
        text: this.commentForm.get('text').value,
        stars: this.commentForm.get('stars').value
      };

      this.service.addComment(newComment, this.restaurant.id).subscribe(
        comment => {
          this.commentForm = this.fb.group({
            text: '',
            stars: 0,
          });

          this.restaurant.commented = true;

          if (this.comments) {
            this.comments = this.comments.concat([comment]);
          } else {
            this.comments = [comment];
          }
        },
        err => console.log(err)
      );
    }
  }

}
