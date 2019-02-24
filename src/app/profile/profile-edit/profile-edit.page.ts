import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../services';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  user: User;
  avatarForm: FormGroup;

  avatarTmp = '';

  messages = {
    info: undefined,
    avatar: undefined,
    password: undefined,
  };

  constructor(
    private service: ProfileService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;

    this.avatarForm = this.fb.group({
      avatar: ['', [Validators.required]]
    });

    this.avatarForm.get('avatar').valueChanges.subscribe(
      data => this.avatarTmp = data
    );
  }

  async showInfoPopover() {
    this.showPopover(EditInfoComponent, { user: this.user });
  }

  async showPasswordPopover() {
    this.showPopover(EditPasswordComponent, {});
  }

  setAvatar(event: string) {
    this.avatarForm.get('avatar').setValue(event);
  }

  editAvatar(event) {
    const avatar = this.avatarForm.get('avatar').value;
    const user = <User>{ avatar };

    this.service.updateAvatar(user).subscribe(
      data => {
        this.user.avatar = data.avatar;
        this.avatarForm.get('avatar').setValue('');
        this.messages.avatar = { ok: true, text: 'Avatar updated successfully' };
      },
      err => {
        this.messages.avatar = {
          ok: false,
          text: err.message
        };
      }
    );

    event.preventDefault();
  }

  private async showPopover(component, params) {
    const popover = await this.popoverCtrl.create({
      component: component,
      componentProps: params,
    });
    await popover.present();
    const result = (await popover.onDidDismiss()).data;
    console.log(result);
  }
}

@Component({
  selector: 'fs-edit-info',
  template: `
    <form (ngSubmit)="editInfo($event)" [formGroup]="infoForm" padding>
      <ion-list>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input type="text" formControlName="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>E-mail</ion-label>
          <ion-input type="email" formControlName="email"></ion-input>
        </ion-item>
      </ion-list>
      <div text-center>
        <ion-button type="submit" [disabled]="!infoForm.valid">Edit</ion-button>
        <ion-button type="button" (click)="close($event)">Close</ion-button>
      </div>
    </form>
  `
})
export class EditInfoComponent implements OnInit {
  @Input() user: User;
  infoForm: FormGroup;

  constructor(
    private popoverCtrl: PopoverController,
    private fb: FormBuilder,
    private service: ProfileService,
  ) { }

  ngOnInit() {
    this.infoForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  close(event) {
    event.preventDefault();
    this.popoverCtrl.dismiss();
  }

  editInfo(event) {
    const email = this.infoForm.get('email').value;
    const name = this.infoForm.get('name').value;
    const user = <User>{ name, email };

    this.service.updateInfo(user).subscribe(
      ok => {
        this.user.name = name;
        this.user.email = email;
        this.popoverCtrl.dismiss({ ok, text: 'Info updated successfully' });
        // this.messages.info = { ok, text: 'Info updated successfully' };
      },
      err => {
        // this.messages.info = {
        //   ok: false,
        //   text: err.message
        // };
      }
    );

    event.preventDefault();
  }
}

@Component({
  selector: 'fs-edit-info',
  template: `
    <form (ngSubmit)="editPassword($event)" [formGroup]="passwordForm" padding>
      <ion-list>
        <ion-item>
          <ion-grid>
            <ion-row>
              <ion-col [size]="12">
                <ion-label>Password</ion-label>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col [size]="12">
                <ion-input type="password" formControlName="password"></ion-input>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
        <ion-item>
          <ion-grid>
            <ion-row>
              <ion-col [size]="12">
                <ion-label>Repeat password</ion-label>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col [size]="12">
                <ion-input type="password" formControlName="password2"></ion-input>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
      <div text-center>
        <ion-button type="submit" [disabled]="!passwordForm.valid">Edit</ion-button>
        <ion-button type="button" (click)="close($event)">Close</ion-button>
      </div>
    </form>
  `
})
export class EditPasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(
    private popoverCtrl: PopoverController,
    private fb: FormBuilder,
    private service: ProfileService,
  ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
  }

  close(event) {
    event.preventDefault();
    console.log('djsfhsdfsdfljd');
    this.popoverCtrl.dismiss();
  }

  editPassword(event) {
    const password = this.passwordForm.get('password').value;
    const user = <User>{ password };

    this.service.updatePassword(user).subscribe(
      ok => {
        this.popoverCtrl.dismiss({ ok: true, text: 'Password updated successfully' });
      },
      err => {
        // this.messages.password = {
        //   ok: false,
        //   text: err.message
        // };
      }
    );
    event.preventDefault();
  }
}
