import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/core/types/services/app.service';
import { DriverComposant } from 'src/app/driver/vehicule/features/driver.composant';
import { BackEndService } from 'src/app/store/services/back-end.service';

@Component({
  selector: 'app-deiver-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss'],
})
export class SettingsPage extends DriverComposant  {
  
  function = localStorage.getItem('role');

  constructor(
    protected override app: AppService,
    protected backend: BackEndService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.use(localStorage.getItem('lang') || 'fr');
    super(app, backend)
  }

  public alertButtons = [
    {
      text: 'Supprimer',
      role: 'confirm',
      handler: () => {
        this.dropAccount(this.getUser())
      },
    },
  ];

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  logout() {
    this.router.navigate(['auth/login']);
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  async refreshPosition(user:any) {
    if (navigator.geolocation) {
      try {
        const position:any = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        user.data_location = { lt: latitude, lg: longitude };
        this.updateUser(user);
        await this.app.presentToast('Position actuelle chargée avec succès.', 'bottom', 'success-toast');
      } catch (error) {
        console.error('Error getting current position:', error);
      }
    } else {
      this.app.presentToast('Impossible de charger la position actuelle.', 'bottom', 'error-toast');
    }
  }
  
}
