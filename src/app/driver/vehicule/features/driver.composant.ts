import { Composant } from 'src/app/core/types/composant.base';
import { AppService } from 'src/app/core/types/services/app.service';
import { BackEndService } from 'src/app/store/services/back-end.service';

export class DriverComposant extends Composant {
  constructor(
    protected override app: AppService,
    protected backendService: BackEndService
  ) {
    super(app);
  }

  addAnnouncement(data:any) {
    this.backendService.customer().traiteAnnonce(this.Actions.Add,{data},'/newAnnonucement');
  }

  MajAnnouncement(data:any) {
    data.etat = 'pending';
    this.backendService.customer().traiteAnnonce(this.Actions.Edit,{data},'/customer/annonce');
  }

  dropAccount(data:any) {
    this.backendService.customer().removeAccount({data});
  }

  updateUser(data:any) {
    delete data.medias;
    this.backendService.driver().updateUser(this.Actions.Edit,{data},'/driver/home');
  }

  

}
