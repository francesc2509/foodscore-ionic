import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { Observable, from, of } from 'rxjs';

import { AuthService } from '../services';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  response;
  error: any;

  constructor(
    private authService: AuthService,
    private router: NavController,
    private fb: FormBuilder,
    private facebook: Facebook,
    public gplus: GooglePlus,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.subscribe(this.authService.jwt(email, password));
    }
  }

  loggedGoogle(/*user: gapi.auth2.GoogleUser*/) {
    // Send this token to your server for register / login
    this.ngZone.run(() => {
        const login$ = from(this.gplus.login(
          {'webClientId': '3493852405-i42aed10i54blfjpt7l42i5rtilkpl0j.apps.googleusercontent.com'})
        ).pipe(
          switchMap((res: any) => {
            const token = res.idToken;
            if (!token) {
              throw new Error('No token');
            }

            // return of(res);
            return this.authService.googleLogin(token);
          })
        );
        // login$.subscribe(
        //   res => console.log(res)
        // );
        this.subscribe(login$);
    });
  }

  loggedFacebook() {
    const login$ = from(this.facebook.login(['public_profile', 'email'])).pipe(
      switchMap(res => {
        if (res.status === 'connected') {
          return this.authService.facebookLogin(res.authResponse.accessToken);
        }
        throw new Error('Login error');
      })
    );

    this.ngZone.run(() => {
      this.subscribe(login$);
    });
  }

  private subscribe(o$: Observable<void>) {

    this.error = undefined;

    o$.subscribe(
      (res) => {
        this.router.navigateRoot(['/restaurants']);
      },
      err => {
        this.error = err.error;
      }
    );
  }

}
