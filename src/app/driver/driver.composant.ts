import { Composant } from 'src/app/core/types/composant.base';
import { BackEndService } from '../store/services/back-end.service';
import { AppService } from '../core/types/services/app.service';

export class DriverComposant extends Composant {
  constructor(
    protected override app: AppService,
    protected backendService: BackEndService
  ) {
    super(app);
  }

  updateUser(data:any) {
    data.medias.Delete
    this.backendService.driver().updateUser(this.Actions.Edit,{data},'/driver/home');
  }

}
