import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { BaseService } from 'src/app/core/types/service.base';
import { AppService } from 'src/app/core/types/services/app.service';
import { HttpService } from 'src/app/core/types/services/http.service';
import { Actions } from 'src/app/shared/helpers/constantes';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {
  constructor(
    protected override app: AppService,
    protected override api: HttpService,
    private http: HttpClient,
    private router: Router

  ) {
    super(app, api);
  }
  private readonly API_URL = 'https://nominatim.openstreetmap.org/reverse';

  getAddress(latitude: number, longitude: number): Observable<any> {
    const params = {
      lat: latitude,
      lon: longitude,
      format: 'json',
      zoom: 18,
      addressdetails: 1
    };
    return this.http.get<any>(this.API_URL, { params: params });
  }

  displayAddress(address: string, id: any) {
    let addressDisplay: any = document.getElementById(id);
    if (addressDisplay) {
      addressDisplay.innerText = address;
    }
    if (address == '') {
      addressDisplay.style.display = 'block';
    }
  }

  editAnnStatus(params: any = {},route:any) {
    const req: Observable<any> = this.createRequest(
      `annonce/status${params.url ? params.url : ''}`,
      Actions.Edit,
      params.data || {}
    );
    req
      .pipe(
        tap(async (response: any) => {
          if (response) {
            this.setDataList('annonces.liste_annonces', response);
            this.router.navigate([route]);
          }
        })
      )
      .subscribe();
    return req;
  }

  async traiteAnnonce(action: string, params: any = {}, route: any) {
    const req: Observable<any> = this.createRequest(
      `annonce${params.url ? params.url : ''}`,
      action,
      params.data || {}
    );
    req
      .pipe(
        tap(async (response: any) => {
          if (response) {
            if (action == 'add') { this.setDataObject('customer.annonce', response); }
            if (action == 'edit') { this.setDataList('annonces.liste_annonces', response); }
            if (action == 'del') {
              console.log('Response:', response);
              this.setDataList('annonces.liste_annonces', response); }
            // this.router.navigate([route]);
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([route]);
            });
          }
        })
      )
      .subscribe();
    return req;
  }

  deleteMedia(action: string, id: any): Observable<any> {
    const req: Observable<any> = this.createRequest(`annonce-media`, action, { id });
    req
      .pipe(
        tap((response: any) => {
          if (response) {
            console.log('Response:', response);
            this.setDataList('annonce.medias', response);
          }
        })
      )
      .subscribe();
    return req;
  }

  removeAccount(params: any = {}) {
    const req: Observable<any> = this.createRequest(
      `user`,
      Actions.Del,
      params.data || {}
    );
    req
      .pipe(
        tap(async (response: any) => {
          if (response) {
            this.router.navigate(['/auth/login']);
            sessionStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
          }
        })
      )
      .subscribe();
    return req;
  }

  async updateUser(action: string, params: any = {}, route: any) {
    const req: Observable<any> = this.createRequest(
      `user${params.url ? params.url : ''}`,
      action,  
      params.data || {}
    );
    req
      .pipe(
        tap(async (response: any) => {
          if (response) {
            if (action == 'add') { this.setDataObject('customer.annonce', response); }
            if (action == 'edit') { console.log(111); this.setDataList('annonces.liste_annonces', response); }
            this.router.navigate([route]);
          }
        })
      )
      .subscribe();
    return req;
  }
}
