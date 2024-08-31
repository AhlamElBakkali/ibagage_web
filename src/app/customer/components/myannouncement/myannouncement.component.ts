import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerComposant } from '../../customer.composant';
import { environment } from 'src/environments/environment';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { AppService } from 'src/app/core/types/services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-myannouncement',
  templateUrl: './myannouncement.component.html',
  styleUrl: './myannouncement.component.scss'
})
export class MyannouncementComponent extends CustomerComposant implements OnInit {
  api = environment.api;
  constructor(
    protected override app: AppService,
    protected override backendService: BackEndService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public translate: TranslateService,
  ) {
    translate.use(localStorage.getItem('lang') || 'fr');
    super(app, backendService);
  }

  ngOnInit() {
    this.vars.isopen = false;
    this.vars.isPaused = false;
  }


  async confirmDelete(event: Event, annonce: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translate.instant('CONFIRM_DELETE_MESSAGE'),
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: async () => {
        this.deleteAnnonce(annonce);
        this.messageService.add({
          severity: 'info',
          summary: this.translate.instant('CONFIRMED'),
          detail: this.translate.instant('RECORD_DELETED'),
          life: 3000
        });
        this.vars.isopen = false;
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('REJECTED'),
          detail: this.translate.instant('REJECTED_DETAIL'),
          life: 3000
        });
        this.vars.isopen = false;
      }
    });
  }
}