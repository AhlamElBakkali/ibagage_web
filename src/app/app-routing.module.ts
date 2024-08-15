import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './auth/components/home/home.component';
import { ErpResolverService } from './shared/resolvers/erp-resolver.service';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { allData: ErpResolverService },
  },  
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then(
        (m) => m.CustomerModule
      ),
  },
];

const resolvers = [ErpResolverService];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],  
  providers: [...resolvers],

})
export class AppRoutingModule { }
