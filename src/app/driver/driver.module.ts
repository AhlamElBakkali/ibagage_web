import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { DrvResolverService } from '../shared/resolvers/drv-resolver.service';
import { FormVehiculeComponent } from './vehicule/components/vehicule/form-vehicule.component';
import { VehiculeComponent } from './vehicule/vues/vehicule/vehicule.component';
import { StartedComponent } from './started/started.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const routes: Routes = [
  {
    path: '',
    component: DriverHomeComponent,
    resolve: { allData: DrvResolverService },
  },
  {
    path: 'home',
    component: DriverHomeComponent
  },
  {
    path: 'vehicules',
    component: VehiculeComponent
  },
  {
    path: 'started',
    component: StartedComponent
  },
  {
    path: 'vehicule/new',
    component: FormVehiculeComponent
  },
];

@NgModule({
  declarations: [
    DriverHomeComponent,
    FormVehiculeComponent,
    VehiculeComponent,
    StartedComponent
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
  providers: [],
  exports: [
    FormVehiculeComponent,
    
  ]
})
export class DriverModule { }
