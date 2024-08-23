import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { DriverComposant } from '../../features/driver.composant';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/core/types/services/app.service';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss'],
})
export class VehiculeComponent extends DriverComposant implements OnInit {
  map: any;
  api = environment.api;

  constructor(
    protected override app: AppService,
    protected override backendService: BackEndService,
    private router: Router,
    public translate: TranslateService
  ) {
    super(app, backendService)
    translate.use(localStorage.getItem('lang') || 'fr');
  }

  ngOnInit() {
    this.setDataString('menu.toggle', 0)
    this.vars.isopen = false
  }

  openForm(){
    this.router.navigate(['driver/vehicule/new'])
  }

} 
