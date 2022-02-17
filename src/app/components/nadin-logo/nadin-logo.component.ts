import { Component } from '@angular/core';
import {ThemeDeciderService} from "../../services/theme-decider.service";

@Component({
  selector: 'app-nadin-logo',
  templateUrl: './nadin-logo.component.html',
  styleUrls: ['./nadin-logo.component.scss'],
})
export class NadinLogoComponent {

  constructor(private themeDeciderService: ThemeDeciderService) {
  }

  public getTheme(): string {
    return this.themeDeciderService.getTheme();
  }


}
