import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule { }
