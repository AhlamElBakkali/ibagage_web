import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { State } from 'src/app/core/types/state.type';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  store: Map<string, State>;
  dataBus: Subject<any> = new Subject();
  formBus: Subject<any> = new Subject();
  constructor() {
    this.store = new Map<string, State>();
  }
  private addStore(module: string) {
    this.store.set(module, new State());
    return this.store.get(module);
  }
  private getStore(module: string): State | undefined {
    if (this.store.get(module) != undefined) {
      return this.store.get(module);
    }
    return undefined;
  }
  setDataList(path: string, data: any[]) {
    try {
      setTimeout(() => {
        const els = path.split('.');
        if (els.length == 2) {
          const store = this.getStore(els[0]);
          if (store != undefined) {
            store.setDataList(els[1], data);
          } else {
            this.addStore(els[0])?.setDataList(els[1], data);
          }
          this.dataBus.next({ [path]: data });
        }
      }, 0);
    } catch (error) {
      console.log(error);
    }
  }
  updateDataList(path: string, data: any, params: any = { id: 'id' }) {
    try {
      const liste = this.getDataList(path);
      if (!liste || liste.length == 0) {
        this.setDataList(path, [data]);
      } else {
        if (params.id) {
          const newListe = liste.filter(
            (ob: any) => ob[params.id] != data[params.id]
          );
          this.setDataList(path, [...newListe, data]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  getDataList(path: string): any[] {
    try {
      const els = path.split('.');
      if (els.length == 2) {
        const store = this.getStore(els[0]);
        if (store != undefined) {
          return store.getDataList(els[1]) || [];
        }
      }
    } catch (error) {
      return [];
    }
    return [];
  }
  setDataObject(path: string, data: any) {
    try {
      const els = path.split('.');
      if (els.length == 2) {
        const store = this.getStore(els[0]);
        if (store != undefined) {
          store.setDataObject(els[1], data);
        } else {
          this.addStore(els[0])?.setDataObject(els[1], data);
        }
        this.dataBus.next({ [path]: data });
      }
    } catch (error) {
      console.log(error);
    }
  }
  getDataObject(path: string) {
    try {
      const els = path.split('.');
      if (els.length == 2) {
        const store = this.getStore(els[0]);
        if (store != undefined) {
          return store.getDataObject(els[1]);
        }
      }
    } catch (error) {
      return {} as any;
    }
    return {} as any;
  }
  setDataString(path: string, data: any) {
    try {
      const els = path.split('.');
      if (els.length == 2) {
        const store = this.getStore(els[0]);
        if (store != undefined) {
          store.setDataString(els[1], data);
        } else {
          this.addStore(els[0])?.setDataString(els[1], data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  getDataString(path: string):string {
    try {
      const els = path.split('.');
      if (els.length == 2) {
        const store = this.getStore(els[0]);
        if (store != undefined) {
          return store.getDataString(els[1]);
        }
      }
    } catch (error) {
      return "";
    }
    return "";
  }
}
