import { Component, OnInit } from '@angular/core';
import { CustomerComposant } from '../../customer.composant';
import { environment } from 'src/environments/environment';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { AppService } from 'src/app/core/types/services/app.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-myannouncement',
  templateUrl: './myannouncement.component.html',
  styleUrl: './myannouncement.component.scss'
})
export class MyannouncementComponent extends CustomerComposant implements OnInit {
  api = environment.api;  
  visible = false;
  constructor(
    protected override app: AppService,
    protected override backendService: BackEndService,
    public translate: TranslateService
    // private alertController: AlertController
  ) {
    translate.use(localStorage.getItem('lang') || 'fr');
    super(app, backendService);
  }

  ngOnInit() {
    this.vars.isopen = false;
    this.vars.isPaused = false;
  }
  
  async confirmDelete(annonce: any) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirmer!',
  //     message: 'Êtes-vous sûr de vouloir supprimer cette annonce?',
  //     buttons: [
  //       {
  //         text: 'Annuler',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Suppression annulée');
  //         }
  //       },
  //       {
  //         text: 'Supprimer',
  //         handler: () => {
  //           this.deleteAnnonce(annonce);
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  }
}
