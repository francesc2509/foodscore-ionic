import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Restaurant } from '../models';
import { RestaurantService } from '../services';
import { SafeStyle } from '@angular/platform-browser';
import { days } from '../constants';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'fs-restaurant-card',
    templateUrl: './restaurant-card.component.html',
    styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {
    private position;

    open: boolean;
    weekDay: number;
    fullStars = [];
    emptyStars = [];
    avatar: SafeStyle;

    @Input() restaurant: Restaurant;
    @Output() delete = new EventEmitter<Restaurant>();

    constructor(
        private service: RestaurantService,
        public alertController: AlertController,
        // private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.weekDay = new Date().getDay();
        this.open = this.restaurant.daysOpen.includes(this.weekDay);
        // this.avatar = this.sanitizer.bypassSecurityTrustStyle(`url(${this.restaurant.avatar})`);
    }

    deleteRestaurant() {
        this.presentAlert();
    }

    getDaysString(restaurant: Restaurant): string {
        return restaurant.daysOpen.map(day => days[day]).join(', ');
    }

    private async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Delete restaurant',
            message: `Do you want to delete the restaurant indentified by id = ${this.restaurant.id} ?`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                }, {
                    text: 'Okay',
                    handler: () => {
                        this.service.deleteRestaurant(this.restaurant.id).subscribe(
                            () => this.delete.emit(this.restaurant),
                            err => console.log(err)
                        );
                    }
                }
            ]
        });
        await alert.present();
    }
}
