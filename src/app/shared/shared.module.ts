import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '../store/store.module';
import { PrimengModule } from './primeng/primeng.module';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
  declarations: [],
  imports: [
    FormsModule, StoreModule,CommonModule,
  ],
  exports: [
    PrimengModule,
  ],
  providers: [GeolocationService]
})
export class SharedModule { }
