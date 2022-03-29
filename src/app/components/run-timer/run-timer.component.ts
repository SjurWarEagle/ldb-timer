import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription, timer} from 'rxjs';
import * as chance from 'chance';

@Component({
  selector: 'app-run-timer',
  templateUrl: './run-timer.component.html',
  styleUrls: ['./run-timer.component.scss'],
})
export class RunTimerComponent implements OnInit, OnDestroy {

  public seconds = '00';
  public minutes = '00';
  private timerTimer: Subscription;
  private targetTime: number;
  private alarmTriggered: boolean;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.targetTime = parseInt(this.route.snapshot.paramMap.get('until'), 10);

    this.timerTimer = timer(0, 100).subscribe(() => {
      const now: Date = new Date(Date.now());
      const date: Date = new Date(this.targetTime - now.getTime());

      if (this.targetTime < now.getTime()) {
        this.seconds = '00';
        this.minutes = '00';
        if (!this.alarmTriggered) {
          this.alarmTriggered = true;
          this.playAudio();
        }
      } else {
        this.seconds = '' + date.getSeconds().toString().padStart(2, '0');
        this.minutes = '' + date.getMinutes().toString().padStart(2, '0');
      }
    });
  }

  public playAudio(): void {
    const audio = new Audio();

    const rnd = this.getWeightedRandom();
    switch (rnd) {
      case 'laughter':
        audio.src = '../../assets/sounds/Evil_Laugh_1-Timothy.mp3';
        break;
      case 'whistle':
        audio.src = '../../assets/sounds/Whistling.mp3';
        break;
      case 'alarm':
        audio.src = '../../assets/sounds/alarm.wav';
        break;
      case 'bell':
        audio.src = '../../assets/sounds/service-bell.mp3';
        break;
      default:
        audio.src = '../../assets/sounds/alarm.wav';

    }
    audio.load();
    audio.play();
  }

  private getWeightedRandom(): string {
    return chance().weighted(['laughter', 'whistle', 'alarm', 'bell'], [1, 1, 5, 1]);
  }

  public ngOnDestroy(): void {
    if (this.timerTimer) {
      this.timerTimer.unsubscribe();
    }
  }
}
