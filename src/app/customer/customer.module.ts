import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { CoreModule } from '../core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { DepartureMapComponent } from './components/departure-map/departure-map.component';
import { ArrivalMapComponent } from './components/arrival-map/arrival-map.component';
import { NewAnnouncementComponent } from './components/new-announcement/new-announcement.component';
import { AudioRecordingService } from './audio-recorder.service';
import { MyannouncementComponent } from './components/myannouncement/myannouncement.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { PsgResolverService } from '../shared/resolvers/psg-resolver.service';
import { DriverHomeComponent } from '../driver/driver-home/driver-home.component';
import { ConfirmationService, MessageService } from 'primeng/api';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const routes: Routes = [
  {
    path: '',
    component: DriverHomeComponent,
    resolve: { allData: PsgResolverService },
  },
  {
    path: 'home',
    component: CustomerHomeComponent,
  },
  {
    path: 'departure',
    component: DepartureMapComponent
  },
  {
    path: 'arrival',
    component: ArrivalMapComponent
  },
  {
    path: 'newAnnonucement',
    component: NewAnnouncementComponent
  },
  {
    path: 'annonce',
    component: MyannouncementComponent
  },
    
];

@NgModule({
  declarations: [
    CustomerHomeComponent,
    DepartureMapComponent,
    ArrivalMapComponent,
    NewAnnouncementComponent,
    MyannouncementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    CoreModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [AudioRecordingService,
    MessageService,
    ConfirmationService
  ],
})
export class CustomerModule { }
