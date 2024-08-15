import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './auth/components/home/home.module';
import { AuthInterceptorService } from './core/types/services/auth-interceptor.service';
import { CustomerModule } from './customer/customer.module';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent
  ],
  imports: [
      AppRoutingModule,
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      HttpClientModule,
      HomeModule,
      CustomerModule
    ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class AppModule { }
