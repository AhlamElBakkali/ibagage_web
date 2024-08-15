import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public default = this.detectSystemTheme();
  detectSystemTheme(): string {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  public themeChanged: BehaviorSubject<string> = new BehaviorSubject(this.theme);

  constructor() { }

  public get theme(): string {
    return localStorage.getItem('theme') ?? this.default;
  }

  public set theme(value: string) {
    console.log('theme', value);
    localStorage.setItem('theme', value);
    this.themeChanged.next(value);
  }

  public get isDark(): boolean {
    return this.theme == 'dark';
  }
}
