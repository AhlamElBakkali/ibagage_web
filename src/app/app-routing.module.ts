import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './auth/components/home/home.component';
import { SharedModule } from './shared/shared.module';
import { PsgResolverService } from './shared/resolvers/psg-resolver.service';
import { DrvResolverService } from './shared/resolvers/drv-resolver.service';

const routes: Routes = [
  {
    path: '',
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
