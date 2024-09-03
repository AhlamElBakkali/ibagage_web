import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { GalleriaModule } from 'primeng/galleria';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { RatingModule } from 'primeng/rating';
import { MenuModule } from 'primeng/menu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonModule,
    DialogModule,
    InputSwitchModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    ToastModule,
    ScrollPanelModule,
    CardModule,
    GalleriaModule,
    SidebarModule,
    ConfirmPopupModule,
    RatingModule,
    MenuModule,
    ToggleButtonModule,
    ConfirmDialogModule
  ],
  providers: [MessageService,ConfirmationService]
})
export class PrimengModule { }
