export class State {
  private _dataListe: Map<string, any[]>;
  private _dataObject: Map<string, any>;
  private _dataString: Map<string, string>;
  constructor() {
    this._dataListe = new Map<string, any[]>();
    this._dataObject = new Map<string, any>();
    this._dataString = new Map<string, string>();
  }
  getDataList(cle: string) {
    try {
      return this._dataListe.get(cle);
    } catch (error) {
      return [];
    }
  }
  setDataList(cle: string, data: any[]) {
    this._dataListe.set(cle, data);
  }
  getDataObject(cle: string) {
    try {
      return this._dataObject.get(cle);
    } catch (error) {
      return {};
    }
  }
  setDataObject(cle: string, data: any) {
    this._dataObject.set(cle, data);
  }

  getDataString(cle: string) {
    try {
      return this._dataString.get(cle)||""
    } catch (error) {
      return "";
    }
  }
  setDataString(cle: string, data: string) {
    this._dataString.set(cle, data);
  }
}
