import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Composant } from 'src/app/core/types/composant.base';
import { AppService } from 'src/app/core/types/services/app.service';

@Component({
  selector: 'app-aide',
  templateUrl: 'aide.page.html',
  styleUrls: ['aide.page.scss'],
})
export class AidePage extends Composant {

  constructor(
    private router: Router,
    protected override app: AppService,
  ) {
    super(app);
  }


  routerLink(link: string){
    this.router.navigate([link]);
    if(link == 'auth/login'){
      sessionStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    }
  }

}
