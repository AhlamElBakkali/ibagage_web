import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppService } from 'src/app/core/types/services/app.service';
import { DriverComposant } from 'src/app/driver/vehicule/features/driver.composant';
import { BackEndService } from 'src/app/store/services/back-end.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss'],
})
export class SettingsPage extends DriverComposant {

  function = localStorage.getItem('role');

  constructor(
    protected override app: AppService,
    protected backend: BackEndService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public translate: TranslateService
  ) {
    translate.use(localStorage.getItem('lang') || 'fr');
    super(app, backend)
  }

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


  confirmDeleteAccount(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translate.instant('DELETE_ACCOUNT_MESSAGE'),
      header: this.translate.instant('CONFIRM_DELETE_ACCOUNT'),
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      acceptLabel: this.translate.instant('YES'),
      rejectLabel: this.translate.instant('NO'), accept: () => {
        this.dropAccount(this.getUser());
        this.messageService.add({
          severity: 'info',
          summary: this.translate.instant('CONFIRMED'),
          detail: this.translate.instant('RECORD_DELETED')
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: this.translate.instant('CANCELLED'),
          detail: this.translate.instant('YOU_HAVE_CANCELLED')
        });
      }
    });
  }

  async refreshPosition(user: any) {
    if (navigator.geolocation) {
      try {
        const position: any = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        user.data_location = { lt: latitude, lg: longitude };
        this.updateUser(user);
        if(this.translate.currentLang == 'fr'){
          this.messageService.add({ severity: 'success', summary: 'Position actuelle', detail: 'Position actuelle chargée avec succès.' });
        }
        if(this.translate.currentLang == 'ar'){
          this.messageService.add({ severity: 'success', summary: 'موقعك الحالي', detail: 'تم تحميل موقعك الحالي بنجاح' });
        }
      } catch (error) {
        console.error('Error getting current position:', error);
      }
    } else {
      if(this.translate.currentLang == 'fr'){
        this.messageService.add({ severity: 'error', summary: 'Position actuelle', detail: 'Impossible de charger la position actuelle.' });
      }
      if(this.translate.currentLang == 'ar'){
        this.messageService.add({ severity: 'error', summary: 'موقعك الحالي', detail: 'تعذر تحميل موقعك الحالي' });
      }
    }
  }

}
