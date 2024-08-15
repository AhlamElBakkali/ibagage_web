import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/components/home/auth.service';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {
  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
  ) { }

  customer(): CustomerService {
    return this.customerService;
  }

  // driver(): DriverService {
  //   return this.driverService;
  // }
  
  auth(): AuthService {
    return this.authService;
  }
}
