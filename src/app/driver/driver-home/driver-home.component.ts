import { Component, OnInit } from '@angular/core';
import { DriverComposant } from '../driver.composant';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/core/types/services/app.service';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';

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
      breakpoint: '824px',
      numVisible: 5
    },
    {
      breakpoint: '568px',
      numVisible: 3
    },
    {
      breakpoint: '360px',
      numVisible: 1
    }
  ];

  constructor(
    protected override app: AppService,
    protected backend: BackEndService,
    public translate: TranslateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    super(app, backend)
    translate.use(localStorage.getItem('lang') || 'fr');
  }

  checkAvailability(event: any) {
    const dispo = event.checked;
    if (!dispo) {
      if (this.translate.currentLang === 'fr') {
        this.alertHeader = 'Êtes-vous sûr de ne pas être disponible maintenant ?';
        this.alertMessage = 'Vous ne pourrez pas être visible pour les clients.';
      }
      if(this.translate.currentLang === 'ar') {
        this.alertHeader = 'هل أنت متأكد من تعطيل حالتك؟';
        this.alertMessage = 'سيتم تعطيل حالتك للعملاء.'
      }
    } else {
      if(this.translate.currentLang === 'fr') {
        this.alertHeader = 'Êtes-vous sûr de vouloir être disponible maintenant ?';
        this.alertMessage = 'Vous serez visible pour les clients.';
      }
      if(this.translate.currentLang === 'ar') {
        this.alertHeader = 'هل أنت متأكد من تفعيل حالتك؟';
        this.alertMessage = 'سيتم تفعيل حالتك للعملاء.'
      }
    }
    this.confirmationService.confirm({
      header: this.alertHeader,
      message: this.alertMessage,
      accept: () => {
        this.getUser().dispo = dispo;
        this.updateUser(this.getUser());
        if (this.translate.currentLang === 'fr') {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: dispo ? 'Vous êtes maintenant disponible.' : 'Vous n\'êtes plus disponible.' });
        }
        if (this.translate.currentLang === 'ar') {
          this.messageService.add({ severity: 'success', summary: 'نجاح', detail: dispo ? 'تم تفعيل الحالة.' : 'تم تعطيل الحالة.' });
        }
      },
      reject: () => {
        this.getUser().dispo = !dispo;
        this.updateUser(this.getUser());
      }
    });
  }

  ngOnInit() {
    this.setDataString('menu.toggle', 0)
    this.vars.isopen = false
  }

  getAnnonceVocal(annonce: any) {
    console.log(annonce.medias?.find((a: any) => a.mdl === 'audio'))
    const annnce = annonce.medias?.find((a: any) => a.mdl === 'audio')
    if (annnce) {
      return annnce
    }
  }

}