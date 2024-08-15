import { of } from 'rxjs';
import { Actions } from 'src/app/shared/helpers/constantes';
import { AppService } from './services/app.service';

export class Composant {
  Object = Object;
  Actions = Actions;
  vars: any;
  constructor(protected app: AppService) {
    this.vars = {};
  }

  getDataOptions(code: string, get_val: boolean = false) {
    const record = this.getDataList('sys.liste_options').find((ob) => ob.mdl == code.split('.')[0] && ob.code == code.split('.')[1]);
    if (record) {
      if (get_val) {
        return record.data_options;
      }
      return record;
    }
    return {};
  }

  hasKey(key: string, obj: any) {
    return key in obj;
  }



  getEntrepot() {
    try {
      return this.getUser().entrepot;
    } catch (error) {
      return '';
    }
  }

  listeEtat(tpeDoc: string, champs: string = 'etat') {
    const liste = this.getDataList(`gcom.liste_${champs}`);
    if (liste != undefined) {
      return liste.filter((etat: any) => (<string[]>etat.tpe).includes(tpeDoc));
    }
    return [];
  }

  hasEtat(doc: any, etat: string, champ: string = 'etat') {
    if (doc) {
      if (doc.data_etat) {
        if (doc.data_etat[champ]) {
          return doc.data_etat[champ] == etat;
        }
      }
    }
    return false;
  }
  isDocAchat(doc: any) {
    return (<string>doc.tpe_doc).startsWith('a');
  }
  isDocVente(doc: any) {
    return (<string>doc.tpe_doc).startsWith('v');
  }
  getDataList(path: string, filtre: any[] = []) {
    const result = this.app.getState().getDataList(path);
    if (result != undefined) {
      if (filtre.length > 2) {
        switch (filtre[1]) {
          case '==':
        }
        return result.filter((ob: any) => ob[filtre[0]] == filtre[2]);
      }
      return result;
    }
    return [];
  }
  getDataList$(path: string) {
    return of(this.getDataList(path));
  }
  getDataObject(path: string) {
    return this.app.getState().getDataObject(path);
  }
  setDataObject(cle: string, data: any) {
    this.app.getState().setDataObject(cle, data);
  }

  getDataString(path: string) {
    return this.app.getState().getDataString(path);
  }
  setDataString(cle: string, data: any) {
    this.app.getState().setDataString(cle, data);
  }

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

  setDataList(path: string, data: any[]) {
    this.app.getState().setDataList(path, data);
  }
  updateDataList(path: string, data: any, params: any = { id: 'id' }) {
    this.app.getState().updateDataList(path, data, params);
  }

  session(cle: string) {
    const session: any = this.getDataObject('commun.session');
    if (session != undefined) {
      if (session[cle]) {
        return session[cle];
      }
    }
    return cle;
  }
  getConfig(cle: string) {
    try {
      if (cle == '*') {
        return this.session('config');
      }
      return this.session('config')[cle];
    } catch (error) {
      return cle;
    }
  }
  getUser() {
    try {
      return this.session('tiers');
    } catch (error) {
      return {};
    }
  }
  setUser(tiers: any) {
    try {
      this.getDataObject('commun.session').tiers = tiers
      return this.session('tiers');
    } catch (error) {
      return {};
    }
  }
  achatCommercialPrivilege() {
    try {
      return (this.session('role') == 'superuser' || this.session('role') == 'comm-achat');
    } catch (error) {
      return false;
    }
  }
  commercialPrivilege() {
    try {
      return (this.session('role') == 'superuser' || this.session('role') == 'comm-achat' || this.session('role') == 'comm-vente');
    } catch (error) {
      return false;
    }
  }

  convertToNumber(value: string) {
    return value ? parseInt(value, 10) : 0;
  }

  venteCommercialPrivilege() {
    try {
      return (this.session('role') == 'superuser' || this.session('role') == 'comm-vente');
    } catch (error) {
      return false;
    }
  }
  adminPrivilege() {
    try {
      return this.session('role') == 'superuser';
    } catch (error) {
      return false;
    }
  }
  financialPrivilege() {
    try {
      return (this.session('role') == 'superuser' || this.session('role') == 'financial');
    } catch (error) {
      return false;
    }
  }
  commercialFinancialRole() {
    try {
      return (this.session('role') == 'superuser' || this.session('role') == 'financial' || this.session('role') == 'commercial');
    } catch (error) {
      return false;
    }
  }
  getUserName() {
    try {
      return `${this.getUser().nom} ${this.getUser().prenom}`;
    } catch (error) {
      return '';
    }
  }
  setTitre(ttr: string) {
    setTimeout(() => {
      this.app.getState().setDataObject('commun.titre', ttr);
    }, 100);
  }
  getTitre() {
    return this.getDataObject('commun.titre');
  }
  startWith(str: string, prefix: string) {
    if (str) {
      return this.app.startWith(str, prefix);
    }
    return false;
  }
  endsWith(str: string, prefix: string) {
    if (str) {
      return this.app.endsWith(str, prefix);
    }
    return false;
  }
  contains(str: string, prefix: string) {
    if (str) {
      return this.app.contains(str, prefix);
    }
    return false;
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
  loadForm(id: number, fid: string) {
    this.app.getRouter().navigate([], {
      queryParams: { fid, id },
      relativeTo: this.app.getRoute(),
    });
  }
  showLoading(code: string, message: string = 'traitement en cours ....') {
    if (code) {
      this.app.getState().setDataString(`loading.${code}`, message);
      //  this.app.msgLoading(message);
    }
  }
  hideLoading(code: string) {
    if (code) this.app.getState().setDataString(`loading.${code}`, null);
  }
  isLoading(code: string): boolean {
    return this.app.getState().getDataString(`loading.${code}`) != '';
  }
  listeJournaux(nature: string, entrepot: string) {
    return this.getDataList('compta.liste_journaux').filter(
      (ob: any) => ob.nature == nature //&& ob.entrepot == entrepot
    );
  }

  isDriverPrivilege() {
    try {
      return this.getConfig('role') == 'drv';
    } catch (error) {
      return false;
    }
  }



  async convertUriToFile(uri: string): Promise<File | null> {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const blob = await response.blob();
      const contentType = blob.type.split('/')[1];
      if (!contentType) {
        throw new Error('Invalid content type');
      }
      const filename = `${uri.substring(uri.lastIndexOf('/') + 1)}.${contentType}`;
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error('Error converting URI to file:', error);
      return null;
    }
  }


  setDirection(att: any) {
    localStorage.setItem('directionality', att)
  }

  getDirection() {
    return localStorage.getItem('directionality')
  }

  setLang(att: any){
    localStorage.setItem('lang', att)
  } 

}
