import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ScrollPanelModule } from 'primeng/scrollpanel';

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
  ],
  providers: [MessageService]
})
export class PrimengModule { }
