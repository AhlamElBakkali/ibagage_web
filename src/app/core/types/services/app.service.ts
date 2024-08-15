import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Actions, Events } from 'src/app/shared/helpers/constantes';
import { StateService } from 'src/app/store/state/state.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private injector: Injector,
    private router: Router,
    private stateService: StateService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}


  getService<T>(name: any): T {
    return this.injector.get<T>(name);
  }
  navigate(url: any) {
    this.router.navigate(url);
  }
  getDataBus(): Subject<any> {
    return this.stateService.dataBus;
  }
  getState(): StateService {
    return this.stateService;
  }
  getRoute(): ActivatedRoute {
    return this.route;
  }

  getRouter(): Router {
    return this.router;
  }
  // showError(msg: string) {
  //  this.message.error(msg);
  //}

  //getMessageService(): NzMessageService {
  // return this.message;
  //}

  closePopOver(formid: string) {
    this.getDataBus().next({
      type: Events.change_visibility,
      id: formid,
      val: false,
    });
  }
  isPostAction(action: string) {
    return action == Actions.Post;
  }
  isAddAction(action: string) {
    return action == Actions.Add;
  }
  isEditAction(action: string) {
    return action == Actions.Edit;
  }
  isDelAction(action: string) {
    return action == Actions.Del;
  }
  startWith(str: string, prefix: string) {
    return str.toLocaleLowerCase().startsWith(prefix.toLocaleLowerCase());
  }
  endsWith(str: string, prefix: string) {
    return str.toLocaleLowerCase().endsWith(prefix.toLocaleLowerCase());
  }
  contains(str: string, prefix: string) {
    return str.toLocaleLowerCase().includes(prefix.toLocaleLowerCase());
  }
  async presentToast(message:any,position:any, classCss:any) {
    // const toast = await this.toastController.create({
    //   message: message,
    //   duration: 3000,
    //   position: position,
    //   cssClass: classCss
    // });

    // await toast.present();
  }

  showToast(message: string, severity: string, summary: string) {
    this.messageService.add({ 
      severity: severity, 
      summary: summary, 
      detail: message, 
      life: 3000,
    });
  }


  //msgLoading(message: string) {
  // this.getMessageService().remove();
  //this.getMessageService().loading(message);
  }

  // getDataList(path: string) {
  //   return this.getState().getDataList(path);
  // }
  // setDataList(path: string, data: any[]) {
  //   this.getState().setDataList(path, data);
  // }
  // replaceInDataList(path: string, data: any) {
  //   if (data.id) {
  //     this.setDataList(
  //       path,
  //       this.getDataList(path).map((ob: any) => {
  //         return ob.id == data.id ? data : ob;
  //       })
  //     );
  //   }
  // }
//}
