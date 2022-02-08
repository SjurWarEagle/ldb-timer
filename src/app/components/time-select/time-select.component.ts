import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {IntroJsService} from '../../services/intro-js.service';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss']
})
export class TimeSelectComponent implements AfterViewInit {
  public showCustomPanel = false;
  public customMinutes = 5;

  constructor(private router: Router, private introService: IntroJsService) {
  }

  public getTheme(): string {
    const now = new Date();
    if (now.getMonth() >= 11 || now.getMonth() <= 0) {
      return 'Winter';
    }
    return 'Spring';
  }

  public untilQuarterPast(): void {
    const now = new Date();
    let targetTime: number;
    if (now.getMinutes() > 15) {
      targetTime = now.getTime() + (60 + 15 - now.getMinutes()) * 60 * 1000;
    } else {
      targetTime = now.getTime() + (15 - now.getMinutes()) * 60 * 1000;
    }
    this.router.navigate(['/run', {until: targetTime}]);
  }

  public untilHalfPast(): void {
    const now = new Date();
    let targetTime: number;
    if (now.getMinutes() < 30) {
      targetTime = now.getTime() + (30 - now.getMinutes()) * 60 * 1000;
    } else {
      targetTime = now.getTime() + (60 + 30 - now.getMinutes()) * 60 * 1000;
    }
    this.router.navigate(['/run', {until: targetTime}]);
  }

  public untilQuarterBefore(): void {
    const now = new Date();
    let targetTime: number;
    if (now.getMinutes() < 45) {
      targetTime = now.getTime() + (45 - now.getMinutes()) * 60 * 1000;
    } else {
      targetTime = now.getTime() + (60 + 45 - now.getMinutes()) * 60 * 1000;
    }
    this.router.navigate(['/run', {until: targetTime}]);
  }

  public untilFull(): void {
    const now = new Date();
    let targetTime = 0;
    if (now.getMinutes() > 0) {
      targetTime = now.getTime() + (60 - now.getMinutes()) * 60 * 1000;
    }
    this.router.navigate(['/run', {until: targetTime}]);
  }

  public someSeconds(): void {
    const targetTime = new Date().getTime() + 1000 * 5;
    this.router.navigate(['/run', {until: targetTime}]);
  }

  public customChanged(event: any): void {
    this.customMinutes = +event.srcElement?.value;

  }

  public toggleCustomTime(): void {
    this.showCustomPanel = !this.showCustomPanel;
    setTimeout(() => {
      if (this.showCustomPanel) {
        this.introService.featureCustomTime();
      }
    });
  }

  public startTimerMinutes(minutes: number): void {
    const targetTime = new Date().getTime() + 1000 * 60 * minutes;
    this.router.navigate(['/run', {until: targetTime}]);
  }

  public ngAfterViewInit(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.introService.firstUserOverview();
  }
}
