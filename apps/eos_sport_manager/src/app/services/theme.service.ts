import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = '';

  setTheme(theme: string): void {
    if (this.currentTheme) {
      document.body.classList.remove(this.currentTheme);
    }

    if (theme) {
      document.body.classList.add(theme);
      this.currentTheme = theme;
    } else {
      this.currentTheme = '';
    }
  }
}
