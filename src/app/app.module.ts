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
import { DriverModule } from './driver/driver.module';
import { MessageService } from 'primeng/api';
import { SharedModule } from './shared/shared.module';


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
      SharedModule,
      HomeModule,
      CustomerModule,
      DriverModule
    ],
  bootstrap: [AppComponent],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class AppModule { }
