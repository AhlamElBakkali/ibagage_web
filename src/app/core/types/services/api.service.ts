import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataInput } from '../data-input.type';


@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl: string;
  constructor(
    private http: HttpClient,
  ) {
    this.apiUrl = environment.api;
  }

  private _generateUrl(url_complement: string, params: any = {}): string {
    return `${this.apiUrl}/${url_complement}`;
  }

  doGet<Type>(url: string, params: any) {
    return this.http
      .get<Type>(this._generateUrl(url, params))
      .pipe(map((response) => response));
  }

  doPost<Type>(url: string, data: DataInput, params: any) {
    return this.http.post<Type>(this._generateUrl(url, params), data, params).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error, false))
    );
  }

  doPut<Type>(url: string, data: DataInput, params: any) {
    return this.http.put<Type>(this._generateUrl(url, params), data, params).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error, error.ok))
    );
  }

  doDel<Type>(url: string, params: any) {
    return this.http
      .delete<Type>(this._generateUrl(url, params),params).pipe(
        map((response) => response),
        catchError((error) => this.handleError(error, null))
      );
  }

  private handleError(error: Error, errorValue: any) {
    console.error("-----------", error.message);
    return of(errorValue);
  }

}
