import { Component, OnInit } from '@angular/core';
import { DriverComposant } from '../driver.composant';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/core/types/services/app.service';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrl: './driver-home.component.scss'
})
export class DriverHomeComponent extends DriverComposant implements OnInit {
  map: any;
  api = environment.api;
  alertHeader!: string;
  alertMessage!: string;
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  constructor(
    protected override app: AppService,
    protected backend: BackEndService,
    public translate: TranslateService
  ) {
    super(app, backend)
    translate.use(localStorage.getItem('lang') || 'fr');
  }
  public alertButtons = [
    {
      text: 'Confirmer',
      role: 'confirm',
      handler: () => {
        this.getUser().dispo = this.tempDispo;
        this.updateUser(this.getUser());
      },
    },
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
      },
    },
  ];
  
  public tempDispo: boolean | undefined;
  
  async checkAvailability(event: any) {
    const dispo = event.detail.checked;
    this.tempDispo = dispo;
  
    if (!dispo) {
      this.alertHeader = 'Êtes-vous sûr de ne pas être disponible maintenant ?';
      this.alertMessage = 'Vous ne pourrez pas être visible pour les clients.';
    } else {
      this.alertHeader = 'Êtes-vous sûr de vouloir être disponible maintenant ?';
      this.alertMessage = 'Vous serez visible pour les clients.';
    }
  
    // const alert = await this.alertController.create({
    //   header: this.alertHeader,
    //   message: this.alertMessage,
    //   buttons: this.alertButtons
    // });
  
    // await alert.present();
    // const { role } = await alert.onDidDismiss();
    // if (role === 'cancel') {
    //   event.target.checked = !dispo; 
    // } else {
    //   console.log('dispo', dispo);
    // }
  }

  ngOnInit() {
    this.setDataString('menu.toggle', 0)
    this.vars.isopen = false
  }

  getAnnonceVocal(annonce: any){
    // console.log(annonce.medias.find((a: any) => a.mdl === 'audio'))
    const annnce = annonce.medias?.find((a: any) => a.mdl === 'audio')
    if (annnce) {
      return annnce
    }
  }

}