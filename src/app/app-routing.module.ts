import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './auth/components/home/home.component';
import { SharedModule } from './shared/shared.module';
import { PsgResolverService } from './shared/resolvers/psg-resolver.service';
import { DrvResolverService } from './shared/resolvers/drv-resolver.service';
import { SecuritePage } from './shared/components/securite/securite.page';
import { AidePage } from './shared/components/aide/aide.page';
import { SettingsPage } from './shared/components/setting/vues/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },  
  {
    path: 'auth/login',
    component: HomeComponent
  },  
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then(
        (m) => m.CustomerModule
      ),
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./driver/driver.module').then(
        (m) => m.DriverModule
      ),
  },
  {
    path: 'security',
    component: SecuritePage,
  },
  {
    path: 'aide',
    component: AidePage,
  },
  {
    path: 'settings',
    component: SettingsPage,
  },
];

const resolvers = [PsgResolverService, DrvResolverService];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],  
  providers: [...resolvers,]

})
export class AppRoutingModule { }
