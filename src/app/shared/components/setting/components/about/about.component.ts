import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/core/types/services/app.service';
import { DriverComposant } from 'src/app/driver/vehicule/features/driver.composant';
import { BackEndService } from 'src/app/store/services/back-end.service';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
})
export class AboutComponent extends DriverComposant {

  constructor(
    protected override app: AppService,
    protected backend: BackEndService,
    public translate: TranslateService
  ) {
    translate.use(localStorage.getItem('lang') || 'fr');
    super(app, backend)
  }


}
