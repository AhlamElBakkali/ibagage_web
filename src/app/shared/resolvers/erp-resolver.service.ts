import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/components/home/auth.service';

@Injectable()
export class ErpResolverService  {
  constructor(private auth:AuthService) {}
   resolve() {
    return this.auth.fetchAllData('psg');
  }
}
