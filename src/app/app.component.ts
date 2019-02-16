import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  menuDisabled = true;

  public appPages = [
    {
      title: 'Home',
      url: '/restaurants',
      icon: 'home'
    },
    {
      title: 'New restaurant',
      url: '/restaurants/new',
      icon: 'add'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.authService.loginChange$.subscribe(
      logged => {
        this.menuDisabled = !logged;
        if (!logged) {
          this.router.navigateRoot(['/auth']);
        }
      },
      err => this.menuDisabled = true,
    );
  }

  logout() {
    this.authService.logout();
  }
}
