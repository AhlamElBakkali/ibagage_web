import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/core/types/services/app.service';
import { DriverComposant } from 'src/app/driver/vehicule/features/driver.composant';
import { BackEndService } from 'src/app/store/services/back-end.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'langage-form',
  templateUrl: 'langage-form.component.html',
  styleUrls: ['langage-form.component.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LanguageForm extends DriverComposant {

  constructor(
    protected override app: AppService,
    protected backend: BackEndService,
    public translate: TranslateService
  ) {
    super(app, backend);
    translate.use(localStorage.getItem('lang') || 'fr');
  }

  

}
