import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Restaurant } from '../models';
import { RestaurantService } from '../services';
import { GeolocationService } from 'src/app/shared/services';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { days } from '../constants';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.page.html',
  styleUrls: ['./restaurant-form.page.scss'],
})
export class RestaurantFormPage implements OnInit {
  restaurantForm: FormGroup;

  readonly days = days;
  coords: Coordinates;
  restaurant: Restaurant;
  daysOpen: boolean[];
  image = '';
  submitBtnTxt = 'Create';
  title = 'New restaurant';

  @Output() add = new EventEmitter<Restaurant>();

  constructor(
    private restaurantService: RestaurantService,
    private geolocationService: GeolocationService,
    private fb: FormBuilder,
    private router: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.restaurant = this.route.snapshot.data.restaurant;
    this.createForm();
  }

  submit(): void {
    if (this.restaurantForm.valid && this.image) {
      this.daysOpen = Object.values(this.restaurantForm.get('days').value);
      this.setRestaurant();

      let restaurant$;
      if (this.restaurant.id === -1) {
        restaurant$ = this.restaurantService.addRestaurant(this.restaurant);
      } else {
        restaurant$ = this.restaurantService.editRestaurant(this.restaurant);
      }

      restaurant$.subscribe(
        restaurant => {
          this.add.emit(restaurant);
          this.createForm();
          this.router.navigateBack(['/restaurants']);
        }
      );
    }
  }

  setImage(image: string) {
    this.restaurantForm.get('image').setValue(image);
  }


  private createForm(): void {
    let name = '';
    let description = '';
    let cuisine = '';
    this.daysOpen = new Array(7).fill(true);
    let phone = '';
    let coords: Coordinates;
    let address = '';

    if (this.restaurant) {
      name = this.restaurant.name;
      description = this.restaurant.description;

      cuisine = this.restaurant.cuisine.join(',');

      this.daysOpen.forEach((day, i) => {
        this.daysOpen[i] = this.restaurant.daysOpen.includes(i);
      });
      this.image = this.restaurant.image;
      phone = this.restaurant.phone;
      coords = <Coordinates>{ latitude: this.restaurant.lat, longitude: this.restaurant.lng };
      address = this.restaurant.address;

      this.submitBtnTxt = 'Edit';
      this.title = 'Edit restaurant';
    }

    this.restaurantForm = this.fb.group({
      name: new FormControl(
        name,
        [
          Validators.required,
          Validators.pattern('^.{5,}$'),
        ]
      ),
      description: new FormControl(
        description,
        [
          Validators.required
        ]
      ),
      cuisine: new FormControl(
        cuisine,
        [
          Validators.required
        ]
      ),
      days: this.buildDays(),
      image: new FormControl(''),
      phone: new FormControl(
        phone,
        [
          Validators.required,
          Validators.pattern('^((0|\\+)?[0-9]{2})?[0-9]{9}$'),
        ]
      ),
      location: this.fb.group({
        coords: [coords, [Validators.required]],
        address: [address, [Validators.required]]
      }),
    });

    this.restaurantForm.get('image').valueChanges.subscribe(
      data => {
        this.image = data;
      }
    );
  }

  private buildDays(): FormGroup {
    const group = {};
    this.days.forEach((day, i) => {
      group[`days${i}`] = new FormControl(this.daysOpen[i]);
    });
    return this.fb.group(group);
  }

  private setRestaurant() {
    let id = -1;

    if (this.restaurant) {
      id = this.restaurant.id;
      this.image = this.restaurantForm.get('image').value || this.restaurant.image;
    }

    const coords = <Coordinates>this.restaurantForm.get('location').get('coords').value;

    this.restaurant = {
      id: id,
      name: this.restaurantForm.get('name').value,
      description: this.restaurantForm.get('description').value,
      address: this.restaurantForm.get('location').get('address').value,
      cuisine: this.restaurantForm.get('cuisine').value.split(','),
      image: this.restaurantForm.get('image').value || this.image,
      phone: this.restaurantForm.get('phone').value,
      lat: coords.latitude,
      lng: coords.longitude,
      daysOpen: this.daysOpen.reduce((daysList, isSelected, i) => isSelected ? [...daysList, i] : daysList, [])
    };
  }
}
