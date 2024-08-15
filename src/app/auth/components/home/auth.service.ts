import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseService } from '../../../core/types/service.base';
import { AppService } from '../../../core/types/services/app.service';
import { HttpService } from '../../../core/types/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    protected override app: AppService,
    protected httpService: HttpService,
  ) {
    super(app, httpService);
  }
  doLogin(data: any) {
    this.httpService
      .doPost(`user/login`, { login: data.login, password: data.password, data_location: data.data_location })
      .pipe(
        tap((response: any) => {
          if (response.dl) {
            for (const mdl in response.dl) {
              for (const tbl in response.dl[mdl]) {
                this.app
                  .getState()
                  .setDataList(`${mdl}.${tbl}`, <any[]>response.dl[mdl][tbl]);
              }
            }
          }
          if (response.do) {
            for (const cle in response.do) {
              this.app
                .getState()
                .setDataObject(`commun.${cle}`, { ...response.do[cle] });
            }
          }
          if (response.error) {
            this.app.showToast('Votre username ou mot de passe est incorrecte', 'error', 'Erreur');
          }
          if (!response.error) {
            sessionStorage.setItem('token', response.do.session.jtwToken);
            localStorage.setItem('role', response.do.session.tiers.fonction);
            localStorage.setItem('user', response.do.session.tiers.login);
            localStorage.setItem('directionality', 'ltr');
            localStorage.setItem('lang', 'fr');
            if (response.do.session.tiers.driver) {
              if (!response.do.session.tiers.vehicules || response.do.session.tiers.vehicules.length === 0) {
                this.app.navigate(['driver/started']);
              }
              else
                this.app.navigate(['driver/home']);
            }
            else
              this.app.navigate(['customer/home']);
          }
        })
      )
      .subscribe();
  }


  // doLogin(vars: any): Observable<any> {
  //   return this.httpService.doPost('user/login', { 
  //     login: vars.login, 
  //     password: vars.password, 
  //     data_location: vars.data_location 
  //   });
  // }

  doSignup(data: any) {
    data.login = data.data_adresse.tel
    this.httpService
      .doPost(`user/sign-up`, data)
      .pipe(
        tap((response: any) => {
          if (response.dl) {
            for (const mdl in response.dl) {
              for (const tbl in response.dl[mdl]) {
                this.app
                  .getState()
                  .setDataList(`${mdl}.${tbl}`, <any[]>response.dl[mdl][tbl]);
              }
            }
          }
          if (response.do) {
            for (const cle in response.do) {
              this.app
                .getState()
                .setDataObject(`commun.${cle}`, { ...response.do[cle] });
            }
          }
          if (response.error) {
            this.app.presentToast('Veuillez remplir toutes les données', 'bottom', 'error-toast');
          }
          if (!response.error) {
            // localStorage.setItem('token', resp.jwtToken);
            if (data.fonction === 'drv')
              this.app.navigate(['driver/started']);
            else
              this.app.navigate(['customer/home']);
          }
        })
      )
      .subscribe();
  }


  fetchAllData(tpUser: string) {
    this.httpService
      .doGet(`commun/${tpUser}/all-data`)
      .pipe(
        tap((response: any) => {
          if (response.dl) {
            for (const mdl in response.dl) {
              for (const tbl in response.dl[mdl]) {
                this.app
                  .getState()
                  .setDataList(`${mdl}.${tbl}`, <any[]>response.dl[mdl][tbl]);
              }
            }
          }
          if (response.do) {
            for (const cle in response.do) {
              this.app
                .getState()
                .setDataObject(`commun.${cle}`, { ...response.do[cle] });
            }
          }
          if (!response.error) {
            localStorage.setItem('driver', response.do.session.tiers.fonction);
            localStorage.setItem('driver', response.do.session.tiers.login);
            localStorage.setItem('driver_vehicules', response.do.session.tiers.vehicules);
            if (response.do.session.tiers.driver) {
              // this.app.navigate(['driver/home']);
            }
            else
              this.app.navigate(['customer/home']);
          }
        })
      )
      .subscribe();
  }

  changeMode(action: string, params: any = {}, route: any) {
    const req: Observable<any> = this.createRequest(
      `user${params.url ? params.url : ''}`,
      action,
      params.data || {}
    );
    req
      .pipe(
        tap(async (response: any) => {
          if (response) {
            this.fetchAllData(response.do.fonction);
            this.app.navigate([route]);
          }
        })
      )
      .subscribe();
    return req;
  }
} 
