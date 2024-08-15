import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataInput } from '../data-input.type';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl: string;
  constructor(
    private client: HttpClient,
    private router: Router
  ) {
    this.apiUrl = environment.api;
  }
  getHttpClient() {
    return this.client;
  }
  private _generateUrl(url_complement: string): string {
    return `${this.apiUrl}/${url_complement}`;
  }
  getUrl(url: string) {
    return this._generateUrl(url);
  }
  showReponseMessage(rep: any) {
    if (rep) {
      if (rep.success) {
       // this.message.success(rep.success);
      } else if (rep.error) {
       // this.message.error(rep.error);
      }
    }
  }

  handleError(error: any) {
    if (error.status) {
      switch (error.status) {
        case 400:
          if (error.error) {
           // this.message.error(error.error.message);
            return;
          }
          // this.message.error(error.message);
          return;
      }
    }
    if (
      error.message.includes('401') &&
      error.message.toLocaleLowerCase().includes('unauthorized')
    ) {
      // this.message.error('Session expirée !!');
      sessionStorage.removeItem('token');
      this.router.navigate(['auth', 'login']);
    }
  }

  doGet(url: string, queryParams: any = {}): Observable<any> {
    return this.client
      .get(this._generateUrl(url), {
        params: queryParams,
      })
      .pipe(
        tap((rep: any) => this.showReponseMessage(rep)),
        catchError((error) => {
          this.handleError(error);
          return of('');
        })
      );
  }

  doPost(url: string, data: any, queryParams: any = {}): Observable<any> {
    return this.client
      .post(this._generateUrl(url), { data } as DataInput, {
        params: queryParams,
      })
      .pipe(
        tap((rep: any) => this.showReponseMessage(rep)),
        catchError((error) => {
          this.handleError(error);
          return of('');
        })
      );
  }

  doPut(url: string, data: any, queryParams: any = {}): Observable<any> {
    return this.client
      .put(this._generateUrl(url), { data } as DataInput, {
        params: queryParams,
      })
      .pipe(
        tap((rep: any) => this.showReponseMessage(rep)),
        catchError((error) => {
          this.handleError(error);
          return of('');
        })
      );
  }

  doDel(url: string, queryParams: any = {}): Observable<any> {
    return this.client
      .delete(this._generateUrl(url), {
        params: queryParams,
      })
      .pipe(
        tap((rep: any) => this.showReponseMessage(rep)),
        catchError((error) => {
          this.handleError(error);
          return of('');
        })
      );
  }
}
