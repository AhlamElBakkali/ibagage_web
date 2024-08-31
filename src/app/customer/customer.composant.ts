
import { Composant } from '../core/types/composant.base';
import { AppService } from '../core/types/services/app.service';
import { BackEndService } from '../store/services/back-end.service';

export class CustomerComposant extends Composant {
  constructor(
    protected override app: AppService,
    protected backendService: BackEndService
  ) {
    super(app);
  }

  addAnnouncement(data:any) {
    this.backendService.customer().traiteAnnonce(this.Actions.Add,{data},'/customer/newAnnonucement');
  }

  MajAnnouncement(data:any) {
    data.etat = 'pending';
    this.backendService.customer().editAnnStatus({data},'/customer/annonce');
  }

  updateStatusAnnonce(status:any,data:any) {
    console.log(status,data)
    data.etat = status;
    delete data.medias;
    this.backendService.customer().editAnnStatus({data},'/customer/annonce');
  }

  deleteAnnonce(data:any) {
    delete data.medias;
    this.backendService.customer().traiteAnnonce(this.Actions.Del,{data},'/customer/annonce');
  }

  deleteMedia(id:any) {
    this.backendService.customer().deleteMedia(this.Actions.Del,id);
  }


  
}
