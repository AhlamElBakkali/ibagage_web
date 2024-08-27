import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Composant } from 'src/app/core/types/composant.base';
import { AppService } from 'src/app/core/types/services/app.service';
import { BackEndService } from 'src/app/store/services/back-end.service';

@Component({
  selector: 'app-securite',
  templateUrl: 'securite.page.html',
  styleUrls: ['securite.page.scss'],
})
export class SecuritePage extends Composant {

  constructor(
    public translate: TranslateService,
    protected override app: AppService,
    protected backendService: BackEndService
  ) {
    super(app);
    translate.use(localStorage.getItem('lang') || 'fr');
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
