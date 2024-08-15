import { Observable } from 'rxjs';
import { AppService } from './services/app.service';
import { HttpService } from './services/http.service';

export class BaseService {
  constructor(protected app: AppService, protected api: HttpService) {}

  setMultiDataListFromResponse(paths: string[], response: any) {
    if (response) {
      if (response.mdl) {
        const listeKeys = Object.keys(response.mdl);
        for (const ndx in listeKeys) {
          this.app
            .getState()
            .setDataList(paths[ndx], <any[]>response.mdl[listeKeys[ndx]]);
        }
      }
    }
  }

  setDataList(path: string, response: any) {
    if (response) {
      if (response.dl) {
        this.app.getState().setDataList(path, <any[]>response.dl);
      }
    }
  }
  
  setDataObject(path: string, response: any) {
    if (response) {
      if (response.do) {
        this.app.getState().setDataObject(path, <any>response.do);
      }
    }
  }

  showLoading(code: string, message: string = 'traitement en cours ....') {
    if (code) {
      this.app.getState().setDataString(`loading.${code}`, message);
      //this.app.msgLoading(message);
    }
  }
  hideLoading(code: string) {
    if (code)
    this.app.getState().setDataString(`loading.${code}`, null);
  }
  isLoading(code: string): boolean {
    return this.app.getState().getDataString(`loading.${code}`) != '';
  }

  isPostAction(action: string): boolean {
    return this.app.isPostAction(action);
  }

  isAddAction(action: string): boolean {
    return this.app.isAddAction(action);
  }
  isEditAction(action: string): boolean {
    return this.app.isEditAction(action);
  }
  isDelAction(action: string): boolean {
    return this.app.isDelAction(action);
  }
  updateDataList(path: string, data: any, params?: any) {
    this.app.getState().updateDataList(path, data, params);
  }
  createRequest(
    url: string,
    action: string,
    data: any = {},
    queryParams: any = {}
  ): Observable<any> {
    let req: Observable<any>;
    if (this.isAddAction(action) || this.isPostAction(action)) {
      req = this.api.doPost(`${url}`, data, queryParams);
    } else if (this.isDelAction(action)) {
      req = this.api.doDel(`${url}/${data.id}`, queryParams);
    } else if (this.isEditAction(action)) {
      req = this.api.doPut(`${url}/${data.id}`, data, queryParams);
    } else {
      req = this.api.doGet(`${url}`, queryParams);
    }
    return req;
  }
}
