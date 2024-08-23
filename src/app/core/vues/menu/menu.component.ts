import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Composant } from '../../types/composant.base';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { AppService } from '../../types/services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends Composant  {

  visibleSidebar = false;
  api = environment.api;

  constructor(
    private router: Router,
    protected override app: AppService,
    protected backendService: BackEndService,
    public translate: TranslateService
  ) {
    super(app);
    translate.use(localStorage.getItem('lang') || 'fr');
  }

  routerLink(link: string) {
    this.router.navigate([link]);
    if (link == 'auth/login') {
      sessionStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    }
  }

  changeMode(data: any) {
    let rout: any;
    if (!this.isDriverPrivilege()) {
      if(this.getUser().data_driver){
        rout = '/driver/started';
      }
      else{
        rout = '/driver/home';
      }
      data.fonction = 'drv';
      data.driver = true;
      data.dispo = true;
    }
    else {
      rout = '/customer/home';
      data.fonction = 'psg';
      data.driver = false;
      data.dispo = false;
    }
    this.backendService.auth().changeMode(this.Actions.Edit, { data }, rout);
  }

}
