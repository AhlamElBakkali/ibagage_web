import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BaseService } from '../core/types/service.base';
import { AppService } from '../core/types/services/app.service';
import { HttpService } from '../core/types/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService extends BaseService{

  constructor(
    protected override app: AppService,
    protected override api: HttpService,
    private http: HttpClient,
    private router: Router

  ) {
    super(app, api);
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
            this.setDataObject('user.driver', response); 
            // this.router.navigate([route]);
          }
        })
      )
      .subscribe();
    return req;
  }

  
}
