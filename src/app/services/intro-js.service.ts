import {Injectable} from '@angular/core';
import * as introJs from 'intro.js/intro.js';

@Injectable({
  providedIn: 'root'
})
export class IntroJsService {
  private introJS = null;
  private _historicData: {
    introExecuted: boolean,
    customTimeExecuted: boolean,
  };

  constructor() {
    this._historicData = JSON.parse(localStorage.getItem("intro"));
    if (!this._historicData) {
      this._historicData = {introExecuted: false, customTimeExecuted: false};
    }
  }

  get historicData(): { introExecuted: boolean; customTimeExecuted: boolean } {
    return this._historicData;
  }

  public async featureCustomTime(): Promise<void> {
    this.introJS = introJs();

    this.introJS.onexit(() => {
      this._historicData.customTimeExecuted = true;
      this.saveHistoricData();
    })

    if (this._historicData.customTimeExecuted) {
      return;
    }

    this.introJS.setOptions({
      steps: [
        {
          title: 'Zeit',
          element: '#userguide-custom-input',
          intro: 'Hier einfach die Anzahl der Minuten eingeben die gewünscht sind.',
        },
        {
          title: 'Start',
          element: '#userguide-custom-start',
          intro: 'Nachdem die Zeit eingestellt ist, kann der Wert mit [Enter] übernommen werden und mit oder diesem Knopf gestartet werden.',
        }
      ]
    })
      .start();
  }

  public async firstUserOverview(): Promise<void> {
    this.introJS = introJs();

    this.introJS.onexit(() => {
      this._historicData.introExecuted = true;
      this.saveHistoricData();
    })

    if (this._historicData.introExecuted) {
      return;
    }

    this.introJS.setOptions({
      steps: [
        {
          title: 'Hallo!',
          element: '#userguide-overview',
          intro: 'Willkommen beim Nadin Timer,<br><br>eine schnelle Möglichkeit für unterhaltsame Meetingpausen.',
        },
        {
          title: 'Minuten',
          element: '#userguide-absolute-times',
          intro:
            'Hier kannst du die gewünschte Zeit in minuten auswählen.<br>Also z.B. "für 5min".',
        },
        {
          title: 'Uhrzeit',
          element: '#userguide-relative-times',
          intro:
            'Hier kannst du die gewünschte Zeit bis zu einem Zeitpunkt auswählen.<br> Also z.B. "bis halb".',
        },
        {
          title: 'Eigenes',
          element: '#userguide-custom-times',
          intro: 'Hier kannst du eigene Zeitäume eingeben wenn die vorgeschlagenen nicht ausreichen.',
        }
      ]
    })
      .start();
  }

  private saveHistoricData() {
    console.log('saveHistoricData');
    localStorage.setItem("intro", JSON.stringify(this._historicData));
  }
}
