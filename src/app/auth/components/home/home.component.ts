import { Component, HostListener } from '@angular/core';
import { Composant } from '../../../core/types/composant.base';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AppService } from '../../../core/types/services/app.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Composant {
  
  showHeader: boolean = false;
  private lastScrollTop: number = 0;
  isVisible = false;
  isVisibleLogin = false;
  isVisibleSignup = false;
  switchValue = true;
  showPassword: boolean = false;
  termsAccepted = false;
  rememberMe = true;
  
  constructor(
    protected override app: AppService,
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService
  ) {
    super(app);
    translate.use(localStorage.getItem('lang') || 'fr');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollTop = window.scrollY;

    if (scrollTop > this.lastScrollTop && scrollTop > 0) {
      this.showHeader = true;
    } else if (scrollTop === 0) {
      this.showHeader = false;
    }
    this.lastScrollTop = scrollTop;
  }
  
  async doLogin() {
    if (navigator.geolocation) {
      try {
        const position: any = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.vars.data_location = { lt: latitude, lg: longitude };
      } catch (error) {
        console.error('Error getting current position:', error);
      }
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    if (!this.vars.login || !this.vars.password) {
      this.app.showToast('Veuillez remplir tous les champs!', 'error', 'Erreur');
      return;
    }

    if (this.rememberMe) {
      localStorage.setItem('login', this.vars.login);
      localStorage.setItem('password', this.vars.password);
      localStorage.setItem('remember', this.rememberMe.toString());
    } else {
      localStorage.removeItem('login');
      localStorage.removeItem('password');
      localStorage.removeItem('remember');
    }
    this.authService.doLogin(this.vars);
  }
}