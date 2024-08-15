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
import { ErpResolverService } from '../shared/resolvers/erp-resolver.service';
import { MyannouncementComponent } from './components/myannouncement/myannouncement.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
const routes: Routes = [
  {
    path: '',
    component: CustomerHomeComponent,
    resolve: { allData: ErpResolverService },
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
    path: 'my_announcements',
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
  providers: [AudioRecordingService],
})
export class CustomerModule { }
