import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/components/home/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.authService.fetchAllData(localStorage.getItem('role') || '');
    }
  }
}
