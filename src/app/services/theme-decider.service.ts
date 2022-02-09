import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ThemeDeciderService {
  public getTheme(): string {
    const now = new Date();
    if (now.getMonth() >= 11 || now.getMonth() <= 0) {
      return 'Winter';
    }
    return 'Spring';
  }
}
