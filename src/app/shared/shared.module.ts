import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '../store/store.module';
import { SecuritePage } from './components/securite/securite.page';
import { CoreModule } from '../core/core.module';
import { AidePage } from './components/aide/aide.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { CompteForm } from './components/setting/components/compte-form/compte-form.component';
import { LanguageForm } from './components/setting/components/langage-form/langage-form.component';
import { AboutComponent } from './components/setting/components/about/about.component';
import { SettingsPage } from './components/setting/vues/settings/settings.component';
import { PrimengModule } from './primeng/primeng.module';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [SecuritePage,
     AidePage, 
     CompteForm,
    SettingsPage,
    LanguageForm,
    AboutComponent
  ],
  imports: [ FormsModule, 
    StoreModule, 
    PrimengModule,
    CoreModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    PrimengModule,
    CompteForm,
    LanguageForm,
    AboutComponent
  ]
})
export class SharedModule { }
